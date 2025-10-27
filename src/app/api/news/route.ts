import { NextRequest, NextResponse } from 'next/server';

// RSS feeds mapping for each course
const RSS_FEEDS = {
  'MECH 205': 'https://learn.sait.ca/d2l/le/news/rss/823449/course?token=am7s6gddl0p75ysm3678a&ou=823449',
  'MECH 200': 'https://learn.sait.ca/d2l/le/news/rss/805444/course?token=am7s6gddl0p75ysm3678a&ou=805444',
  'STCS 255': 'https://learn.sait.ca/d2l/le/news/rss/797955/course?token=am7s6gddl0p75ysm3678a&ou=797955',
  'COMP 213': 'https://learn.sait.ca/d2l/le/news/rss/797356/course?token=am7s6gddl0p75ysm3678a&ou=797356',
  'MATH 238': 'https://learn.sait.ca/d2l/le/news/rss/796170/course?token=am7s6gddl0p75ysm3678a&ou=796170',
};

interface NewsItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  courseId: string;
}

// Simple RSS parser
function parseRSS(rssXml: string): NewsItem[] {
  const items: NewsItem[] = [];
  
  // Extract item tags
  const itemRegex = /<item>(.*?)<\/item>/gs;
  const matches = rssXml.matchAll(itemRegex);
  
  for (const match of matches) {
    const itemContent = match[1];
    
    const titleMatch = itemContent.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/s) || 
                       itemContent.match(/<title>(.*?)<\/title>/s);
    const linkMatch = itemContent.match(/<link>(.*?)<\/link>/s);
    const descMatch = itemContent.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/s) ||
                       itemContent.match(/<description>(.*?)<\/description>/s);
    const dateMatch = itemContent.match(/<pubDate>(.*?)<\/pubDate>/s);
    
    if (titleMatch) {
      items.push({
        title: titleMatch[1].trim(),
        link: linkMatch ? linkMatch[1].trim() : '',
        description: descMatch ? descMatch[1].trim() : '',
        pubDate: dateMatch ? dateMatch[1].trim() : new Date().toISOString(),
        courseId: '', // Will be filled by the caller
      });
    }
  }
  
  return items;
}

// Clean HTML from description
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&rsquo;/g, "'")
    .trim();
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('courseId');
    
    // If specific course requested
    if (courseId) {
      const feedUrl = Object.entries(RSS_FEEDS).find(([key]) => 
        key.includes(courseId) || courseId.includes(key.split(' ')[0])
      )?.[1];
      
      if (!feedUrl) {
        return NextResponse.json({ error: 'Course not found' }, { status: 404 });
      }
      
      try {
        const response = await fetch(feedUrl, { 
          next: { revalidate: 300 } // Cache for 5 minutes
        });
        
        if (!response.ok) {
          return NextResponse.json({ error: 'Failed to fetch feed' }, { status: 500 });
        }
        
        const xml = await response.text();
        const items = parseRSS(xml);
        
        return NextResponse.json({
          courseId,
          items: items.map(item => ({
            ...item,
            description: stripHtml(item.description),
          })),
        });
      } catch (error) {
        console.error('Error fetching RSS feed:', error);
        return NextResponse.json({ 
          courseId,
          items: [],
          error: 'Feed currently empty or unavailable'
        });
      }
    }
    
    // Fetch all courses
    const allNews: Record<string, NewsItem[]> = {};
    
    await Promise.all(
      Object.entries(RSS_FEEDS).map(async ([course, feedUrl]) => {
        try {
          const response = await fetch(feedUrl, { 
            next: { revalidate: 300 }
          });
          
          if (!response.ok) {
            console.error(`Failed to fetch feed for ${course}:`, response.status);
            allNews[course] = [];
            return;
          }
          
          const xml = await response.text();
          
          // Check if feed has items or is just the feed header
          const hasItems = xml.includes('<item>');
          
          if (hasItems) {
            const items = parseRSS(xml);
            allNews[course] = items.map(item => ({
              ...item,
              courseId: course,
              description: stripHtml(item.description),
            }));
          } else {
            allNews[course] = [];
          }
        } catch (error) {
          console.error(`Error fetching feed for ${course}:`, error);
          allNews[course] = [];
        }
      })
    );
    
    return NextResponse.json({ news: allNews });
  } catch (error) {
    console.error('Error in news API:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}

