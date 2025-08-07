"use server"

import { signOut } from "@/auth"
import { db } from "@/db";
import { TwitchChannelFollowers } from "@/lib/types";
//import { Platform } from "@/lib/types";



export async function handleGoogleSignOut() {
  "use server"
  await signOut()
}

// export async function updateToken(userId: string, platform: Platform, newAccessToken: string, newRefreshToken: string, expiresAt: number) {
//   await db.tokens.update({
//     where: { userId },
//     data: {
//       [platform]: {
//         set: {
//           accessToken: newAccessToken,
//           refreshToken: newRefreshToken,
//           expiresAt: new Date(expiresAt * 1000) // Convertir timestamp UNIX a Date
//         }
//       },
//       updatedAt: new Date()
//     }
//   })
// }

export async function getTwitchBroadcasterData() {
  const accessToken = process.env.TWITCH_ACCESS_TOKEN;
  
  try {
    const response = await fetch("https://api.twitch.tv/helix/users", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Client-Id": process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID!,
      },
    });

    if (!response.ok) {
      throw new Error(`Twitch API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    console.log("Current user data from Twitch:", data);
    return data;
  } catch (error) {
    console.error("Error fetching Twitch user data:", error);
    return { error: "Failed to fetch Twitch user data" };
  }

}

export async function getThirdPartyData(accessToken: string) {
  console.log('Access Token sent from thirdparty API:', accessToken);
  try {
    const response = await fetch("https://api.twitch.tv/helix/users", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Client-Id": process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID!,
      },
    });

    if (!response.ok) {
      throw new Error(`Twitch API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    console.log("Current user data from Twitch:", data);
    return data;
  } catch (error) {
    console.error("Error fetching Twitch user data:", error);
    return { error: "Failed to fetch Twitch user data" };
  }

}


export async function getTwitchFollowers() {
  const BROADCASTER_ID = process.env.TWITCH_BROADCASTER_ID!
  const ACCESS_TOKEN = process.env.TWITCH_ACCESS_TOKEN;

  //console.log(ACCESS_TOKEN);

  const response = await fetch(`https://api.twitch.tv/helix/channels/followers?broadcaster_id=${BROADCASTER_ID}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'Client-Id': process.env.TWITCH_CLIENT_ID || '',
    }
  });

  const data: TwitchChannelFollowers = await response.json();
  console.log('Followers from broadcaster:', data);
  const followerNames = data.data.map((follower: { user_name: string }) => follower.user_name);
  console.log("follower names", followerNames); // ["Usuario1", "Usuario2", "Usuario3"]
  return followerNames; // Devuelve la lista de seguidores
}

// ! verify two scenarios: 
// ! 1 - access token from broadcaster is staled, probably we need to refresh it comparing deadline with current time (saved in db)
// ! 2 - cursor is needed to fetch more followers since we can only compare a little amount of followers at a time 


export async function isTwitchFollower(user_id: string) {
  const BROADCASTER_ID = process.env.TWITCH_BROADCASTER_ID!
  const ACCESS_TOKEN = process.env.TWITCH_ACCESS_TOKEN;
  const response = await fetch(`https://api.twitch.tv/helix/channels/followers?broadcaster_id=${BROADCASTER_ID}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'Client-Id': process.env.TWITCH_CLIENT_ID || '',
    }
  });
  let isFollower: boolean = false
  const data: TwitchChannelFollowers = await response.json();

  const followersId = data.data.map((follower: { user_id: string }) => follower.user_id);

  console.log('This is the current userId', user_id);
  console.log('Followers ID:', followersId);

  followersId.forEach((followerId: string) => {
    if (followerId === user_id) {
      isFollower = true
    }
  })
  return isFollower; 
}



  // https://api.twitch.tv/helix/streams?first=10
  // https://api.twitch.tv/helix/eventsub/subscriptions
  // https://api.twitch.tv/helix/videos?user_id=135655222

  // https://api.twitch.tv/helix/channels/followers?broadcaster_id=135655222 -> returns total followers (int), data (array of followers)
  // https://api.twitch.tv/helix/channels/followers?broadcaster_id=135655222&user_id=[int: userId] -> returns if user is following the channel. If user is not following, returns an empty array

  // const url = cursor 
  // https://api.twitch.tv/helix/channels/followers?broadcaster_id=${broadcaster_id}&after=${cursor}


