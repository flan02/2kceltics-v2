import { db } from "@/db"

export async function getScheduleGames() {
  const response = await db.schedule.findMany({
    where: {
      season: "NBA2K24"  // * We should automate this for the current season
    }
  })
  return response
} 