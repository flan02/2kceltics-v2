'use server'
import { db } from "@/db";
import { filterGamesSchema } from "@/zod/validation";
import { z } from "zod";


export async function getStreamedGames(values: z.infer<typeof filterGamesSchema>) {
  //console.log(values)
  try {
    const response = await db.schedule.findMany({
      where: {
        season: values.season,
        type: values.type,
        stage: values.stage,
        atHome: values.atHome,
        result: values.result
      },
      select: {
        id: true,
        season: true,
        currentGame: true,
        video_url: true,
        atHome: true,
        team2: true,
        team_code2: true,
        result: true
      }
    })

    return response
  } catch (error) {
    console.error(error)

  }
}