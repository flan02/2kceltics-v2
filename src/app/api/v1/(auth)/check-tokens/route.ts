import { db } from "@/db";
import { TokenBody } from "@/lib/types";
import ky from "ky";
import { NextResponse } from "next/server";



export async function POST(req: Request) {
  const { email } = await req.json();

  try {
    // Search for the user in the db and return the twitch token (if it exists)
    const user = await db.tokens.findUnique({
      where: {
        email
      },
      select: {
        twitch: true,
      },
    });

    if (!user?.twitch) {
      return NextResponse.json({ error: "Token not found" }, { status: 404 });
    }

    const { access_token, refresh_token, expires_in, generatedAt } = user.twitch as TokenBody

    const tokenExpiration = generatedAt + expires_in * 1000;
    const currentTime = Date.now();

    if (currentTime < tokenExpiration) {
      // ? If the token is still valid, return it
      return NextResponse.json({
        twitch: user?.twitch || null,
      });
    }

    // ? If the token is expired, refresh it using the refresh_token
    const clientId = process.env.TWITCH_CLIENT_ID!;
    const clientSecret = process.env.TWITCH_CLIENT_SECRET!;
    const redirectUri = "http://localhost:3000/api/v1/callback/twitch";

    const response = await ky.post("https://id.twitch.tv/oauth2/token", {
      searchParams: {
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token,
        grant_type: "refresh_token",
        redirect_uri: redirectUri,
      },
    });

    const data: any = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: "Error refreshing token", details: data }, { status: 500 });
    }

    const newAccessToken = data.access_token;
    const newExpiresIn = data.expires_in;

    // ? Update token in the db with the new access_token and expires_in
    await db.tokens.update({
      where: { email },
      data: {
        twitch: {
          access_token: newAccessToken,
          refresh_token, // The refresh_token remains the same maybe
          expires_in: newExpiresIn,
          generatedAt: Date.now(), // Update the generatedAt timestamp
        },
      },
    });




    return NextResponse.json({
      twitch: { access_token: newAccessToken, refresh_token, expires_in: newExpiresIn, generatedAt: Date.now() },
    });

  } catch (error) {
    return NextResponse.json({ error: "Error fetching tokens" }, { status: 500 });
  }
}
