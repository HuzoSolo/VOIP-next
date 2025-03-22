import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Get the request body
    const body = await request.json();
    
    // Log the received payload
    console.log('Received payload:', body);
    
    // Return the payload as is for testing
    return NextResponse.json({
      success: true,
      message: 'Payload received successfully',
      receivedPayload: body,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in test endpoint:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error processing request',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 