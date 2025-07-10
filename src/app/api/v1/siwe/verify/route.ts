import { NextRequest, NextResponse } from 'next/server'
import { SiweMessage } from 'siwe'
import { cookies } from 'next/headers'


export async function POST(req: NextRequest) {
  const { message, signature } = await req.json()

  // ? Cookies are used to store and validate the nonce between the two backend routes, which is a very good practice to prevent replay attacks
  const nonceCookie = cookies().get('siwe-nonce')?.value

  if (!nonceCookie) {
    return NextResponse.json({ error: 'Nonce not found' }, { status: 400 })
  }
  try {
    const siweMessage = new SiweMessage(message)

    const result = await siweMessage.verify({ signature, nonce: nonceCookie })

    //console.log('Verification result:', result);

    // TODO: Here call mongodb to store the user's wallet data

    if (!result.success) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    cookies().set('siwe-session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // true,
      path: '/',
      sameSite: 'lax',
      maxAge: 3600 // 60 * 60 * 24 * 7 -> 1 week
    })

    cookies().delete('siwe-nonce');

    return NextResponse.json({ success: true, data: siweMessage }, { status: 200 })
  } catch (err) {
    console.error('SIWE verify error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
