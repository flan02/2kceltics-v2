/// <reference types="node" />
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const NBA_HEADERS = {
  Host: "stats.nba.com",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  Accept: "application/json, text/plain, */*",
  "Accept-Language": "en-US,en;q=0.9",
  Referer: "https://www.nba.com/",
  Origin: "https://www.nba.com",
};

interface RawGameLog {
  game_id: string;
  game_date: string;
  matchup: string;
  wl: string | null;
}

async function getCelticsGames(
  season: string = process.env.SCRIPTS_CURRENT_SEASON!,
  seasonType: string = process.env.SCRIPTS_SEASON_TYPE!,
  teamId: string = process.env.SCRIPTS_CELTICS_ID!,
): Promise<RawGameLog[]> {
  const params = new URLSearchParams({
    TeamID: teamId,
    Season: season,
    SeasonType: seasonType,
  });

  const url = `https://stats.nba.com/stats/teamgamelog?${params.toString()}`;
  const res = await fetch(url, { headers: NBA_HEADERS });

  if (!res.ok) {
    throw new Error(`Error en TeamGameLog: ${res.status} ${res.statusText}`);
  }

  const data: any = await res.json();
  const dataset = data.resultSets?.find((rs: any) => rs.name === "TeamGameLog");

  if (!dataset) {
    throw new Error("No se encontró el conjunto de datos TeamGameLog.");
  }

  const headers: string[] = dataset.headers;
  const rows: any[][] = dataset.rowSet;

  const getCol = (row: any[], col: string) => row[headers.indexOf(col)];

  return rows.map((row) => ({
    game_id: String(getCol(row, "Game_ID")),
    game_date: String(getCol(row, "GAME_DATE")),
    matchup: String(getCol(row, "MATCHUP")),
    wl: getCol(row, "WL") ? String(getCol(row, "WL")) : null,
  }));
}

function parseMatchup(matchup: string) {
  // Ejemplos: "BOS vs. NYK" o "BOS @ MIA"
  const isHome = matchup.includes("vs.");
  const separator = isHome ? "vs." : "@";
  const parts = matchup.split(separator).map((s) => s.trim());

  const team1 = parts[0] || "BOS";
  const team2 = parts[1] || "OPP";

  return {
    homeTeam: isHome ? team1 : team2,
    awayTeam: isHome ? team2 : team1,
  };
}

async function uploadSchedule() {
  const season = process.env.SCRIPTS_CURRENT_SEASON!; // Podés cambiar o parametrizar la temporada
  console.log(`📡 Consultando calendario de los Celtics (${season})...`);

  const games = await getCelticsGames(season, "Regular Season");
  console.log(`🏀 Se encontraron ${games.length} partidos. Guardando en DB...`);

  let count = 0;

  for (const game of games) {
    const { homeTeam, awayTeam } = parseMatchup(game.matchup);
    const parsedDate = new Date(game.game_date);
    const status = game.wl ? `Final (${game.wl})` : "Scheduled";

    await prisma.scheduleNBAList.upsert({
      where: {
        gameId: game.game_id,
      },
      update: {
        gameDate: parsedDate,
        homeTeam,
        awayTeam,
        matchup: game.matchup,
        status,
      },
      create: {
        gameId: game.game_id,
        gameDate: parsedDate,
        homeTeam,
        awayTeam,
        matchup: game.matchup,
        status,
      },
    });

    count++;
  }

  console.log(
    `✅ ¡Listo! Se insertaron / actualizaron ${count} partidos en ScheduleList.`,
  );
}

uploadSchedule()
  .catch((err) => {
    console.error("❌ Error subiendo el calendario:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
