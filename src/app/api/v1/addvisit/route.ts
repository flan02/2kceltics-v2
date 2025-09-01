import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db"

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { count } = await req.json()
    // console.log('new count', count);
    const TEAM_CELTICS_ID = process.env.TEAM_CELTICS_ID!
    await db.visitCounter.update({
      where: {
        id: TEAM_CELTICS_ID
      },
      data: {
        count
      }
    })
    return NextResponse.json({ status: 200 })
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500 })
  }

}

export async function GET(req: NextRequest, res: NextResponse) {
  const TEAM_CELTICS_ID = process.env.TEAM_CELTICS_ID!
  try {
    const visitsCounter = await db.visitCounter.findFirst({
      where: {
        id: TEAM_CELTICS_ID
      },
      select: {
        count: true
      }
    })
    return NextResponse.json({ count: visitsCounter!.count })

  } catch (error) {
    console.log(error);
    return NextResponse.json({ count: 0 })
  }


}