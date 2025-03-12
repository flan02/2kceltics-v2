import NotFound from "@/app/not-found"
import { db } from "@/db"
import { cache } from "react"

export async function getUserRanking(userId: string) {
  const users = await db.user.findMany({
    take: 5,
    orderBy: {
      totalPoints: 'desc'
    },
    select: {
      id: true,
      totalPoints: true
    }
  })

  const totalUsers = await db.user.count()

  const rank = users.findIndex(user => user.id === userId) + 1

  return { rank, totalUsers }
}

export const getUser = cache(async (userId: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id: userId
      },
      select: {
        email: true,
        name: true,
        nickname: true,
        image: true,
        totalPoints: true,
        tier: true,
        newsletter: true,
        sharedSocialMedia: true,
        createdAt: true
      }
    })

    if (!user) return NotFound()

    return user
  } catch (error) {
    console.error(error);
  }
})

export const countUsers = cache(async () => {
  const count = await db.user.count()
  return count
})





