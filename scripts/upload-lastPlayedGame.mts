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

async function uploadLastGame() {
  const season = process.env.SCRIPTS_CURRENT_SEASON!;
  console.log(`📡 Consultando el último partido de los Celtics (${season})...`);

  // Nos traemos la lista, pero solo nos va a importar el primero
  const games = await getCelticsGames(season, "Regular Season");

  if (games.length === 0) {
    console.log("❌ No se encontraron partidos jugados todavía.");
    return;
  }

  // 👉 MAGIA ACÁ: Aislamos exclusivamente el último partido jugado (índice 0)
  const lastGame = games[0];

  const { homeTeam, awayTeam } = parseMatchup(lastGame.matchup);
  const parsedDate = new Date(lastGame.game_date);
  const status = lastGame.wl ? `Final (${lastGame.wl})` : "Scheduled";

  const homeScore =
    lastGame.celtics_pts !== null && lastGame.opp_pts !== null
      ? homeTeam === "BOS"
        ? lastGame.celtics_pts
        : lastGame.opp_pts
      : null;

  const awayScore =
    lastGame.celtics_pts !== null && lastGame.opp_pts !== null
      ? homeTeam === "BOS"
        ? lastGame.opp_pts
        : lastGame.celtics_pts
      : null;

  console.log("\n🔥 ACTUALIZANDO ÚLTIMO PARTIDO:");
  console.table([
    {
      Fecha: lastGame.game_date,
      Local: homeTeam,
      "PTS Local": homeScore,
      Visitante: awayTeam,
      "PTS Visita": awayScore,
      Resultado:
        lastGame.wl === "W"
          ? "Victoria ✅"
          : lastGame.wl === "L"
            ? "Derrota ❌"
            : "Pendiente",
      GameID: lastGame.game_id,
    },
  ]);

  //  Hacemos el upsert SOLO de este partido
  try {
    await prisma.scheduleNBAList.upsert({
      where: {
        gameId: lastGame.game_id,
      },
      update: {
        gameDate: parsedDate,
        season,
        seasonType: "REGULAR_SEASON",
        homeTeam,
        awayTeam,
        matchup: lastGame.matchup,
        status,
        homeScore,
        awayScore,
      },
      create: {
        gameId: lastGame.game_id,
        gameDate: parsedDate,
        season,
        seasonType: "REGULAR_SEASON",
        homeTeam,
        awayTeam,
        matchup: lastGame.matchup,
        status,
        homeScore,
        awayScore,
      },
    });
  } catch (error) {
    console.error("❌ Error al hacer upsert del último partido:", error);
    throw error; // Re-lanzamos el error para que el bloque catch externo lo capture
  } finally {
    await prisma.$disconnect();

    console.log(
      `✅ ¡Listo! GameID ${lastGame.game_id} guardado en la base de datos.`,
    );
  }
}

// Ejecutamos la nueva función
uploadLastGame()
  .catch((err) => {
    console.error("❌ Error subiendo el último partido:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
