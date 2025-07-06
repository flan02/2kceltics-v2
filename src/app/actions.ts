import { db } from "@/db"
import { $Enums } from "@prisma/client"
import { NextResponse } from "next/server"

const CURRENT_SEASON = process.env.CURRENT_SEASON as $Enums.Season

export async function getScheduleGames() {
  const response = await db.schedule.findMany({
    where: {
      season: CURRENT_SEASON
    }
  })
  return response
}


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
      team2: true,
      playoffGame: true
    }
  })
  return response
}


export async function getCurrentRoster() {
  const season = process.env.CURRENT_SEASON as $Enums.Season
  try {
    const response = await db.season2k.findFirst({
      where: {
        season
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


export async function getCurrentSpan() {
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

  const span: number = response.length
  return span

}


// export async function getPlayersTable() {
//   const table = await db.season2k.findMany({
//     where: {
//       teamId: '66b4de0f0fa088d80a9b93d1',
//     },
//     select: {
//       players: true,
//     },
//   });
//   return table.map((player) => player.players)
// }