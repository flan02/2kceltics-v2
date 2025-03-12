import { NextRequest, NextResponse } from 'next/server';
import ky from 'ky';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'Code not found' }, { status: 400 });
  }

  try {
    const clientId = process.env.TWITCH_CLIENT_ID!;
    const clientSecret = process.env.TWITCH_CLIENT_SECRET!;
    const redirectUri = "http://localhost:3000/api/v1/callback/twitch"

    // * Intercambiar el `code` por un `access_token`
    const response = await ky.post('https://id.twitch.tv/oauth2/token', {
      searchParams: {
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri
      }
    })

    const data = await response.json();
    console.log('Twitch response', data);

    if (!response.ok) {
      return NextResponse.json({ error: 'Authentication error', details: data }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Authentication error', details: String(error) }, { status: 500 });
  }
}


