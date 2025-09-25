import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret (optional but recommended)
    const secret = request.headers.get('x-webhook-secret');
    if (secret !== process.env.WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Execute auto-save script
    const { stdout, stderr } = await execAsync('./auto-save.sh');
    
    if (stderr) {
      console.error('Error:', stderr);
      return NextResponse.json({ error: stderr }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Deployment triggered successfully',
      output: stdout 
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Failed to trigger deployment' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Webhook endpoint active',
    usage: 'POST to this endpoint to trigger deployment'
  });
}
