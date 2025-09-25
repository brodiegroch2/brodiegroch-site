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
    
    // Read current data
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Find and update the deliverable
    const index = data.findIndex((item: any) => 
      item['Course ID'] === updatedDeliverable['Course ID'] &&
      item['Deliverable'] === updatedDeliverable['Deliverable'] &&
      item['Close Date'] === updatedDeliverable['Close Date']
    );
    
    if (index === -1) {
      return NextResponse.json({ error: 'Deliverable not found' }, { status: 404 });
    }
    
    // Update the deliverable
    data[index] = updatedDeliverable;
    
    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    
    return NextResponse.json({ success: true, updatedDeliverable });
  } catch (error) {
    console.error('Error updating deliverable:', error);
    return NextResponse.json({ error: 'Failed to update deliverable' }, { status: 500 });
  }
}
