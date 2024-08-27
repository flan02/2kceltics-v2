import { db } from "@/db"
import { $Enums } from "@prisma/client"


export async function getScheduleGames() {
  const response = await db.schedule.findMany({
    where: {
      season: "NBA2K24"  // * We should automate this for the current season
    }
  })
  return response
}

const CURRENT_SEASON = process.env.CURRENT_SEASON as $Enums.Season

export async function getNextGame() {
  const response = await db.schedule.findMany({
    where: {
      season: CURRENT_SEASON,
      scoreTeam1: { gt: 0 }
    },
    select: {
      scoreTeam1: true,
      team_code2: true,
    }
  })

  const nextGame: number = response.length + 1
  return nextGame
}

export async function getNextTeam(currentGame: string) {
  const response = await db.schedule.findFirst({
    where: {
      season: CURRENT_SEASON,
      currentGame: parseInt(currentGame)
    },
    select: {
      team2: true
    }
  })
  return response?.team2
}


export async function getCurrentRoster() {
  try {
    const response = await db.season2k.findFirst({
      where: {
        season: "NBA2K24"
      },
      select: {
        players: true
      }
    })
    return response
  } catch (error) {
    console.error(error)
  }
}