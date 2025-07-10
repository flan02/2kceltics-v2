// app/api/siwe/message/route.ts
import { NextResponse } from 'next/server'
import { SiweMessage } from 'siwe'
import { randomBytes } from 'crypto'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  try {
    const { address, chainId } = await req.json()

    const nonce = randomBytes(16).toString('hex')

    //console.log('Random nonce generated:', nonce);

    const message = new SiweMessage({
      domain: 'localhost:3000',
      address: address,
      statement: 'Sign in to 2KCeltics Dapp',
      uri: 'http://localhost:3000',
      version: '1',
      chainId,
      nonce
    })

    //console.log('Generated message:', message);

    const signingMessage = message.prepareMessage()

    //console.log('Signed message:', signingMessage);

    // * secure: false, // true if using HTTPS
    cookies().set('siwe-nonce', nonce, {
      httpOnly: true,
      secure: false,
      path: '/',
      sameSite: 'lax',
      maxAge: 300 // 5 minutos
    })

    return NextResponse.json({ message: signingMessage }, { status: 200 })
  } catch (error) {
    console.error('Error en SIWE endpoint:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
