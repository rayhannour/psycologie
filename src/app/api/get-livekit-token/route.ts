import { NextRequest, NextResponse } from 'next/server';
import { AccessToken } from 'livekit-server-sdk';

export async function GET(request: NextRequest) {
  const room = request.nextUrl.searchParams.get('room');
  const username = request.nextUrl.searchParams.get('username') || 'Agent_CGPR';

  if (!room) {
    return NextResponse.json({ error: 'Missing "room" query parameter' }, { status: 400 });
  }

  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  const wsUrl = process.env.LIVEKIT_URL;

  if (!apiKey || !apiSecret || !wsUrl) {
    return NextResponse.json({ error: 'Server misconfigured: LiveKit credentials missing' }, { status: 500 });
  }

  const at = new AccessToken(apiKey, apiSecret, {
    identity: username,
  });

  at.addGrant({ roomJoin: true, room: room, canPublish: true, canSubscribe: true });

  return NextResponse.json({ token: await at.toJwt() });
}
