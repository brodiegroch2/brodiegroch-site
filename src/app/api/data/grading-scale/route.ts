import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'data', 'grading-scale.json');

function readData() {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeData(data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const letterGrade = searchParams.get('letterGrade');
    
    const data = readData();
    
    if (letterGrade) {
      const item = data.find((item: any) => item.letterGrade === letterGrade);
      if (!item) {
        return NextResponse.json({ error: 'Grade not found' }, { status: 404 });
      }
      return NextResponse.json(item);
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading grading scale:', error);
    return NextResponse.json({ error: 'Failed to read grading scale' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const newGrade = await req.json();
    const data = readData();
    
    // Check if grade already exists
    if (data.find((item: any) => item.letterGrade === newGrade.letterGrade)) {
      return NextResponse.json({ error: 'Grade already exists' }, { status: 400 });
    }
    
    data.push(newGrade);
    writeData(data);
    
    return NextResponse.json(newGrade, { status: 201 });
  } catch (error) {
    console.error('Error creating grade:', error);
    return NextResponse.json({ error: 'Failed to create grade' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const updatedGrade = await req.json();
    const data = readData();
    
    const index = data.findIndex((item: any) => item.letterGrade === updatedGrade.letterGrade);
    if (index === -1) {
      return NextResponse.json({ error: 'Grade not found' }, { status: 404 });
    }
    
    data[index] = updatedGrade;
    writeData(data);
    
    return NextResponse.json(updatedGrade);
  } catch (error) {
    console.error('Error updating grade:', error);
    return NextResponse.json({ error: 'Failed to update grade' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const letterGrade = searchParams.get('letterGrade');
    
    if (!letterGrade) {
      return NextResponse.json({ error: 'letterGrade is required' }, { status: 400 });
    }
    
    const data = readData();
    const index = data.findIndex((item: any) => item.letterGrade === letterGrade);
    
    if (index === -1) {
      return NextResponse.json({ error: 'Grade not found' }, { status: 404 });
    }
    
    data.splice(index, 1);
    writeData(data);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting grade:', error);
    return NextResponse.json({ error: 'Failed to delete grade' }, { status: 500 });
  }
}

