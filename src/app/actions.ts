import { db } from "@/db"


export async function getScheduleGames() {
  const response = await db.schedule.findMany({
    where: {
      season: "NBA2K24"  // * We should automate this for the current season
    }
  })
  return response
}


export async function getNextGame() {
  const response = await db.schedule.findMany({
    where: {
      season: "NBA2K24",
      scoreTeam1: { gt: 0 }
    },
    select: {
      scoreTeam1: true,
    }
  })

  const nextGame: number = response.length + 1
  return nextGame
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