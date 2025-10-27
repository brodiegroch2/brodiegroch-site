import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'data', 'schedule.json');

function readData() {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeData(data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('courseId');
    const dayOfWeek = searchParams.get('dayOfWeek');
    
    const data = readData();
    
    if (courseId && dayOfWeek) {
      const items = data.filter((item: any) => 
        item['Course ID'] === courseId && item['Day of Week'] === dayOfWeek
      );
      return NextResponse.json(items);
    }
    
    if (courseId) {
      const items = data.filter((item: any) => item['Course ID'] === courseId);
      return NextResponse.json(items);
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading schedule:', error);
    return NextResponse.json({ error: 'Failed to read schedule' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const rawScheduleItem = await req.json();
    
    // Normalize field names: convert underscores to spaces (multiple underscores -> single space)
    const newScheduleItem: any = {};
    for (const [key, value] of Object.entries(rawScheduleItem)) {
      const normalizedKey = key.replace(/_+/g, ' ');
      newScheduleItem[normalizedKey] = value;
    }
    
    const data = readData();
    
    data.push(newScheduleItem);
    writeData(data);
    
    return NextResponse.json(newScheduleItem, { status: 201 });
  } catch (error) {
    console.error('Error creating schedule item:', error);
    return NextResponse.json({ error: 'Failed to create schedule item' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const rawScheduleItem = await req.json();
    
    // Normalize field names: convert underscores to spaces (multiple underscores -> single space)
    const updatedScheduleItem: any = {};
    for (const [key, value] of Object.entries(rawScheduleItem)) {
      const normalizedKey = key.replace(/_+/g, ' ');
      updatedScheduleItem[normalizedKey] = value;
    }
    
    const data = readData();
    
    const index = data.findIndex((item: any) => 
      item['Course ID'] === updatedScheduleItem['Course ID'] &&
      item['Day of Week'] === updatedScheduleItem['Day of Week'] &&
      item['Start Time'] === updatedScheduleItem['Start Time']
    );
    
    if (index === -1) {
      return NextResponse.json({ error: 'Schedule item not found' }, { status: 404 });
    }
    
    data[index] = updatedScheduleItem;
    writeData(data);
    
    return NextResponse.json(updatedScheduleItem);
  } catch (error) {
    console.error('Error updating schedule item:', error);
    return NextResponse.json({ error: 'Failed to update schedule item' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('courseId');
    const dayOfWeek = searchParams.get('dayOfWeek');
    const startTime = searchParams.get('startTime');
    
    if (!courseId || !dayOfWeek || !startTime) {
      return NextResponse.json({ error: 'courseId, dayOfWeek, and startTime are required' }, { status: 400 });
    }
    
    const data = readData();
    const index = data.findIndex((item: any) => 
      item['Course ID'] === courseId &&
      item['Day of Week'] === dayOfWeek &&
      item['Start Time'] === startTime
    );
    
    if (index === -1) {
      return NextResponse.json({ error: 'Schedule item not found' }, { status: 404 });
    }
    
    data.splice(index, 1);
    writeData(data);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting schedule item:', error);
    return NextResponse.json({ error: 'Failed to delete schedule item' }, { status: 500 });
  }
}
