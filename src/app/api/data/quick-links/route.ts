import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'data', 'quick-links.json');

function readData() {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeData(data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get('name');
    
    const data = readData();
    
    if (name) {
      const item = data.find((item: any) => item['Site Name'] === name);
      if (!item) {
        return NextResponse.json({ error: 'Link not found' }, { status: 404 });
      }
      return NextResponse.json(item);
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading quick-links:', error);
    return NextResponse.json({ error: 'Failed to read links' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const rawLink = await req.json();
    
    // Normalize field names: convert underscores to spaces (multiple underscores -> single space)
    const newLink: any = {};
    for (const [key, value] of Object.entries(rawLink)) {
      const normalizedKey = key.replace(/_+/g, ' ');
      newLink[normalizedKey] = value;
    }
    
    const data = readData();
    
    // Check if link already exists
    if (data.find((item: any) => item['Site Name'] === newLink['Site Name'])) {
      return NextResponse.json({ error: 'Link already exists' }, { status: 400 });
    }
    
    data.push(newLink);
    writeData(data);
    
    return NextResponse.json(newLink, { status: 201 });
  } catch (error) {
    console.error('Error creating link:', error);
    return NextResponse.json({ error: 'Failed to create link' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const rawLink = await req.json();
    
    // Normalize field names: convert underscores to spaces (multiple underscores -> single space)
    const updatedLink: any = {};
    for (const [key, value] of Object.entries(rawLink)) {
      const normalizedKey = key.replace(/_+/g, ' ');
      updatedLink[normalizedKey] = value;
    }
    
    const data = readData();
    
    const index = data.findIndex((item: any) => item['Site Name'] === updatedLink['Site Name']);
    if (index === -1) {
      return NextResponse.json({ error: 'Link not found' }, { status: 404 });
    }
    
    data[index] = updatedLink;
    writeData(data);
    
    return NextResponse.json(updatedLink);
  } catch (error) {
    console.error('Error updating link:', error);
    return NextResponse.json({ error: 'Failed to update link' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get('name');
    
    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    
    const data = readData();
    const index = data.findIndex((item: any) => item['Site Name'] === name);
    
    if (index === -1) {
      return NextResponse.json({ error: 'Link not found' }, { status: 404 });
    }
    
    data.splice(index, 1);
    writeData(data);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting link:', error);
    return NextResponse.json({ error: 'Failed to delete link' }, { status: 500 });
  }
}
