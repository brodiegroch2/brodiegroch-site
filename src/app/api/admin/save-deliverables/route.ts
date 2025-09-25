import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const deliverables = await request.json();
    
    // Save to local file
    const filePath = path.join(process.cwd(), 'src/data/deliverables.json');
    fs.writeFileSync(filePath, JSON.stringify(deliverables, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving deliverables:', error);
    return NextResponse.json({ error: 'Failed to save deliverables' }, { status: 500 });
  }
}
