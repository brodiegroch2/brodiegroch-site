import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'actions.txt');

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action');
    const category = searchParams.get('category');
    
    // Read the actions.txt file
    let content = fs.readFileSync(filePath, 'utf8');
    
    // If filtering by specific action or category, parse and return that section
    if (action || category) {
      const lines = content.split('\n');
      let result: string[] = [];
      let inSection = false;
      let currentCategory = '';
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Check if this is a category header
        if (line.startsWith('## ')) {
          currentCategory = line.replace('## ', '');
          inSection = false;
          
          if (category) {
            inSection = currentCategory.toLowerCase().includes(category.toLowerCase());
          }
        }
        
        // Check if this is an action definition
        if (line.startsWith('### ') && action) {
          const actionName = line.replace('### ', '');
          if (actionName.toLowerCase() === action.toLowerCase()) {
            inSection = true;
          } else if (!line.startsWith('###')) {
            inSection = false;
          }
        }
        
        if (inSection || (!action && !category)) {
          result.push(line);
        }
      }
      
      if (result.length > 0) {
        content = result.join('\n');
      }
    }
    
    return NextResponse.json({
      success: true,
      documentation: content,
      timestamp: new Date().toISOString(),
      note: 'This documentation describes all available API actions for the brodiegroch.ca system'
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    });
  } catch (error) {
    console.error('Error reading actions:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to read actions documentation',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

