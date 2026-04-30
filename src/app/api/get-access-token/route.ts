import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const liveAvatarUrl = process.env.VERA_URL_STREAM || "https://api.liveavatar.com";
    const apiKey = process.env.VERA_TCKEN;

    if (!apiKey) {
      return NextResponse.json({ error: 'Missing API Key' }, { status: 500 });
    }

    const response = await fetch(`${liveAvatarUrl}/v1/sessions/token`, {
      method: "POST",
      headers: {
        "X-API-KEY": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mode: "FULL",
        avatar_id: process.env.VERA_AVATARID || "40b4f000-f783-4bba-a327-ea58b1a6fdf2",
        avatar_persona: {
          voice_id: "e948b062-7dce-4f2b-bcf6-98bd3511106b",
          context_id: "4968939e-b021-480d-a07d-f11e62e8beed",
          language: "ar", // Arabic for Psycologie
          stt_config: { provider: 'deepgram', language: 'ar', model: 'nova-2' },
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: errorText }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ token: data.data.session_token });

  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
