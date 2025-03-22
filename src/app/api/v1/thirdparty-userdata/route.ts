import { getThirdPartyData, getTwitchBroadcasterData, getTwitchFollowers, isTwitchFollower } from "@/services/server-functions";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
  const body = await req.json(); // 📌 Extrae el body del request

  console.log('Request body:', body);

  const { provider, user_id } = body;
  //const user_id = req.headers.get("Authorization")?.replace("Bearer ", "");

  console.log('Access Token from twitch API:', user_id)

  if (!user_id || !provider) {
    return NextResponse.json({ error: "Missing access token or provider" }, { status: 400 });
  }

  try {
    let broadcasterInfo, followers, isFollower;
    switch (provider) {
      case "twitch":
        {

          broadcasterInfo = await getTwitchBroadcasterData();
          console.log('broadcaster info:', broadcasterInfo);

          //const channelId = broadcasterInfo.data[0].id;

          //console.log('Channel ID:', channelId);
          followers = await getTwitchFollowers()

          isFollower = await isTwitchFollower(user_id) as boolean;
        }
        break;
      case "youtube":
        //broadcasterInfo = await getThirdPartyData(accessToken);
        break;
      case "twitter":
        //broadcasterInfo = await getThirdPartyData(accessToken);
        break;
      default:
        return NextResponse.json({ error: "Invalid provider" }, { status: 400 });
    }

    return NextResponse.json({ provider, broadcaster: broadcasterInfo, followers, isFollower });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 });
  }
}


