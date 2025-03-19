"use server"

import { signOut } from "@/auth"
import { db } from "@/db";
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


export async function getThirdPartyData(accessToken: string) {
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
    return data;
  } catch (error) {
    console.error("Error fetching Twitch user data:", error);
    return { error: "Failed to fetch Twitch user data" };
  }

}