import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db"

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { count } = await req.json()
    // console.log('new count', count);
    await db.visitCounter.update({
      where: {
        id: '66b3b02747a37ebedad1f3ba'
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
  try {
    const visitsCounter = await db.visitCounter.findFirst({
      where: {
        id: '66b3b02747a37ebedad1f3ba'
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