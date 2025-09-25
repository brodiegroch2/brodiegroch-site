import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Trigger GitHub webhook or Vercel deployment
    const webhookUrl = process.env.GITHUB_WEBHOOK_URL || 'https://api.github.com/repos/brodiegroch2/brodiegroch-site/dispatches';
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event_type: 'webhook',
        client_payload: {
          message: 'Auto-save from web editor',
          timestamp: new Date().toISOString()
        }
      })
    });

    if (response.ok) {
      return NextResponse.json({ success: true, message: 'Deployment triggered' });
    } else {
      return NextResponse.json({ success: false, message: 'Failed to trigger deployment' });
    }
  } catch (error) {
    console.error('Error triggering deployment:', error);
    return NextResponse.json({ error: 'Failed to trigger deployment' }, { status: 500 });
  }
}
