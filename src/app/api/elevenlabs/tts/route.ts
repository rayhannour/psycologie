import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const { text, language } = await request.json();

  if (!apiKey) {
    return NextResponse.json({ error: 'ElevenLabs API key missing' }, { status: 500 });
  }
  try {
    let voiceId = 'pNInz6obpgDQGcFmaJgB'; // Default stable voice ID (Adam)

    // 1. Try to get the list of available voices (requires voices_read permission)
    try {
      const voicesResponse = await fetch('https://api.elevenlabs.io/v1/voices', {
        headers: { 'xi-api-key': apiKey },
      });
      
      if (voicesResponse.ok) {
        const { voices } = await voicesResponse.json();
        if (voices && voices.length > 0) {
          voiceId = voices[0].voice_id;
        }
      } else {
        console.warn("Voices API skipped (missing permission), using hardcoded default.");
      }
    } catch (e) {
      console.warn("Could not fetch voices, using default ID.");
    }
    
    console.log("Using voiceId:", voiceId);

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': apiKey,
      },
      body: JSON.stringify({
        text: text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    });
    console.log("TTS Response status:", response.status);

    if (!response.ok) {
      const errData = await response.json();
      console.error('ElevenLabs API Error:', JSON.stringify(errData, null, 2));
      return NextResponse.json(errData, { status: response.status });
    }

    const audioBuffer = await response.arrayBuffer();
    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
      },
    });
  } catch (error) {
    console.error('TTS Proxy Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
