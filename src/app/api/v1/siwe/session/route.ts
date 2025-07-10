// app/api/siwe/session/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const session = cookies().get('siwe-session')
  //console.log('Session cookie:', session)
  const authenticated = session?.value === 'true'

  return NextResponse.json({ authenticated })
}
