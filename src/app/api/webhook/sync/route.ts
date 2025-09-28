import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret for security
    const webhookSecret = request.headers.get('x-webhook-secret');
    const expectedSecret = process.env.WEBHOOK_SECRET || 'your-secret-key';
    
    if (webhookSecret !== expectedSecret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();
    console.log('Webhook received:', body);
    
    // Pull latest changes from GitHub
    try {
      await execAsync('git fetch origin main');
      await execAsync('git pull origin main');
      console.log('Successfully pulled latest changes');
      
      return NextResponse.json({ 
        success: true, 
        message: 'Local directory updated with latest changes',
        timestamp: new Date().toISOString()
      });
    } catch (gitError) {
      console.error('Git pull failed:', gitError);
      return NextResponse.json({ 
        error: 'Failed to pull changes',
        details: gitError instanceof Error ? gitError.message : 'Unknown error'
      }, { status: 500 });
    }
    
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ 
      error: 'Webhook processing failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
