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
    // We'll try multiple approaches to find the deliverable
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
    
    // Try to write to file (will work in development, fail gracefully in production)
    try {
      fs.writeFileSync(filePath, JSON.stringify(memoryCache, null, 2));
      console.log('Successfully updated deliverable in file');
    } catch (writeError) {
      console.log('File write failed (expected in production), data updated in memory only');
    }
    
    console.log('Successfully updated deliverable');
    return NextResponse.json({ success: true, updatedDeliverable });
  } catch (error) {
    console.error('Error updating deliverable:', error);
    return NextResponse.json({ error: `Failed to update deliverable: ${error instanceof Error ? error.message : 'Unknown error'}` }, { status: 500 });
  }
}