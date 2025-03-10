import { db } from "@/db"

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