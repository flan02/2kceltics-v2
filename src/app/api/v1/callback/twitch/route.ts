import { NextRequest, NextResponse } from 'next/server';
import ky from 'ky';
import { auth } from '@/auth';
import { db } from '@/db';
import { TokenBody } from '@/lib/types';


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
    const { access_token, refresh_token, expires_in } = data

    const userResponse = await ky.get("https://api.twitch.tv/helix/users", {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Client-Id": clientId,
      },
    });

    const userData = await userResponse.json() as any;
    if (!userData || !userData.data || userData.data.length === 0) {
      return NextResponse.json({ error: "Failed to fetch Twitch user data" }, { status: 500 });
    }

    const twitchUser = userData.data[0];
    const twitchUserId = twitchUser.id; // Aquí obtenemos el `user_id` de Twitch

    const tokenResponse = await db.tokens.upsert({
      where: {
        email: email!
      },
      update: {
        twitch: {
          access_token,
          refresh_token,
          expires_in,
          generatedAt: Date.now(),
          user_id: twitchUserId
        }
      },
      create: {
        email: email!,
        twitch: {
          access_token,
          refresh_token,
          expires_in,
          generatedAt: Date.now(),
          user_id: twitchUserId

        }
      }
    })

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

    return NextResponse.redirect(`http://localhost:3000/user/${userId.id}`)
  } catch (error) {
    return NextResponse.json({ error: 'Authentication error', details: String(error) }, { status: 500 });
  }
}



//console.log('userId retrived from API calling db', userId);

// console.log("Access Token for Twitch before calling thirdparty data API:", access_token);
// const userInfoResponse = await KY(Method.POST, 'http://localhost:3000/api/v1/thirdparty-userdata', {
//   headers: {
//     authorization: `Bearer ${access_token}`,
//   },
//   json: {
//     provider: 'twitch'
//   }
// })

//console.log('userInfoResponse', userInfoResponse);