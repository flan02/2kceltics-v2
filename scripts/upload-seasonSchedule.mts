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
  celtics_pts: number | null;
  opp_pts: number | null;
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

  const url = `https://stats.nba.com/stats/teamgamelogs?${params.toString()}`;
  const res = await fetch(url, { headers: NBA_HEADERS });

  if (!res.ok) {
    throw new Error(`Error en TeamGameLog: ${res.status} ${res.statusText}`);
  }

  const data: any = await res.json();
  const dataset = data.resultSets?.find(
    (rs: any) => rs.name === "TeamGameLogs",
  );

  if (!dataset) {
    throw new Error("No se encontró el conjunto de datos TeamGameLog.");
  }

  const headers: string[] = dataset.headers;
  const rows: any[][] = dataset.rowSet;

  // 👉 AGREGÁ ESTA LÍNEA PARA VER TODAS LAS COLUMNAS QUE MANDA LA NBA:
  console.log("Columnas que envía la NBA:", headers);

  const getCol = (row: any[], colName: string) => {
    const idx = headers.findIndex(
      (h) => h.toLowerCase() === colName.toLowerCase(),
    );
    return idx !== -1 ? row[idx] : null;
  };

  return rows.map((row) => {
    const rawPts = getCol(row, "PTS");
    const rawPlusMinus = getCol(row, "PLUS_MINUS") ?? getCol(row, "PLUSMINUS");

    const pts =
      rawPts !== null && rawPts !== undefined && rawPts !== ""
        ? Number(rawPts)
        : null;

    const plusMinus =
      rawPlusMinus !== null && rawPlusMinus !== undefined && rawPlusMinus !== ""
        ? Number(rawPlusMinus)
        : null;

    // Con PTS y PLUS_MINUS calculamos directamente los puntos del rival
    const opp_pts = pts !== null && plusMinus !== null ? pts - plusMinus : null;

    return {
      game_id: String(getCol(row, "Game_ID")),
      game_date: String(getCol(row, "GAME_DATE")),
      matchup: String(getCol(row, "MATCHUP")),
      wl: getCol(row, "WL") ? String(getCol(row, "WL")) : null,
      celtics_pts: pts,
      opp_pts,
    };
  });
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

  // 👉 LOG DE MUESTRA PARA CONFIRMAR ANTES DE LA DB
  if (games.length > 0) {
    console.log("🔍 Ejemplo del primer partido obtenido:", {
      matchup: games[0].matchup,
      wl: games[0].wl,
      celtics_pts: games[0].celtics_pts,
      opp_pts: games[0].opp_pts,
    });
  }

  let count = 0;

  for (const game of games) {
    const { homeTeam, awayTeam } = parseMatchup(game.matchup);
    const parsedDate = new Date(game.game_date);
    const status = game.wl ? `Final (${game.wl})` : "Scheduled";

    const homeScore =
      game.celtics_pts !== null && game.opp_pts !== null
        ? homeTeam === "BOS"
          ? game.celtics_pts
          : game.opp_pts
        : null;

    const awayScore =
      game.celtics_pts !== null && game.opp_pts !== null
        ? homeTeam === "BOS"
          ? game.opp_pts
          : game.celtics_pts
        : null;

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
        homeScore,
        awayScore,
      },
      create: {
        gameId: game.game_id,
        gameDate: parsedDate,
        homeTeam,
        awayTeam,
        matchup: game.matchup,
        status,
        homeScore,
        awayScore,
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
