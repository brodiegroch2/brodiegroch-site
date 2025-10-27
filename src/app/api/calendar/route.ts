import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'data', 'schedule.json');

interface ScheduleItem {
  'Course ID': string;
  'Day of Week': string;
  'Start Time': string;
  'End Time': string;
  'Location': string;
  'Recurring': string;
  'Period': string;
}

function escapeText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

function formatDate(dateString: string): string {
  // Parse the date string and format as ICS requires
  const date = new Date(dateString);
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

function generateUID(courseId: string, dayOfWeek: string, startTime: string): string {
  const id = `${courseId}-${dayOfWeek}-${startTime}`.replace(/[^a-zA-Z0-9]/g, '-');
  return `${id}@brodiegroch.ca`;
}

export async function GET() {
  try {
    // Read schedule data
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8')) as ScheduleItem[];
    
    // Get current timestamp
    const now = new Date();
    const timestamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
    // Generate ICS content
    let ics = `BEGIN:VCALENDAR\r\n`;
    ics += `PRODID:-//brodiegroch.ca//Course Schedule//EN\r\n`;
    ics += `VERSION:2.0\r\n`;
    ics += `METHOD:PUBLISH\r\n`;
    ics += `X-WR-CALNAME:Course Schedule - brodiegroch.ca\r\n`;
    
    // Generate events for the next 180 days (semester period)
    data.forEach((item) => {
      const startDate = new Date(item['Start Time']);
      const endDate = new Date(item['End Time']);
      
      // Get day of week (0 = Sunday, 1 = Monday, etc.)
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayOfWeek = dayNames.indexOf(item['Day of Week']);
      
      if (dayOfWeek === -1) return; // Skip if invalid day
      
      // Generate recurring events for next 180 days
      const events: Date[] = [];
      const start = new Date(startDate);
      
      // If it's not recurring, just add the single event
      if (item['Recurring'] === 'No') {
        events.push(new Date(startDate));
      } else {
        // Generate weekly recurring events
        const currentDate = new Date();
        const endOfSemester = new Date();
        endOfSemester.setDate(currentDate.getDate() + 180);
        
        let date = new Date(startDate);
        
        while (date <= endOfSemester) {
          // Only add events for the correct day of week
          if (date.getDay() === dayOfWeek) {
            events.push(new Date(date));
          }
          date.setDate(date.getDate() + 1);
        }
      }
      
      // Create an event for each occurrence
      events.forEach((eventDate) => {
        const eventStart = new Date(eventDate);
        eventStart.setHours(startDate.getHours(), startDate.getMinutes());
        
        const eventEnd = new Date(eventDate);
        eventEnd.setHours(endDate.getHours(), endDate.getMinutes());
        
        const uid = generateUID(item['Course ID'], item['Day of Week'], item['Start Time']);
        const summary = `${item['Course ID']} - ${item['Location'] || 'Class'}`;
        const description = item['Period'] || '';
        const location = escapeText(item['Location'] || '');
        
        ics += `BEGIN:VEVENT\r\n`;
        ics += `DTSTAMP:${timestamp}\r\n`;
        ics += `SUMMARY:${escapeText(summary)}\r\n`;
        if (location) {
          ics += `LOCATION:${location}\r\n`;
        }
        if (description) {
          ics += `DESCRIPTION:${escapeText(description)}\r\n`;
        }
        ics += `CLASS:PUBLIC\r\n`;
        ics += `DTSTART:${formatDate(eventStart.toISOString())}\r\n`;
        ics += `DTEND:${formatDate(eventEnd.toISOString())}\r\n`;
        ics += `UID:${uid}\r\n`;
        ics += `SEQUENCE:0\r\n`;
        ics += `LAST-MODIFIED:${timestamp}\r\n`;
        ics += `END:VEVENT\r\n`;
      });
    });
    
    ics += `END:VCALENDAR\r\n`;
    
    return new NextResponse(ics, {
      headers: {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Content-Disposition': 'attachment; filename="schedule.ics"',
      },
    });
  } catch (error) {
    console.error('Error generating calendar:', error);
    return NextResponse.json(
      { error: 'Failed to generate calendar' },
      { status: 500 }
    );
  }
}

