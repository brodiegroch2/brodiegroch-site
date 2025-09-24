import { NextResponse } from 'next/server';
import quickLinksData from '@/data/quick-links.json';

export async function GET() {
  return NextResponse.json(quickLinksData);
}
