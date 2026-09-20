import { db } from "@/db";

export async function getAvailableGames() {
  return db.scheduleNBAList.findMany({
    // Si querés listar solo los que ya se jugaron o tienen tiros:
    where: {
      status: { startsWith: "Final" }, // o status: "Final"
    },
    orderBy: {
      gameDate: "desc",
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
      shotDistance: true,
      minutesRemaining: true,
      secondsRemaining: true,
      //playerId: true,
    },
  });
}

export async function saveTeamStatsToDB(statsData: any) {
  console.log(
    `💾 Guardando estadísticas de la temporada ${statsData.season} en la base de datos...`,
  );

  const { season, ...updateFields } = statsData;

  const result = await db.teamSeasonTotals.upsert({
    where: { season },
    update: updateFields,
    create: statsData,
  });

  console.log("✅ Registro actualizado con éxito:", {
    id: result.id,
    season: result.season,
    record: `${result.wins}-${result.losses}`,
    fg: `${result.fgm}/${result.fga} (${result.fgPct}%)`,
    updatedAt: result.updatedAt,
  });

  return result;
}
