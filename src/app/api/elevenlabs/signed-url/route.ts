import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json({ error: 'ElevenLabs API key not configured' }, { status: 500 });
  }

  try {
    const response = await fetch('https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=8301kqvk1h4xfa096j8acw49d4ac', { // Real Agent ID (prefix removed if necessary)
      method: 'GET',
      headers: {
        'xi-api-key': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get signed URL');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
