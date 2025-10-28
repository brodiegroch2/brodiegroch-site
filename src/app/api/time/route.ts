import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const now = new Date();
    
    // Get current date/time in multiple timezones
    const edmontonTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Edmonton"}));
    const utcTime = new Date(now.toISOString());
    
    return NextResponse.json({
      success: true,
      timestamp: now.toISOString(),
      date: now.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        timeZone: 'America/Edmonton'
      }),
      time: now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true,
        timeZone: 'America/Edmonton'
      }),
      timezone: 'America/Edmonton',
      timezoneOffset: edmontonTime.getTime() - utcTime.getTime(),
      unixTimestamp: Math.floor(now.getTime() / 1000),
      year: edmontonTime.getFullYear(),
      month: edmontonTime.getMonth() + 1,
      day: edmontonTime.getDate(),
      weekday: now.toLocaleDateString('en-US', { 
        weekday: 'long',
        timeZone: 'America/Edmonton'
      })
    });
  } catch (error) {
    console.error('Error getting time:', error);
    return NextResponse.json({ 
      error: 'Failed to get current time' 
    }, { status: 500 });
  }
}

