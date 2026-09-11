/// <reference types="node" />
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const NBA_HEADERS = {
  Host: "stats.nba.com",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  Accept: "application/json, text/plain, */*",
  "Accept-Language": "en-US,en;q=0.9",
  Referer: "https://www.nba.com/",
  Origin: "https://www.nba.com",
};

const CELTICS_ID = process.env.SCRIPTS_CELTICS_ID!;
const CURRENT_SEASON = process.env.SCRIPTS_CURRENT_SEASON!;
const SEASON_TYPE = process.env.SCRIPTS_SEASON_TYPE!;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface ShotData {
  game_id: string;
  player_id: number;
  player_name: string;
  period: number;
  minutes_remaining: number;
  seconds_remaining: number;
  event_type: string;
  action_type: string;
  shot_type: string;
  shot_distance: number;
  loc_x: number;
  loc_y: number;
}

async function fetchGameShots(gameId: string): Promise<ShotData[]> {
  const params = new URLSearchParams({
    LeagueID: "00",
    Season: CURRENT_SEASON,
    SeasonType: SEASON_TYPE,
    TeamID: CELTICS_ID,
    PlayerID: "0",
    GameID: gameId,
    Outcome: "",
    Location: "",
    Month: "0",
    SeasonSegment: "",
    DateFrom: "",
    DateTo: "",
    OpponentTeamID: "0",
    VsConference: "",
    VsDivision: "",
    Position: "",
    RookieYear: "",
    GameSegment: "",
    Period: "0",
    LastNGames: "0",
    ContextMeasure: "FGA",
  });

  const res = await fetch(
    `https://stats.nba.com/stats/shotchartdetail?${params.toString()}`,
    {
      headers: NBA_HEADERS,
    },
  );

  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

  const data: any = await res.json();
  const dataset = data.resultSets?.find(
    (rs: any) => rs.name === "Shot_Chart_Detail",
  );
  if (!dataset) return [];

  const headers: string[] = dataset.headers;
  const rows: any[][] = dataset.rowSet;
  const getCol = (row: any[], col: string) => row[headers.indexOf(col)];

  return rows.map((row) => ({
    game_id: gameId,
    player_id: Number(getCol(row, "PLAYER_ID")),
    player_name: String(getCol(row, "PLAYER_NAME")),
    period: Number(getCol(row, "PERIOD")),
    minutes_remaining: Number(getCol(row, "MINUTES_REMAINING")),
    seconds_remaining: Number(getCol(row, "SECONDS_REMAINING")),
    event_type: String(getCol(row, "EVENT_TYPE")),
    action_type: String(getCol(row, "ACTION_TYPE")),
    shot_type: String(getCol(row, "SHOT_TYPE")),
    shot_distance: Number(getCol(row, "SHOT_DISTANCE")),
    loc_x: Number(getCol(row, "LOC_X")),
    loc_y: Number(getCol(row, "LOC_Y")),
  }));
}

(async () => {
  try {
    // 1. Obtener todos los partidos finalizados cargados en MongoDB
    const games = await db.scheduleNBAList.findMany({
      where: {
        status: { startsWith: "Final" },
      },
      select: { id: true, gameId: true, matchup: true, gameDate: true },
      orderBy: { gameDate: "asc" },
    });

    console.log(`🚀 Se encontraron ${games.length} partidos para procesar.`);

    for (let i = 0; i < games.length; i++) {
      const { gameId, matchup } = games[i];

      // 2. Si ya tiene tiros cargados, saltea para no repetir trabajo innecesario
      const existingShots = await db.shot.count({ where: { gameId } });
      if (existingShots > 0) {
        console.log(
          `[${i + 1}/${games.length}] ${matchup} (${gameId}) ya tiene ${existingShots} tiros. Omitiendo...`,
        );
        continue;
      }

      console.log(
        `[${i + 1}/${games.length}] Descargando tiros para ${matchup} (${gameId})...`,
      );

      const shots = await fetchGameShots(gameId);

      if (shots.length > 0) {
        await db.shot.createMany({
          data: shots.map((s) => ({
            gameId: s.game_id,
            playerId: s.player_id,
            playerName: s.player_name,
            period: s.period,
            minutesRemaining: s.minutes_remaining,
            secondsRemaining: s.seconds_remaining,
            eventType: s.event_type,
            actionType: s.action_type,
            shotType: s.shot_type,
            shotDistance: s.shot_distance,
            locX: s.loc_x,
            locY: s.loc_y,
          })),
        });
        console.log(`✅ Guardados ${shots.length} tiros.`);
      } else {
        console.warn(`⚠️ No se devolvieron tiros para ${gameId}.`);
      }

      // Pausa de 1.8 segundos entre peticiones para evitar baneos de IP por la NBA
      await sleep(1800);
    }

    console.log("🎉 ¡Sincronización de tiros finalizada con éxito!");
  } catch (err) {
    console.error("❌ Error en la ejecución:", err);
  } finally {
    await db.$disconnect();
  }
})();
