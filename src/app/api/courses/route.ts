import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const coursesDir = path.join(process.cwd(), 'src', 'data', 'courses');

// Helper function to get all course IDs
function getAllCourseIds(): string[] {
  if (!fs.existsSync(coursesDir)) {
    return [];
  }
  return fs.readdirSync(coursesDir)
    .filter(file => file.endsWith('.json'))
    .map(file => file.replace('.json', ''));
}

// Helper function to read a specific course
function readCourse(courseId: string): any | null {
  const filePath = path.join(coursesDir, `${courseId}.json`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

// Helper function to read all courses
function readAllCourses(): any[] {
  const ids = getAllCourseIds();
  return ids.map(id => readCourse(id)).filter(course => course !== null);
}

// Helper function to write a course
function writeCourse(courseData: any): boolean {
  try {
    if (!fs.existsSync(coursesDir)) {
      fs.mkdirSync(coursesDir, { recursive: true });
    }
    
    // Use the id field or try to extract from the filename pattern
    const courseId = courseData.id || courseData.code || courseData.name;
    if (!courseId) {
      console.error('No course ID found in data');
      return false;
    }
    
    const filePath = path.join(coursesDir, `${courseId}.json`);
    fs.writeFileSync(filePath, JSON.stringify(courseData, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing course:', error);
    return false;
  }
}

// Helper function to delete a course
function deleteCourse(courseId: string): boolean {
  try {
    const filePath = path.join(coursesDir, `${courseId}.json`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting course:', error);
    return false;
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('id');
    
    if (courseId) {
      // Get specific course
      const course = readCourse(courseId);
      if (!course) {
        return NextResponse.json(
          { error: 'Course not found' }, 
          { status: 404 }
        );
      }
      return NextResponse.json(course);
    }
    
    // Get all courses
    const courses = readAllCourses();
    return NextResponse.json(courses);
  } catch (error) {
    console.error('Error reading courses:', error);
    return NextResponse.json(
      { error: 'Failed to read courses' }, 
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const courseData = await req.json();
    console.log('Creating course:', courseData.id || courseData.code);
    
    // Check if course already exists
    const courseId = courseData.id || courseData.code;
    if (readCourse(courseId)) {
      return NextResponse.json(
        { error: 'Course already exists' }, 
        { status: 400 }
      );
    }
    
    const success = writeCourse(courseData);
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to create course file' }, 
        { status: 500 }
      );
    }
    
    return NextResponse.json(courseData, { status: 201 });
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json(
      { error: 'Failed to create course' }, 
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const courseData = await req.json();
    console.log('Updating course:', courseData.id || courseData.code);
    
    const courseId = courseData.id || courseData.code;
    
    // Check if course exists
    if (!readCourse(courseId)) {
      return NextResponse.json(
        { error: 'Course not found' }, 
        { status: 404 }
      );
    }
    
    const success = writeCourse(courseData);
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to update course file' }, 
        { status: 500 }
      );
    }
    
    return NextResponse.json(courseData);
  } catch (error) {
    console.error('Error updating course:', error);
    return NextResponse.json(
      { error: 'Failed to update course' }, 
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('id');
    
    if (!courseId) {
      return NextResponse.json(
        { error: 'Course ID is required' }, 
        { status: 400 }
      );
    }
    
    if (!readCourse(courseId)) {
      return NextResponse.json(
        { error: 'Course not found' }, 
        { status: 404 }
      );
    }
    
    const success = deleteCourse(courseId);
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete course file' }, 
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting course:', error);
    return NextResponse.json(
      { error: 'Failed to delete course' }, 
      { status: 500 }
    );
  }
}

