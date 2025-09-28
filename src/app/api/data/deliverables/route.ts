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
    // Write to local file first
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    
    // Commit and push to GitHub
    const { exec } = require('child_process');
    const util = require('util');
    const execAsync = util.promisify(exec);
    
    // Add all changes
    await execAsync('git add .');
    
    // Commit with timestamp
    const timestamp = new Date().toISOString();
    await execAsync(`git commit -m "Update deliverables: ${timestamp}"`);
    
    // Push to GitHub
    await execAsync('git push origin main');
    
    console.log('Successfully updated GitHub with deliverable changes');
    return true;
  } catch (error) {
    console.error('Error updating GitHub:', error);
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
    const updatedDeliverable = await request.json();
    console.log('API received deliverable:', updatedDeliverable);
    
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
        warning: 'Updated locally but failed to sync with GitHub'
      });
    }
  } catch (error) {
    console.error('Error updating deliverable:', error);
    return NextResponse.json({ error: `Failed to update deliverable: ${error instanceof Error ? error.message : 'Unknown error'}` }, { status: 500 });
  }
}