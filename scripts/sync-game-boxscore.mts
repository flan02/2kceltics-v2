export {};

import { PrismaClient, SeasonType } from "@prisma/client";

const prisma = new PrismaClient();
// const NBA_HEADERS = { /* ... tus headers intactos ... */ };
const NBA_HEADERS = {
  Host: "stats.nba.com",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  Accept: "application/json, text/plain, */*",
  "Accept-Language": "en-US,en;q=0.9",
  Referer: "https://www.nba.com/",
  Origin: "https://www.nba.com",
  "Sec-Fetch-Site": "same-site",
  "Sec-Fetch-Mode": "cors",
  "Sec-Fetch-Dest": "empty",
};
const CELTICS_ID = 1610612738;

// 1. Modificamos esta función para que también devuelva el matchup (ej: "BOS @ NYK")
async function getGameInfoByDate(gameDate: string) {
  // ... tu código de fetch a scoreboardv2 intacto ...
  const url = `https://stats.nba.com/stats/scoreboardv2?DayOffset=0&LeagueID=00&gameDate=${gameDate}`;
  const res = await fetch(url, { headers: NBA_HEADERS });

  if (!res.ok) throw new Error(`Error en Scoreboard: ${res.status}`);

  const data: any = await res.json();
  const gameHeaderSet = data.resultSets.find(
    (rs: any) => rs.name === "GameHeader",
  );
  const lineScoreSet = data.resultSets.find(
    (rs: any) => rs.name === "LineScore",
  );

  const headers: string[] = lineScoreSet.headers;
  const rows: any[][] = lineScoreSet.rowSet;

  const celticsRow = rows.find(
    (r) => Number(r[headers.indexOf("TEAM_ID")]) === CELTICS_ID,
  );
  if (!celticsRow) return null;

  const gameId = String(celticsRow[headers.indexOf("GAME_ID")]);

  // Extraemos el matchup (suele venir en la fila del partido dentro de GameHeader)
  const ghHeaders: string[] = gameHeaderSet.headers;
  const ghRow = gameHeaderSet.rowSet.find(
    (r: any[]) => r[ghHeaders.indexOf("GAME_ID")] === gameId,
  );
  const statusText = String(
    ghRow[ghHeaders.indexOf("GAME_STATUS_TEXT")],
  ).trim();

  if (!statusText.includes("Final")) return null;

  // Extraemos el texto del enfrentamiento oficial de la API
  const matchupText = String(ghRow[ghHeaders.indexOf("GAMECODE")]); // Suele venir como "20241119/BOSNYK" o similar, podés formatearlo acá.

  return { gameId, matchupText };
}

// 2. Extraer datos de TODOS los jugadores y mapear todos los campos del schema
async function fetchGameBoxScore(gameId: string) {
  // ... tu código de fetch a boxscoretraditionalv2 intacto ...
  const params = new URLSearchParams({
    GameID: gameId,
    StartPeriod: "0",
    EndPeriod: "0",
    StartRange: "0",
    EndRange: "0",
    RangeType: "0",
  });

  const url = `https://stats.nba.com/stats/boxscoretraditionalv2?${params.toString()}`;
  const res = await fetch(url, { headers: NBA_HEADERS });

  if (!res.ok) throw new Error(`Error en BoxScore: ${res.status}`);

  const data: any = await res.json();
  const playerStatsSet = data.resultSets.find(
    (rs: any) => rs.name === "PlayerStats",
  );

  const headers: string[] = playerStatsSet.headers;
  const rows: any[][] = playerStatsSet.rowSet;

  const getCol = (row: any[], col: string) => row[headers.indexOf(col)];

  // ELIMINAMOS el .filter() de CELTICS_ID para guardar a ambos equipos
  return rows.map((row) => {
    const rawMin = getCol(row, "MIN");
    const minFormatted = rawMin
      ? parseFloat(rawMin.split(":")[0]) +
        parseFloat(rawMin.split(":")[1] || "0") / 60
      : 0;

    return {
      playerId: Number(getCol(row, "PLAYER_ID")),
      playerName: String(getCol(row, "PLAYER_NAME")),
      teamId: Number(getCol(row, "TEAM_ID")),
      teamAbbr: String(getCol(row, "TEAM_ABBREVIATION")), // Agregado para diferenciar equipos
      min: Math.round(minFormatted * 10) / 10,
      pts: Number(getCol(row, "PTS") || 0),
      reb: Number(getCol(row, "REB") || 0),
      oreb: Number(getCol(row, "OREB") || 0),
      dreb: Number(getCol(row, "DREB") || 0),
      ast: Number(getCol(row, "AST") || 0),
      stl: Number(getCol(row, "STL") || 0),
      blk: Number(getCol(row, "BLK") || 0),
      tov: Number(getCol(row, "TO") || 0), // Ojo: en la API suele llamarse "TO"
      fgm: Number(getCol(row, "FGM") || 0),
      fga: Number(getCol(row, "FGA") || 0),
      fg3m: Number(getCol(row, "FG3M") || 0),
      fg3a: Number(getCol(row, "FG3A") || 0),
      ftm: Number(getCol(row, "FTM") || 0),
      fta: Number(getCol(row, "FTA") || 0),
      pf: Number(getCol(row, "PF") || 0),
      plusMinus: Number(getCol(row, "PLUS_MINUS") || 0),
    };
  });
}

// 3. Inserción segura en MongoDB usando Prisma
async function main() {
  const targetDate = "2026-10-08";
  const gameInfo = await getGameInfoByDate(targetDate);

  if (!gameInfo) return;

  const { gameId, matchupText } = gameInfo;
  const boxScore = await fetchGameBoxScore(gameId);

  // Determinamos el tipo de temporada leyendo los primeros dígitos del gameId oficial
  const gameIdPrefix = gameId.substring(0, 3);
  let seasonType: SeasonType = SeasonType.REGULAR_SEASON;
  if (gameIdPrefix === "001") seasonType = SeasonType.PRESEASON;
  if (gameIdPrefix === "004") seasonType = SeasonType.PLAYOFFS;
  if (gameIdPrefix === "005") seasonType = SeasonType.PLAY_IN;

  console.log(`Guardando ${boxScore.length} jugadores en la base de datos...`);

  const CURRENT_SEASON = "2026-27"; // Ajusta según tu env

  // Usamos un bucle con upsert para aprovechar tu restricción @@unique([gameId, playerId])
  // Si el jugador y el partido ya existen, los actualiza. Si no, los crea.
  for (const stat of boxScore) {
    await prisma.playerGameStatsNBA.upsert({
      where: {
        gameId_playerId: {
          // Prisma genera esta clave automáticamente por tu @@unique
          gameId: gameId,
          playerId: stat.playerId,
        },
      },
      update: {
        ...stat,
      },
      create: {
        gameId: gameId,
        season: CURRENT_SEASON, // Esto lo podés pasar dinámico según la fecha
        seasonType: seasonType,
        gameDate: new Date(targetDate),
        matchupText: matchupText,
        ...stat,
      },
    });
  }

  console.log("Sincronización completada con éxito.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

// // scripts/sync-game-boxscore.ts
// export {};
// const NBA_HEADERS = {
//   Host: "stats.nba.com",
//   "User-Agent":
//     "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
//   Accept: "application/json, text/plain, */*",
//   "Accept-Language": "en-US,en;q=0.9",
//   Referer: "https://www.nba.com/",
//   Origin: "https://www.nba.com",
//   "Sec-Fetch-Site": "same-site",
//   "Sec-Fetch-Mode": "cors",
//   "Sec-Fetch-Dest": "empty",
// };

// const CELTICS_ID = 1610612738;

// // 1. Obtener el GameID de una fecha si jugó Boston y terminó
// async function getCelticsGameIdByDate(
//   gameDate: string,
// ): Promise<string | null> {
//   const url = `https://stats.nba.com/stats/scoreboardv2?DayOffset=0&LeagueID=00&gameDate=${gameDate}`;
//   const res = await fetch(url, { headers: NBA_HEADERS });

//   if (!res.ok) throw new Error(`Error en Scoreboard: ${res.status}`);

//   const data: any = await res.json();
//   const gameHeaderSet = data.resultSets.find(
//     (rs: any) => rs.name === "GameHeader",
//   );
//   const lineScoreSet = data.resultSets.find(
//     (rs: any) => rs.name === "LineScore",
//   );

//   const headers: string[] = lineScoreSet.headers;
//   const rows: any[][] = lineScoreSet.rowSet;

//   // Buscar si Boston figura en los equipos que jugaron esa fecha
//   const celticsRow = rows.find(
//     (r) => Number(r[headers.indexOf("TEAM_ID")]) === CELTICS_ID,
//   );
//   if (!celticsRow) {
//     console.log(
//       `No hay partidos de Boston Celtics registrados en la fecha: ${gameDate}`,
//     );
//     return null;
//   }

//   const gameId = String(celticsRow[headers.indexOf("GAME_ID")]);

//   // Verificar si el partido ya finalizó
//   const ghHeaders: string[] = gameHeaderSet.headers;
//   const ghRow = gameHeaderSet.rowSet.find(
//     (r: any[]) => r[ghHeaders.indexOf("GAME_ID")] === gameId,
//   );
//   const statusText = String(
//     ghRow[ghHeaders.indexOf("GAME_STATUS_TEXT")],
//   ).trim();

//   if (!statusText.includes("Final")) {
//     console.log(
//       `El partido ${gameId} aún no terminó (Estado actual: ${statusText})`,
//     );
//     return null;
//   }

//   return gameId;
// }

// // 2. Descargar el box score de ese partido
// async function fetchGameBoxScore(gameId: string) {
//   const params = new URLSearchParams({
//     GameID: gameId,
//     StartPeriod: "0",
//     EndPeriod: "0",
//     StartRange: "0",
//     EndRange: "0",
//     RangeType: "0",
//   });

//   const url = `https://stats.nba.com/stats/boxscoretraditionalv2?${params.toString()}`;
//   const res = await fetch(url, { headers: NBA_HEADERS });

//   if (!res.ok) throw new Error(`Error en BoxScore: ${res.status}`);

//   const data: any = await res.json();
//   const playerStatsSet = data.resultSets.find(
//     (rs: any) => rs.name === "PlayerStats",
//   );

//   const headers: string[] = playerStatsSet.headers;
//   const rows: any[][] = playerStatsSet.rowSet;

//   const getCol = (row: any[], col: string) => row[headers.indexOf(col)];

//   // Filtrar únicamente los jugadores de Boston
//   return rows
//     .filter((row) => Number(getCol(row, "TEAM_ID")) === CELTICS_ID)
//     .map((row) => {
//       // MIN en este endpoint suele venir en formato string "MM:SS" (ej: "34:12") o null si DNP
//       const rawMin = getCol(row, "MIN");
//       const minFormatted = rawMin
//         ? parseFloat(rawMin.split(":")[0]) +
//           parseFloat(rawMin.split(":")[1] || "0") / 60
//         : 0;

//       return {
//         game_id: gameId,
//         player_id: Number(getCol(row, "PLAYER_ID")),
//         name: String(getCol(row, "PLAYER_NAME")),
//         pos: getCol(row, "START_POSITION") || "Bench",
//         min: Math.round(minFormatted * 10) / 10,
//         pts: Number(getCol(row, "PTS") || 0),
//         reb: Number(getCol(row, "REB") || 0),
//         ast: Number(getCol(row, "AST") || 0),
//         stl: Number(getCol(row, "STL") || 0),
//         blk: Number(getCol(row, "BLK") || 0),
//         fgm: Number(getCol(row, "FGM") || 0),
//         fga: Number(getCol(row, "FGA") || 0),
//         fg_pct: Number(getCol(row, "FG_PCT") || 0),
//         "+/-": Number(getCol(row, "PLUS_MINUS") || 0),
//       };
//     });
// }

// // 3. Ejecución
// async function main() {
//   // Podés pasarle cualquier fecha en formato YYYY-MM-DD
//   const targetDate = "2024-11-19";

//   console.log(`Buscando partido para la fecha ${targetDate}...`);
//   const gameId = await getCelticsGameIdByDate(targetDate);

//   if (!gameId) return;

//   console.log(
//     `Partido encontrado (ID: ${gameId}). Descargando estadísticas...`,
//   );
//   const boxScore = await fetchGameBoxScore(gameId);

//   console.table(boxScore, ["name", "pos", "min", "pts", "reb", "ast", "+/-"]);
// }

// main().catch(console.error);
