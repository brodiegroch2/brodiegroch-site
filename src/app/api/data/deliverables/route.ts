import { NextResponse } from 'next/server';
import deliverablesData from '@/data/deliverables.json';

export async function GET() {
  return NextResponse.json(deliverablesData);
}
