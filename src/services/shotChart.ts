import { db } from "@/db";

export async function getAvailableGames() {
  return db.scheduleNBAList.findMany({
    // Si querés listar solo los que ya se jugaron o tienen tiros:
    where: {
      status: { startsWith: "Final" }, // o status: "Final"
    },
    orderBy: {
      gameDate: "asc",
    },
    select: {
      id: true,
      gameId: true,
      matchup: true,
      gameDate: true,
    },
  });
}

export async function getShotsByGameId(gameId: string) {
  return db.shot.findMany({
    where: { gameId },
    select: {
      id: true,
      locX: true,
      locY: true,
      eventType: true,
      playerName: true,
      actionType: true,
      shotType: true,
      period: true,
    },
  });
}
