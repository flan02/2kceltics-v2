import { db } from '@/db';
import { normalizeSeasonPlayerInput } from '@/lib/utils';
import { Season, SeasonPlayerSpan, Tournament } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';


export async function GET(req: NextRequest) {

  const searchParams = req.nextUrl.searchParams;
  const stage = searchParams.get('stage') as Tournament;
  const season = searchParams.get('season') as Season;
  const gamespan = searchParams.get('gamespan');

  //console.log("playoffs gamespan", gamespan);

  if (!gamespan || !season || !stage) {
    return NextResponse.json({ error: 'Missing player or season' }, { status: 400 });
  }

  try {
    const data = await db.seasonPlayerSpan.findMany({
      where: {
        season,
        stage,
        gamespan: parseInt(gamespan)
      },
      orderBy: { gamespan: 'asc' }
    });


    return NextResponse.json({ response: data }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Error fetching data from database' },
      { status: 500 }
    );
  }
}



export async function POST(request: Request) {
  try {
    const rawBody = await request.json();

    const normalizedBody = await Promise.all(rawBody.map(normalizeSeasonPlayerInput));
    //console.log("normalized body", normalizedBody);
    try {

      await db.seasonPlayerSpan.createMany({
        data: normalizedBody as SeasonPlayerSpan[],
      });

      return NextResponse.json(
        { message: "Data added successfully" }, { status: 200 })
    } catch (error) {
      console.error("Error saving data to database:", error);
      return NextResponse.json(
        { error: "Error saving data to database" },
        { status: 500 }
      );
    }

  } catch (error) {
    console.log("Error parsing request body:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}




