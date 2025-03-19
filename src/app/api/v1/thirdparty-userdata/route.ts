import { getThirdPartyData } from "@/services/server-functions";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
  const body = await req.json(); // 📌 Extrae el body del request
  const { provider } = body;
  const accessToken = req.headers.get("Authorization")?.replace("Bearer ", "");

  if (!accessToken || !provider) {
    return NextResponse.json({ error: "Missing access token or provider" }, { status: 400 });
  }

  try {
    let userInfo;
    switch (provider) {
      case "twitch":
        userInfo = await getThirdPartyData(accessToken);
        break;
      case "youtube":
        userInfo = await getThirdPartyData(accessToken);
        break;
      case "twitter":
        userInfo = await getThirdPartyData(accessToken);
        break;
      default:
        return NextResponse.json({ error: "Invalid provider" }, { status: 400 });
    }

    return NextResponse.json({ provider, user: userInfo });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 });
  }
}
