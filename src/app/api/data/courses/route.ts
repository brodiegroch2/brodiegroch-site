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
    const newCourse = await req.json();
    const data = readData();
    
    // Check if course already exists
    if (data.find((item: any) => item['Course ID'] === newCourse['Course ID'])) {
      return NextResponse.json({ error: 'Course already exists' }, { status: 400 });
    }
    
    data.push(newCourse);
    writeData(data);
    
    return NextResponse.json(newCourse, { status: 201 });
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const updatedCourse = await req.json();
    const data = readData();
    
    const index = data.findIndex((item: any) => item['Course ID'] === updatedCourse['Course ID']);
    if (index === -1) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }
    
    data[index] = updatedCourse;
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
    writeData(data);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting course:', error);
    return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 });
  }
}
