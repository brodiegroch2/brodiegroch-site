import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'data', 'courses.json');

function readData() {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeData(data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

async function updateViaGitHubAPI(data: any[]) {
  try {
    const githubToken = process.env.GITHUB_TOKEN;
    const repoOwner = 'brodiegroch2';
    const repoName = 'brodiegroch-site';
    const ghFilePath = 'src/data/courses.json';
    
    if (!githubToken) {
      console.error('❌ GITHUB_TOKEN environment variable not set');
      return false;
    }
    
    console.log('🔑 Using GitHub API with token...');
    
    // Get the current file content and SHA
    const getFileResponse = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${ghFilePath}`, {
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
    const commitMessage = `Update courses: ${timestamp}`;
    
    const updateResponse = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${ghFilePath}`, {
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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    const data = readData();
    
    if (id) {
      const item = data.find((item: any) => item['Course ID'] === id);
      if (!item) {
        return NextResponse.json({ error: 'Course not found' }, { status: 404 });
      }
      return NextResponse.json(item);
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading courses:', error);
    return NextResponse.json({ error: 'Failed to read courses' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const rawCourse = await req.json();
    console.log('Received POST request with rawCourse:', rawCourse);
    
    // Normalize field names: convert underscores to spaces (multiple underscores -> single space)
    const newCourse: any = {};
    for (const [key, value] of Object.entries(rawCourse)) {
      const normalizedKey = key.replace(/_+/g, ' ');
      newCourse[normalizedKey] = value;
    }
    console.log('Normalized course:', newCourse);
    
    const data = readData();
    console.log('Current data length:', data.length);
    
    // Check if course already exists
    if (data.find((item: any) => item['Course ID'] === newCourse['Course ID'])) {
      console.log('Course already exists:', newCourse['Course ID']);
      return NextResponse.json({ error: 'Course already exists' }, { status: 400 });
    }
    
    data.push(newCourse);
    
    // In production (Vercel), use GitHub API to update file
    if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
      console.log('🌐 Using GitHub API for production update...');
      const success = await updateViaGitHubAPI(data);
      if (!success) {
        return NextResponse.json({ 
          error: 'Failed to update courses via GitHub API. Please try again or update manually.',
          gitHubUpdated: false
        }, { status: 500 });
      }
      return NextResponse.json({ 
        ...newCourse,
        gitHubUpdated: true
      }, { status: 201 });
    }
    
    // In development, write to local file
    console.log('💻 Using local file system for development...');
    writeData(data);
    console.log('Successfully wrote course');
    
    return NextResponse.json(newCourse, { status: 201 });
  } catch (error) {
    console.error('Error creating course:', error);
    console.error('Error details:', error instanceof Error ? error.message : String(error));
    return NextResponse.json({ 
      error: 'Failed to create course',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const rawCourse = await req.json();
    
    // Normalize field names: convert underscores to spaces (multiple underscores -> single space)
    const updatedCourse: any = {};
    for (const [key, value] of Object.entries(rawCourse)) {
      const normalizedKey = key.replace(/_+/g, ' ');
      updatedCourse[normalizedKey] = value;
    }
    
    const data = readData();
    
    const index = data.findIndex((item: any) => item['Course ID'] === updatedCourse['Course ID']);
    if (index === -1) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }
    
    data[index] = updatedCourse;
    
    // In production (Vercel), use GitHub API to update file
    if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
      console.log('🌐 Using GitHub API for production update...');
      const success = await updateViaGitHubAPI(data);
      if (!success) {
        return NextResponse.json({ 
          error: 'Failed to update courses via GitHub API. Please try again or update manually.',
          gitHubUpdated: false
        }, { status: 500 });
      }
      return NextResponse.json({ 
        ...updatedCourse,
        gitHubUpdated: true
      });
    }
    
    // In development, write to local file
    writeData(data);
    
    return NextResponse.json(updatedCourse);
  } catch (error) {
    console.error('Error updating course:', error);
    return NextResponse.json({ error: 'Failed to update course' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    
    const data = readData();
    const index = data.findIndex((item: any) => item['Course ID'] === id);
    
    if (index === -1) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }
    
    data.splice(index, 1);
    
    // In production (Vercel), use GitHub API to update file
    if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
      console.log('🌐 Using GitHub API for production update...');
      const success = await updateViaGitHubAPI(data);
      if (!success) {
        return NextResponse.json({ 
          error: 'Failed to update courses via GitHub API. Please try again or update manually.',
          gitHubUpdated: false
        }, { status: 500 });
      }
      return NextResponse.json({ 
        success: true,
        gitHubUpdated: true
      });
    }
    
    // In development, write to local file
    writeData(data);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting course:', error);
    return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 });
  }
}
