export {};

import { PrismaClient, SeasonType } from "@prisma/client";

const prisma = new PrismaClient();

const NBA_HEADERS = {
  Connection: "keep-alive",
  Accept: "application/json, text/plain, */*",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  Origin: "https://www.nba.com",
  Referer: "https://www.nba.com/",
  "Accept-Language": "en-US,en;q=0.9",
};
// const CELTICS_ID = 1610612738;

async function getLastGamePlayed(
  season = "2026-27",
  seasonType = "Regular%20Season",
) {
  const url = `https://stats.nba.com/stats/teamgamelog?TeamID=1610612738&Season=${season}&SeasonType=${seasonType}`;
  console.log("-> Buscando el ÚLTIMO partido desde:", url);

  const res = await fetch(url, { headers: NBA_HEADERS });
  if (!res.ok) throw new Error(`Error en teamgamelog: ${res.status}`);

  const data: any = await res.json();
  const rowSet = data.resultSets[0].rowSet;
  const headers = data.resultSets[0].headers;

  if (rowSet.length === 0) {
    return null; // Por si todavía no empezó la temporada
  }

  // La API siempre devuelve el partido más reciente en la posición 0.
  // Aislamos esa fila directamente, sin hacer un .map() de todo el array.
  const lastGameRow = rowSet[0];

  return {
    gameId: String(lastGameRow[headers.indexOf("Game_ID")]),
    date: String(lastGameRow[headers.indexOf("GAME_DATE")]),
    matchup: String(lastGameRow[headers.indexOf("MATCHUP")]),
  };
}

async function getAllBostonGames(
  season = "2026-27",
  seasonType = "Regular%20Season",
) {
  // Trae el historial completo de Boston. No adivinamos más fechas.
  const url = `https://stats.nba.com/stats/teamgamelog?TeamID=1610612738&Season=${season}&SeasonType=${seasonType}`;
  console.log("-> Obteniendo historial de partidos desde:", url);

  const res = await fetch(url, { headers: NBA_HEADERS });
  if (!res.ok) throw new Error(`Error en teamgamelog: ${res.status}`);

  const data: any = await res.json();
  const rowSet = data.resultSets[0].rowSet;
  const headers = data.resultSets[0].headers;

  // Mapeamos para sacar solo los GameID y los Matchups limpios
  const games = rowSet.map((r: any[]) => ({
    gameId: String(r[headers.indexOf("Game_ID")]),
    date: String(r[headers.indexOf("GAME_DATE")]), // Ej: "OCT 12, 2026"
    matchup: String(r[headers.indexOf("MATCHUP")]), // Ej: "BOS vs. PHI"
  }));

  // La API los devuelve del más nuevo al más viejo.
  // Lo damos vuelta (reverse) para guardarlos en orden cronológico en tu DB.
  return games.reverse();
}

async function fetchGameBoxScore(gameId: string) {
  // Acá es donde entra en juego el boxscoretraditional.
  // Podés usar v2 o v3 dependiendo de cómo armaste tu parseo anterior.
  const url = `https://stats.nba.com/stats/boxscoretraditionalv2?GameID=${gameId}&StartPeriod=1&EndPeriod=10&StartRange=0&EndRange=28800&RangeType=0`;

  const res = await fetch(url, { headers: NBA_HEADERS });
  if (!res.ok) throw new Error(`Error descargando BoxScore para ${gameId}`);

  const data: any = await res.json();
  // El resultSets[0] se llama "PlayerStats" y trae a LOS DOS EQUIPOS.
  const playerStatsSet = data.resultSets.find(
    (rs: any) => rs.name === "PlayerStats",
  );

  const headers = playerStatsSet.headers;
  const rows = playerStatsSet.rowSet;

  // Acá parseas los datos como ya sabés hacerlo (tiempo a decimal, etc)
  // Te va a devolver a Tatum (BOS), a Maxey (PHI), a todos.
  const parsedStats = rows.map((r: any[]) => {
    const startPos = r[headers.indexOf("START_POSITION")];

    // Transformamos los minutos "23:15" o "12.0000" a número para tu campo Float
    const rawMin = r[headers.indexOf("MIN")];
    const minFloat = rawMin ? parseFloat(String(rawMin).replace(":", ".")) : 0;

    return {
      playerId: r[headers.indexOf("PLAYER_ID")],
      playerName: r[headers.indexOf("PLAYER_NAME")],
      teamId: r[headers.indexOf("TEAM_ID")],
      teamAbbr: r[headers.indexOf("TEAM_ABBREVIATION")],
      isStarter: startPos !== "" && startPos !== null,
      startPosition: startPos || null,

      min: minFloat,
      pts: r[headers.indexOf("PTS")] || 0,
      reb: r[headers.indexOf("REB")] || 0,
      ast: r[headers.indexOf("AST")] || 0,

      // 👉 NUEVOS CAMPOS OBLIGATORIOS EXTRAÍDOS DE LA API:
      stl: r[headers.indexOf("STL")] || 0,
      blk: r[headers.indexOf("BLK")] || 0,
      tov: r[headers.indexOf("TO")] || 0, // La NBA le dice "TO" a los Turnovers
      fgm: r[headers.indexOf("FGM")] || 0,
      fga: r[headers.indexOf("FGA")] || 0,
      fg3m: r[headers.indexOf("FG3M")] || 0,
      fg3a: r[headers.indexOf("FG3A")] || 0,
      ftm: r[headers.indexOf("FTM")] || 0,
      fta: r[headers.indexOf("FTA")] || 0,
      oreb: r[headers.indexOf("OREB")] || 0,
      dreb: r[headers.indexOf("DREB")] || 0,
      pf: r[headers.indexOf("PF")] || 0,
      plusMinus: r[headers.indexOf("PLUS_MINUS")] || 0,
    };
  });

  return parsedStats;
}

async function main() {
  console.log("Iniciando sincronización completa de Temporada...");

  // Paso A: Conseguir la lista de IDs (cero huecos)
  // const games = await getAllBostonGames("2026-27", "Regular%20Season");
  // console.log(`Se encontraron ${games.length} partidos. Empezando descarga...`);

  // | (Muestra todos los partidos jugados) Recorrer partido por partido y descargar el boxscore (ambos equipos)
  // for (const game of games) {
  //   console.log(
  //     `\nProcesando GameID ${game.gameId} | ${game.date} | ${game.matchup}`,
  //   );

  // | Retrieve the last game played
  const game = await getLastGamePlayed("2026-27", "Regular%20Season");

  if (!game) {
    console.log("❌ No se encontraron partidos jugados todavía.");
    return;
  }

  // Descargamos las estadísticas de los 20+ jugadores de esa noche
  const boxScore = await fetchGameBoxScore(game.gameId);

  const tablaResumen = boxScore.map((jugador: any) => ({
    Jugador: jugador.playerName,
    Equipo: jugador.teamAbbr,
    isStarter: jugador.isStarter,
    startPosition: jugador.startPosition,
    Min: jugador.min, // Asegurate de que estos nombres coincidan con las claves de tu objeto
    PTS: jugador.pts,
    REB: jugador.reb,
    AST: jugador.ast,
    "+/-": jugador.plusMinus,
  }));

  console.table(tablaResumen);

  console.log(
    `-> Extraídos ${boxScore.length} jugadores (Celtics + Rival). Guardando en DB...`,
  );

  // Paso C: Insertar en Prisma
  let insertCount = 0;
  for (const stat of boxScore) {
    await prisma.playerGameStatsNBA.upsert({
      where: {
        // Prisma usa esta sintaxis especial cuando tenés un @@unique compuesto
        gameId_playerId: {
          gameId: game.gameId,
          playerId: stat.playerId,
        },
      },
      update: {
        min: stat.min,
        pts: stat.pts,
        reb: stat.reb,
        ast: stat.ast,
        plusMinus: stat.plusMinus,
        isStarter: stat.isStarter,
        startPosition: stat.startPosition,
        stl: stat.stl,
        blk: stat.blk,
        tov: stat.tov,
        fgm: stat.fgm,
        fga: stat.fga,
        fg3m: stat.fg3m,
        fg3a: stat.fg3a,
        ftm: stat.ftm,
        fta: stat.fta,
        oreb: stat.oreb,
        dreb: stat.dreb,
        pf: stat.pf,
      },
      create: {
        gameId: game.gameId,
        playerId: stat.playerId,
        playerName: stat.playerName,
        teamId: stat.teamId,
        teamAbbr: stat.teamAbbr,
        min: stat.min,
        pts: stat.pts,
        reb: stat.reb,
        ast: stat.ast,
        plusMinus: stat.plusMinus,
        isStarter: stat.isStarter,
        startPosition: stat.startPosition,
        stl: stat.stl,
        blk: stat.blk,
        tov: stat.tov,
        fgm: stat.fgm,
        fga: stat.fga,
        fg3m: stat.fg3m,
        fg3a: stat.fg3a,
        ftm: stat.ftm,
        fta: stat.fta,
        oreb: stat.oreb,
        dreb: stat.dreb,
        pf: stat.pf,
      },
    });
    insertCount++;
  }
  console.log(
    `✅ GameID ${game.gameId} guardado con éxito (${insertCount} registros).`,
  );

  // Un pequeño delay de 1 segundo entre partido y partido para no saturar la API
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("\n🚀 Sincronización finalizada al 100%.");
}

// Quitamos el .finally(() => prisma.$disconnect()) porque ya no usamos Prisma acá
main().catch(console.error);

// Calcula la fecha exacta de ayer en formato YYYY-MM-DD
/* 
const ayer = new Date();
ayer.setDate(ayer.getDate() - 1);
const targetDate = ayer.toISOString().split('T')[0];
*/

// 1. Modificamos esta función para que también devuelva el matchup (ej: "BOS @ NYK")
// async function getGameInfoByDate(gameDate: string) {
//   console.log(`Buscando partido de Boston para la fecha ${gameDate}...`);
//   const url = `https://stats.nba.com/stats/scoreboardv2?DayOffset=0&LeagueID=00&gameDate=${gameDate}`;
//   console.log("-> Pegándole a la URL:", url);

//   // const res = await fetch(url, { headers: NBA_HEADERS });
//   const res = await fetch(url, {
//     method: "GET",
//     headers: NBA_HEADERS,
//     // Si Next.js está cacheando una respuesta rota (500), forzamos el re-fetch:
//     // next: { revalidate: 0 }
//   });
//   if (!res.ok) throw new Error(`Error en Scoreboard: ${res.status}`);

//   const data: any = await res.json();
//   const gameHeaderSet = data.resultSets.find(
//     (rs: any) => rs.name === "GameHeader",
//   );
//   const lineScoreSet = data.resultSets.find(
//     (rs: any) => rs.name === "LineScore",
//   );

//   if (
//     !lineScoreSet ||
//     !lineScoreSet.rowSet ||
//     lineScoreSet.rowSet.length === 0
//   ) {
//     console.log("-> ❌ La API devolvió 0 partidos para esta fecha.");
//     return null;
//   }

//   const headers: string[] = lineScoreSet.headers;
//   const rows: any[][] = lineScoreSet.rowSet;

//   const teamIndex = headers.indexOf("TEAM_ABBREVIATION");
//   const todosLosEquipos = rows.map((r) => r[teamIndex]);
//   console.log(`-> Cartelera del ${gameDate}:`, todosLosEquipos.join(", "));

//   const celticsRow = rows.find(
//     (r) => Number(r[headers.indexOf("TEAM_ID")]) === CELTICS_ID,
//   );

//   if (!celticsRow) {
//     console.log("-> ❌ Hay partidos, pero no de Boston.");
//     const teams = rows.map((r) => r[headers.indexOf("TEAM_ABBREVIATION")]);
//     console.log("-> Equipos que jugaron hoy:", [...new Set(teams)]);
//     return null;
//   }

//   const gameId = String(celticsRow[headers.indexOf("GAME_ID")]);

//   const ghHeaders: string[] = gameHeaderSet.headers;
//   const ghRow = gameHeaderSet.rowSet.find(
//     (r: any[]) => r[ghHeaders.indexOf("GAME_ID")] === gameId,
//   );
//   const statusText = String(
//     ghRow[ghHeaders.indexOf("GAME_STATUS_TEXT")],
//   ).trim();

//   console.log(
//     `-> ✅ Partido encontrado! ID: ${gameId} | Estado: "${statusText}"`,
//   );

//   if (!statusText.includes("Final")) {
//     console.log("-> ❌ El partido figura como no terminado.");
//     return null;
//   }

//   const matchupText = String(ghRow[ghHeaders.indexOf("GAMECODE")]);
//   return { gameId, matchupText };
// }

// 2. Extraer datos de TODOS los jugadores y mapear todos los campos del schema
// async function fetchGameBoxScore(gameId: string) {
//   // ... tu código de fetch a boxscoretraditionalv2 intacto ...
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

//   // ELIMINAMOS el .filter() de CELTICS_ID para guardar a ambos equipos
//   return rows.map((row) => {
//     const rawMin = getCol(row, "MIN");
//     const minFormatted = rawMin
//       ? parseFloat(rawMin.split(":")[0]) +
//         parseFloat(rawMin.split(":")[1] || "0") / 60
//       : 0;

//     return {
//       playerId: Number(getCol(row, "PLAYER_ID")),
//       playerName: String(getCol(row, "PLAYER_NAME")),
//       teamId: Number(getCol(row, "TEAM_ID")),
//       teamAbbr: String(getCol(row, "TEAM_ABBREVIATION")), // Agregado para diferenciar equipos
//       min: Math.round(minFormatted * 10) / 10,
//       pts: Number(getCol(row, "PTS") || 0),
//       reb: Number(getCol(row, "REB") || 0),
//       oreb: Number(getCol(row, "OREB") || 0),
//       dreb: Number(getCol(row, "DREB") || 0),
//       ast: Number(getCol(row, "AST") || 0),
//       stl: Number(getCol(row, "STL") || 0),
//       blk: Number(getCol(row, "BLK") || 0),
//       tov: Number(getCol(row, "TO") || 0), // Ojo: en la API suele llamarse "TO"
//       fgm: Number(getCol(row, "FGM") || 0),
//       fga: Number(getCol(row, "FGA") || 0),
//       fg3m: Number(getCol(row, "FG3M") || 0),
//       fg3a: Number(getCol(row, "FG3A") || 0),
//       ftm: Number(getCol(row, "FTM") || 0),
//       fta: Number(getCol(row, "FTA") || 0),
//       pf: Number(getCol(row, "PF") || 0),
//       plusMinus: Number(getCol(row, "PLUS_MINUS") || 0),
//     };
//   });
// }

// 3. Inserción segura en MongoDB usando Prisma
// async function main() {
//   const targetDate = "2026-10-08";
//   const gameInfo = await getGameInfoByDate(targetDate);

//   if (!gameInfo) return;

//   const { gameId, matchupText } = gameInfo;
//   const boxScore = await fetchGameBoxScore(gameId);

//   // Determinamos el tipo de temporada leyendo los primeros dígitos del gameId oficial
//   const gameIdPrefix = gameId.substring(0, 3);
//   let seasonType: SeasonType = SeasonType.REGULAR_SEASON;
//   if (gameIdPrefix === "001") seasonType = SeasonType.PRESEASON;
//   if (gameIdPrefix === "004") seasonType = SeasonType.PLAYOFFS;
//   if (gameIdPrefix === "005") seasonType = SeasonType.PLAY_IN;

//   console.log(`Guardando ${boxScore.length} jugadores en la base de datos...`);

//   const CURRENT_SEASON = "2026-27"; // Ajusta según tu env

//   // Usamos un bucle con upsert para aprovechar tu restricción @@unique([gameId, playerId])
//   // Si el jugador y el partido ya existen, los actualiza. Si no, los crea.
//   for (const stat of boxScore) {
//     await prisma.playerGameStatsNBA.upsert({
//       where: {
//         gameId_playerId: {
//           // Prisma genera esta clave automáticamente por tu @@unique
//           gameId: gameId,
//           playerId: stat.playerId,
//         },
//       },
//       update: {
//         ...stat,
//       },
//       create: {
//         gameId: gameId,
//         season: CURRENT_SEASON, // Esto lo podés pasar dinámico según la fecha
//         seasonType: seasonType,
//         gameDate: new Date(targetDate),
//         matchupText: matchupText,
//         ...stat,
//       },
//     });
//   }

//   console.log("Sincronización completada con éxito.");
// }

// main()
//   .catch(console.error)
//   .finally(() => prisma.$disconnect());

// 4. Show data in console for verification
// async function main() {
//   // const targetDate = "2024-10-22"; // Formato original
//   // const targetDate = "2026-04-19"; // Formato original
//   const targetDate = "2026-06-13"; // Formato original

//   console.log(`Buscando partido de Boston para la fecha ${targetDate}...`);

//   // Le pasamos targetDate directo sin convertir
//   const gameInfo = await getGameInfoByDate(targetDate);

//   if (!gameInfo) {
//     console.log(
//       "No se encontró partido de los Celtics para esta fecha o aún no finalizó.",
//     );
//     return;
//   }

//   const { gameId, matchupText } = gameInfo;
//   console.log(`Descargando estadísticas...`);

//   const boxScore = await fetchGameBoxScore(gameId);
//   console.table(boxScore, [
//     "playerName",
//     "teamAbbr",
//     "min",
//     "pts",
//     "reb",
//     "ast",
//     "plusMinus",
//   ]);
// }
