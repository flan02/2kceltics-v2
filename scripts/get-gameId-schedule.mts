export {};

// TODO: This code retrieves an already played Celtics game Id

// const NBA_HEADERS = {
//   Host: "stats.nba.com",
//   "User-Agent":
//     "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
//   Accept: "application/json, text/plain, */*",
//   "Accept-Language": "en-US,en;q=0.9",
//   Referer: "https://www.nba.com/",
//   Origin: "https://www.nba.com",
// };

// const CELTICS_ID = 1610612738;

// interface GameLogEntry {
//   game_id: string;
//   game_date: string;
//   matchup: string;
//   wl: string; // 'W' o 'L' (o null/vacío si aún no se jugó)
//   pts: number;
// }

// async function getCelticsGames(
//   season: string = "2026-27",
//   seasonType: string = "Regular Season",
// ): Promise<GameLogEntry[]> {
//   const params = new URLSearchParams({
//     TeamID: CELTICS_ID.toString(),
//     Season: season,
//     SeasonType: seasonType,
//   });

//   const url = `https://stats.nba.com/stats/teamgamelog?${params.toString()}`;
//   const res = await fetch(url, { headers: NBA_HEADERS });

//   if (!res.ok) throw new Error(`Error en TeamGameLog: ${res.status}`);

//   const data: any = await res.json();
//   const dataset = data.resultSets.find((rs: any) => rs.name === "TeamGameLog");

//   const headers: string[] = dataset.headers;
//   const rows: any[][] = dataset.rowSet;

//   const getCol = (row: any[], col: string) => row[headers.indexOf(col)];

//   return rows.map((row) => ({
//     game_id: String(getCol(row, "Game_ID")),
//     game_date: String(getCol(row, "GAME_DATE")),
//     matchup: String(getCol(row, "MATCHUP")), // ej: "BOS vs. NYK" o "BOS @ MIA"
//     wl: String(getCol(row, "WL") || "Pendiente"),
//     pts: Number(getCol(row, "PTS") || 0),
//   }));
// }

// (async () => {
//   // Podés probar con "2023-24", "2024-25", etc.
//   const season = "2024-25";
//   console.log(
//     `Buscando partidos de los Celtics para la temporada ${season}...`,
//   );

//   const games = await getCelticsGames(season, "Regular Season");
//   console.log(`Se encontraron ${games.length} partidos:`);

//   // Mostramos los primeros 10 como muestra
//   console.table(games.slice(0, 10));
// })();

//TODO: This code retrieves the future Celtics games schedule
// scripts/get-celtics-future-schedule.ts
export {};

const NBA_HEADERS = {
  Host: "stats.nba.com",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  Accept: "application/json, text/plain, */*",
  "Accept-Language": "en-US,en;q=0.9",
  Referer: "https://www.nba.com/",
  Origin: "https://www.nba.com",
};

const CELTICS_ID = 1610612738;

async function getFutureCelticsGames(season: string = "2026-27") {
  const params = new URLSearchParams({
    LeagueID: "00",
    Season: season,
  });

  // Endpoint oficial que contiene el calendario completo (pasado y futuro)
  const url = `https://stats.nba.com/stats/scheduleleaguev2?${params.toString()}`;
  const res = await fetch(url, { headers: NBA_HEADERS });

  if (!res.ok) throw new Error(`Error al consultar calendario: ${res.status}`);

  const data: any = await res.json();
  const gameDates = data.leagueSchedule?.gameDates || [];

  const celticsGames: any[] = [];

  for (const dateEntry of gameDates) {
    for (const game of dateEntry.games) {
      // Filtrar partidos donde Boston sea local o visitante
      if (
        game.homeTeam?.teamId === CELTICS_ID ||
        game.awayTeam?.teamId === CELTICS_ID
      ) {
        celticsGames.push({
          game_id: game.gameId,
          game_date: game.gameDateTimeUTC,
          home_team: game.homeTeam.teamTricode,
          away_team: game.awayTeam.teamTricode,
          matchup: `${game.awayTeam.teamTricode} @ ${game.homeTeam.teamTricode}`,
          status: game.gameStatusText, // ej: "7:30 pm ET" si es futuro
        });
      }
    }
  }

  return celticsGames;
}

(async () => {
  const season = "2026-27";
  console.log(`Consultando fixture para la temporada ${season}...`);
  const games = await getFutureCelticsGames(season);

  console.log(`Se encontraron ${games.length} partidos en el calendario:`);
  console.table(games.slice(0, 10)); // Muestra los primeros 10
})();
