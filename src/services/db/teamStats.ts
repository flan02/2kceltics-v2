import { db } from "@/db"; // o tu instancia de Prisma

export async function getTeamSeasonTotals(season = "2025-26") {
  return await db.teamSeasonTotals.findUnique({
    where: { season },
  });
}
