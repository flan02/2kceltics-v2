import { db } from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const recipientWallet = await db.walletConfig.findUnique({
      where: {
        id: process.env.WALLET_ID!
      },
      select: {
        active: true,
        wallet_address: true,
        wallet_provider: true,
      }
    });

    if (!recipientWallet || !recipientWallet.wallet_address || !recipientWallet.active) {
      return new Response(JSON.stringify({ wallet_address: "Wallet not found" }), { status: 404 });
    }

    return NextResponse.json({
      wallet_address: recipientWallet.wallet_address
    }, { status: 200 });
  } catch (error) {
    console.error("Error in recipient wallet route:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}