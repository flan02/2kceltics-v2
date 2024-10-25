import { db } from "@/db"
import { cache } from "react"

export const getSeeds = cache(async (playoffsId: string) => {
  try {
    const seeds = await db.seed.findMany({
      where: {
        playoffsId
      },
      select: {
        id: true,
        team_code: true,
        position: true,
        conference: true,
        round: true,
        wins: true,
        losses: true,
        eliminated: true
      }
    })

    return seeds
  } catch (error) {
    console.error(error)
    return { error: 'An error occurred while fetching the seeds' }
  }

})


export const getPlayoffsGames = cache(async (playoffsId: string) => {
  try {
    const response = await db.playoffs.findUnique({
      where: {
        id: playoffsId
      },
      select: {
        gamesPlayed: true
      }
    })
    //console.log(response);
    return response
  } catch (error) {
    console.error(error)
    return null
  }
})


