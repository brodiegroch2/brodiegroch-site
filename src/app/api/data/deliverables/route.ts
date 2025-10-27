import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'data', 'deliverables.json');

// In-memory cache for production (where file system is read-only)
let memoryCache: any[] | null = null;
let cacheInitialized = false;

async function initializeCache() {
  if (cacheInitialized) return;
  
  try {
    // Try to read from file first
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    memoryCache = data;
    cacheInitialized = true;
    console.log('Initialized memory cache with file data');
  } catch (error) {
    console.error('Error initializing cache:', error);
    // If file reading fails, initialize with empty array
    memoryCache = [];
    cacheInitialized = true;
  }
}

async function updateGitHub(data: any[]) {
  try {
    console.log('🔄 Starting GitHub update process...');
    
    // In production (Vercel), we can't write files or run git commands
    // Instead, we'll use GitHub's API to update the file directly
    if (process.env.NODE_ENV === 'production') {
      console.log('🌐 Using GitHub API for production update...');
      return await updateViaGitHubAPI(data);
    }
    
    // In development, use local git commands
    console.log('💻 Using local git commands for development...');
    
    // Write to local file first
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log('✅ Written to local file');
    
    // Commit and push to GitHub
    const { exec } = require('child_process');
    const util = require('util');
    const execAsync = util.promisify(exec);
    
    // Check git status first
    console.log('📋 Checking git status...');
    const statusResult = await execAsync('git status --porcelain');
    console.log('Git status output:', statusResult.stdout);
    
    if (!statusResult.stdout.trim()) {
      console.log('⚠️ No changes to commit - file might already be up to date');
      return true; // No changes needed
    }
    
    // Add all changes
    console.log('📝 Adding changes to git...');
    const addResult = await execAsync('git add .');
    console.log('Git add result:', addResult.stdout);
    
    // Commit with timestamp
    const timestamp = new Date().toISOString();
    const commitMessage = `Update deliverables: ${timestamp}`;
    console.log('💾 Committing changes:', commitMessage);
    const commitResult = await execAsync(`git commit -m "${commitMessage}"`);
    console.log('Git commit result:', commitResult.stdout);
    
    // Push to GitHub
    console.log('🚀 Pushing to GitHub...');
    const pushResult = await execAsync('git push origin main');
    console.log('Git push result:', pushResult.stdout);
    
    console.log('✅ Successfully updated GitHub with deliverable changes');
    return true;
  } catch (error) {
    console.error('❌ Error updating GitHub:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stdout: (error as any).stdout || 'No stdout',
      stderr: (error as any).stderr || 'No stderr',
      code: (error as any).code || 'No code'
    });
    return false;
  }
}

async function updateViaGitHubAPI(data: any[]) {
  try {
    const githubToken = process.env.GITHUB_TOKEN;
    const repoOwner = 'brodiegroch2';
    const repoName = 'brodiegroch-site';
    const filePath = 'src/data/deliverables.json';
    
    if (!githubToken) {
      console.error('❌ GITHUB_TOKEN environment variable not set');
      return false;
    }
    
    console.log('🔑 Using GitHub API with token...');
    
    // Get the current file content and SHA
    const getFileResponse = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    if (!getFileResponse.ok) {
      console.error('❌ Failed to get file from GitHub:', getFileResponse.status, getFileResponse.statusText);
      return false;
    }
    
    const fileData = await getFileResponse.json();
    console.log('📄 Got file SHA:', fileData.sha);
    
    // Update the file
    const newContent = JSON.stringify(data, null, 2);
    const timestamp = new Date().toISOString();
    const commitMessage = `Update deliverables: ${timestamp}`;
    
    const updateResponse = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: commitMessage,
        content: Buffer.from(newContent).toString('base64'),
        sha: fileData.sha
      })
    });
    
    if (!updateResponse.ok) {
      const errorData = await updateResponse.text();
      console.error('❌ Failed to update file on GitHub:', updateResponse.status, errorData);
      return false;
    }
    
    console.log('✅ Successfully updated file via GitHub API');
    return true;
  } catch (error) {
    console.error('❌ Error updating via GitHub API:', error);
    return false;
  }
}

export async function GET() {
  try {
    await initializeCache();
    return NextResponse.json(memoryCache || []);
  } catch (error) {
    console.error('Error reading deliverables:', error);
    return NextResponse.json({ error: 'Failed to read deliverables' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const rawDeliverable = await request.json();
    console.log('API received deliverable:', rawDeliverable);
    
    // Normalize field names: convert underscores to spaces (multiple underscores -> single space)
    const updatedDeliverable: any = {};
    for (const [key, value] of Object.entries(rawDeliverable)) {
      const normalizedKey = key.replace(/_+/g, ' ');
      updatedDeliverable[normalizedKey] = value;
    }
    
    await initializeCache();
    
    if (!memoryCache) {
      return NextResponse.json({ error: 'Data not available' }, { status: 500 });
    }
    
    // Find the deliverable using Course ID and Deliverable name (most stable identifiers)
    let index = memoryCache.findIndex((item: any) => 
      item['Course ID'] === updatedDeliverable['Course ID'] &&
      item['Deliverable'] === updatedDeliverable['Deliverable'] &&
      item['Open Date'] === updatedDeliverable['Open Date']
    );
    
    // If not found, try with original Close Date (in case it wasn't changed)
    if (index === -1) {
      index = memoryCache.findIndex((item: any) => 
        item['Course ID'] === updatedDeliverable['Course ID'] &&
        item['Deliverable'] === updatedDeliverable['Deliverable'] &&
        item['Close Date'] === updatedDeliverable['Close Date']
      );
    }
    
    // If still not found, try with just Course ID and Deliverable (most basic match)
    if (index === -1) {
      index = memoryCache.findIndex((item: any) => 
        item['Course ID'] === updatedDeliverable['Course ID'] &&
        item['Deliverable'] === updatedDeliverable['Deliverable']
      );
    }
    
    console.log('Found deliverable at index:', index);
    
    if (index === -1) {
      console.log('Deliverable not found. Looking for:', {
        courseId: updatedDeliverable['Course ID'],
        deliverable: updatedDeliverable['Deliverable'],
        openDate: updatedDeliverable['Open Date'],
        closeDate: updatedDeliverable['Close Date']
      });
      return NextResponse.json({ error: 'Deliverable not found' }, { status: 404 });
    }
    
    // Update the deliverable in memory
    memoryCache[index] = updatedDeliverable;
    
    // Update GitHub with the changes
    const gitHubSuccess = await updateGitHub(memoryCache);
    
    // Trigger webhook to notify local systems (if running locally)
    if (gitHubSuccess) {
      try {
        const webhookUrl = process.env.LOCAL_WEBHOOK_URL || 'http://localhost:3000/api/webhook/sync';
        const webhookSecret = process.env.WEBHOOK_SECRET || 'your-secret-key';
        
        // Only trigger webhook if we're running locally
        if (process.env.NODE_ENV === 'development' || process.env.LOCAL_SYNC === 'true') {
          const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-webhook-secret': webhookSecret
            },
            body: JSON.stringify({
              type: 'deliverable_updated',
              timestamp: new Date().toISOString(),
              deliverable: updatedDeliverable
            })
          });
          
          if (response.ok) {
            console.log('Webhook triggered successfully');
          } else {
            console.log('Webhook failed, but GitHub update succeeded');
          }
        }
      } catch (webhookError) {
        console.log('Webhook error (non-critical):', webhookError);
      }
    }
    
    if (gitHubSuccess) {
      console.log('Successfully updated deliverable and pushed to GitHub');
      return NextResponse.json({ 
        success: true, 
        updatedDeliverable,
        gitHubUpdated: true 
      });
    } else {
      console.log('Updated deliverable locally but failed to push to GitHub');
      return NextResponse.json({ 
        success: true, 
        updatedDeliverable,
        gitHubUpdated: false,
        warning: 'Updated locally but failed to sync with GitHub. Please configure GITHUB_TOKEN in Vercel environment variables.'
      });
    }
  } catch (error) {
    console.error('Error updating deliverable:', error);
    return NextResponse.json({ error: `Failed to update deliverable: ${error instanceof Error ? error.message : 'Unknown error'}` }, { status: 500 });
  }
}