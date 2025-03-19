import { NextRequest, NextResponse } from 'next/server';
import ky from 'ky';
import { auth } from '@/auth';
import { db } from '@/db';
import { TokenBody } from '@/lib/types';
import { KY, Method } from '@/services/api';

export async function GET(req: NextRequest) {
  let userId
  const url = new URL(req.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'Code not found' }, { status: 400 });
  }

  const session = await auth()

  if (!session) {
    return NextResponse.json({ error: 'Authentication error' }, { status: 401 });
  }

  try {
    const email = session.user?.email

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

    const data = await response.json() as TokenBody

    //console.log('Twitch authorization response', data);

    const { access_token, refresh_token, expires_in } = data

    const tokenResponse = await db.tokens.upsert({
      where: {
        email: email!
      },
      update: {
        twitch: {
          access_token,
          refresh_token,
          expires_in,
          generatedAt: Date.now()
        }
      },
      create: {
        email: email!,
        twitch: {
          access_token,
          refresh_token,
          expires_in,
          generatedAt: Date.now()
        }
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Authentication error', details: data }, { status: 500 });
    }

    if (tokenResponse) {
      userId = await db.user.findUnique({
        where: {
          email: email!
        },
        select: {
          id: true
        }
      })
    }
    if (!userId) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    //console.log('userId retrived from API calling db', userId);

    const userInfoResponse = await KY(Method.POST, 'http://localhost:3000/api/v1/thirdparty-userdata', {
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      body: {
        provider: 'twitch'
      }
    })

    console.log('userInfoResponse', userInfoResponse);
    // await fetch(`${process.env.BASE_URL}`, {
    //   headers: { Authorization: `Bearer ${access_token}` },
    // });



    return NextResponse.redirect(`http://localhost:3000/user/${userId.id}`)
  } catch (error) {
    return NextResponse.json({ error: 'Authentication error', details: String(error) }, { status: 500 });
  }
}


