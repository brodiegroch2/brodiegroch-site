import { NextResponse } from 'next/server';
import coursesData from '@/data/courses.json';

export async function GET() {
  return NextResponse.json(coursesData);
}
