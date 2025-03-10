import { NextRequest, NextResponse } from 'next/server';
import ky from 'ky';

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  console.log('Twitch code', code);
  if (!code) {
    return NextResponse.json({ error: 'Código no encontrado' }, { status: 400 });
  }

  try {
    const clientId = process.env.TWITCH_CLIENT_ID!;
    const clientSecret = process.env.TWITCH_CLIENT_SECRET!;
    const redirectUri = 'http://localhost:3000/api/v1/callback/twitch';

    // Intercambiar el `code` por un `access_token`
    const response = await ky.post('https://id.twitch.tv/oauth2/token', {
      searchParams: {
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri
      }
    })

    console.log('twitch client', clientId);
    console.log('twitch secret', clientSecret);

    const data = await response.json();
    console.log('Twitch response', data);

    if (!response.ok) {
      return NextResponse.json({ error: 'Error en la autenticación', details: data }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Error en la autenticación', details: String(error) }, { status: 500 });
  }
}


// import { KY, Method } from "@/services/api/index"
// import { NextResponse } from 'next/server';

// export async function POST(req: Request, res: NextResponse) {
//   try {
//     const { platform, action, userId } = await req.json()

//     const response = { platform, action, userId }


//     const broadcasterId = 'flano2';  // Id of the broadcaster channel
//     const accessToken = process.env.TWITCH_ACCESS_TOKEN;

//     if (!accessToken) {
//       return NextResponse.json({ error: 'Access token is required' });
//     }

//     // try {
//     // ? Call the Twitch API to get the list of followers
//     const followers = await getFollowers(broadcasterId, accessToken!);

//     // ? Verify if a user is following the channel
//     const userToCheck = '';  // * user's name
//     const isFollowing = followers.some((follower: any) => follower.from_name.toLowerCase() === userToCheck.toLowerCase());

//     return NextResponse.json({ isFollowing });
//   } catch (error) {
//     console.error('Error fetching followers:', error);
//     NextResponse.json({ error: 'Failed to fetch followers' });
//   }
// }


// // * Function to get the list of followers
// async function getFollowers(broadcasterId: string, accessToken: string) {
//   const response = await fetch(`https://api.twitch.tv/helix/users/follows?to_id=${broadcasterId}`, {
//     method: 'GET',
//     headers: {
//       'Client-ID': process.env.TWITCH_CLIENT_ID!,
//       'Authorization': `Bearer ${accessToken}`,
//     },
//   });

//   if (!response.ok) {
//     throw new Error('Failed to fetch followers');
//   }

//   const data = await response.json();
//   return data.data;  // | Return the list of followers
// }
