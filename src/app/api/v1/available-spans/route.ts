import { db } from "@/db";
import { SeasonSpans } from "@/lib/types";
import { Season } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const season = searchParams.get('season') as Season
  if (!season) {
    return NextResponse.json({ error: 'Missing season' }, { status: 400 });
  };

  try {
    const data = await db.seasonPlayerSpan.findMany({
      where: { season },
      select: {
        gamespan: true
      }
    })

    const uniqueSpans: typeof SeasonSpans = Array.from(new Set(data.map((item) => item.gamespan))).sort((a, b) => a - b);


    return NextResponse.json({ spans: uniqueSpans }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching data from database' }, { status: 500 });

  }

}