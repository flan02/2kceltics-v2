"use server"

import { signOut } from "@/auth"
import { db } from "@/db";
import { Platform } from "@/lib/types";



export async function handleGoogleSignOut() {
  "use server"
  await signOut()
}

export async function updateToken(userId: string, platform: Platform, newAccessToken: string, newRefreshToken: string, expiresAt: number) {
  await db.tokens.update({
    where: { userId },
    data: {
      [platform]: {
        set: {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
          expiresAt: new Date(expiresAt * 1000) // Convertir timestamp UNIX a Date
        }
      },
      updatedAt: new Date()
    }
  })
}