"use server"

import { signOut } from "@/auth"



export async function handleGoogleSignOut() {
  "use server"
  await signOut()
}