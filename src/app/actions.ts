"use server"

import { db } from "@/db"
import { LimitPoints, TierNames } from "@/lib/types"
import { $Enums } from "@prisma/client"
import { revalidatePath } from "next/cache"


export async function getScheduleGames() {
  const current_season = process.env.CURRENT_SEASON as $Enums.Season
  const response = await db.schedule.findMany({
    where: {
      season: current_season
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

export async function getTopTierUsers() {
  const top5 = await db.user.findMany({
    take: 5,
    orderBy: {
      totalPoints: 'desc'
    },
    select: {
      name: true,
      nickname: true,
      totalPoints: true,
      image: true
    }
  })

  const countUsers = await db.user.count()
  return { top5, countUsers }
}


export async function getPointsAndTier(id: string) {

  const response = await db.user.findMany({
    where: {
      email: id
    },
    select: {
      id: true,
      totalPoints: true,
      tier: true,
      limitPoints: true
    }
  })
  revalidatePath('/')
  return response

}


export async function upgradeTier(id: string, points: number, limitPoints: number, currentTier: TierNames) {
  const tiers = Object.keys(LimitPoints) as TierNames[]
  let nextTier: $Enums.Tier = currentTier as $Enums.Tier

  const currentIndex = tiers.indexOf(currentTier)
  try {
    if (points == limitPoints) {
      nextTier = tiers[currentIndex + 1] as $Enums.Tier
      const nextLimit = tiers[currentIndex + 1] ? LimitPoints[tiers[currentIndex + 2]] : LimitPoints[currentTier]

      const response = await db.user.update({
        where: {
          email: id
        },
        data: {
          tier: nextTier,
          limitPoints: nextLimit
        }
      })
    }
    revalidatePath('/')
    return { message: 'Tier upgraded', status: 200 }
  } catch (error) {
    console.error(error)

  }
}


export async function addPoints(userId: string) {
  const response = await db.user.update({
    where: {
      email: userId
    },
    data: {
      totalPoints: {
        increment: 1
      }
    },
    select: {
      totalPoints: true
    }
  })
  return response
}

