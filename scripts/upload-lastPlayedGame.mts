/// <reference types="node" />
import { PrismaClient, SeasonType } from "@prisma/client";

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
  isWin: boolean | null;
  min: number;
  pts: number;
  fgPct: number;
  fgm: number;
  fga: number;
  tpPct: number;
  tpm: number;
  tpa: number;
  ftPct: number;
  ftm: number;
  fta: number;
  oreb: number;
  dreb: number;
  reb: number;
  ast: number;
  stl: number;
  blk: number;
  tov: number;
  pf: number;
  plusMinus: number;
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
  // console.log("Columnas que envía la NBA:", headers);

  const getCol = (row: any[], colName: string) => {
    const idx = headers.findIndex(
      (h) => h.toLowerCase() === colName.toLowerCase(),
    );
    return idx !== -1 ? row[idx] : null;
  };

  return rows.map((row) => {
    const rawPts = getCol(row, "PTS");
    const rawPlusMinus = getCol(row, "PLUS_MINUS") ?? getCol(row, "PLUSMINUS");

    const pts = rawPts !== null && rawPts !== "" ? Number(rawPts) : 0;
    const plusMinus =
      rawPlusMinus !== null && rawPlusMinus !== "" ? Number(rawPlusMinus) : 0;
    const opp_pts = pts !== null && plusMinus !== null ? pts - plusMinus : null;
    const wl = getCol(row, "WL") ? String(getCol(row, "WL")) : null;

    // Cálculo de overtimes (minutos regulares = 240, cada suplementario = 25 min extra)
    const minRaw = getCol(row, "MIN");
    const min = minRaw !== null && minRaw !== "" ? Number(minRaw) : 0;

    return {
      game_id: String(getCol(row, "Game_ID")),
      game_date: String(getCol(row, "GAME_DATE")),
      matchup: String(getCol(row, "MATCHUP")),
      wl,
      celtics_pts: pts,
      opp_pts,
      isWin: wl === "W" ? true : false,
      min,
      pts,
      fgPct: Number(getCol(row, "FG_PCT")) || 0,
      fgm: Number(getCol(row, "FGM")) || 0,
      fga: Number(getCol(row, "FGA")) || 0,
      tpPct: Number(getCol(row, "FG3_PCT")) || 0,
      tpm: Number(getCol(row, "FG3M")) || 0,
      tpa: Number(getCol(row, "FG3A")) || 0,
      ftPct: Number(getCol(row, "FT_PCT")) || 0,
      ftm: Number(getCol(row, "FTM")) || 0,
      fta: Number(getCol(row, "FTA")) || 0,
      oreb: Number(getCol(row, "OREB")) || 0,
      dreb: Number(getCol(row, "DREB")) || 0,
      reb: Number(getCol(row, "REB")) || 0,
      ast: Number(getCol(row, "AST")) || 0,
      stl: Number(getCol(row, "STL")) || 0,
      blk: Number(getCol(row, "BLK")) || 0,
      tov: Number(getCol(row, "TOV")) || 0,
      pf: Number(getCol(row, "PF")) || 0,
      plusMinus,
    };
  });
}

function parseMatchup(matchup: string) {
  // Ejemplos: "BOS vs. NYK" o "BOS @ MIA"
  const isHome = matchup.includes("vs.");
  const separator = isHome ? "vs." : "@";
  const parts = matchup.split(separator).map((s) => s.trim());

  // const team1 = parts[0] || "BOS";
  // const team2 = parts[1] || "OPP";

  return {
    homeTeam: isHome ? parts[0] || "BOS" : parts[1] || "OPP",
    awayTeam: isHome ? parts[1] || "OPP" : parts[0] || "BOS",
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

  // Creamos un objeto con todos los datos para pasarlo limpio a update/create
  const gameData = {
    gameDate: parsedDate,
    season,
    seasonType: SeasonType.REGULAR_SEASON,
    homeTeam,
    awayTeam,
    matchup: lastGame.matchup,
    status,
    homeScore,
    awayScore,
    isWin: lastGame.isWin,
    min: lastGame.min,
    pts: lastGame.pts,
    fgPct: lastGame.fgPct,
    fgm: lastGame.fgm,
    fga: lastGame.fga,
    tpPct: lastGame.tpPct,
    tpm: lastGame.tpm,
    tpa: lastGame.tpa,
    ftPct: lastGame.ftPct,
    ftm: lastGame.ftm,
    fta: lastGame.fta,
    oreb: lastGame.oreb,
    dreb: lastGame.dreb,
    reb: lastGame.reb,
    ast: lastGame.ast,
    stl: lastGame.stl,
    blk: lastGame.blk,
    tov: lastGame.tov,
    pf: lastGame.pf,
    plusMinus: lastGame.plusMinus,
  };

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
      where: { gameId: lastGame.game_id },
      update: gameData,
      create: {
        gameId: lastGame.game_id,
        ...gameData,
      },
    });
  } catch (error) {
    console.error("❌ Error al hacer upsert del último partido:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
    console.log(
      `✅ ¡Listo! GameID ${lastGame.game_id} guardado en la base de datos con estadísticas completas.`,
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
