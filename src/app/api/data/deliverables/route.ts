import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'data', 'deliverables.json');

export async function GET() {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading deliverables data:', error);
    return NextResponse.json({ error: 'Failed to read deliverables data' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updatedDeliverable = await request.json();
    console.log('API received deliverable:', updatedDeliverable);
    
    // Read current data
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Find the deliverable using Course ID and Deliverable name (most stable identifiers)
    // We'll try multiple approaches to find the deliverable
    let index = data.findIndex((item: any) => 
      item['Course ID'] === updatedDeliverable['Course ID'] &&
      item['Deliverable'] === updatedDeliverable['Deliverable'] &&
      item['Open Date'] === updatedDeliverable['Open Date']
    );
    
    // If not found, try with original Close Date (in case it wasn't changed)
    if (index === -1) {
      index = data.findIndex((item: any) => 
        item['Course ID'] === updatedDeliverable['Course ID'] &&
        item['Deliverable'] === updatedDeliverable['Deliverable'] &&
        item['Close Date'] === updatedDeliverable['Close Date']
      );
    }
    
    // If still not found, try with just Course ID and Deliverable (most basic match)
    if (index === -1) {
      index = data.findIndex((item: any) => 
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
    
    // Update the deliverable
    data[index] = updatedDeliverable;
    
    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    
    console.log('Successfully updated deliverable');
    return NextResponse.json({ success: true, updatedDeliverable });
  } catch (error) {
    console.error('Error updating deliverable:', error);
    return NextResponse.json({ error: `Failed to update deliverable: ${error instanceof Error ? error.message : 'Unknown error'}` }, { status: 500 });
  }
}
