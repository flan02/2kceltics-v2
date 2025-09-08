import { db } from "@/db";
import { PlayoffSpans, roundPlayoffs, SeasonSpans } from "@/lib/types";
import { Season, Tournament } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const season = searchParams.get('season') as Season
  const stage = searchParams.get('stage') as Tournament
  if (!season || !stage) {
    return NextResponse.json({ error: 'Missing season' }, { status: 400 });
  };

  console.log(`Fetching available spans for season: ${season}, stage: ${stage}`);

  try {
    const data = await db.seasonPlayerSpan.findMany({
      where: { season, stage },
      select: {
        gamespan: true,
      }
    })





    if (stage != 'PO') {
      let uniqueSpans: typeof SeasonSpans = Array.from(new Set(data.map((item) => item.gamespan))).sort((a, b) => a - b);
      return NextResponse.json({ spans: uniqueSpans }, { status: 200 });

    } else {
      let uniqueSpans: typeof PlayoffSpans = Array.from(new Set(data.map((item) => item.gamespan))).sort((a, b) => a - b);

      return NextResponse.json({ spans: uniqueSpans }, { status: 200 });
    }




    //return NextResponse.json({ spans: uniqueSpans }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching data from database' }, { status: 500 });

  }

}