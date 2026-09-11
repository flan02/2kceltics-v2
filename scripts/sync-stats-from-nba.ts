// 1. Solo definís lo que vos querés guardar en tu app, no todo lo de la NBA
interface PlayerStatRow {
  player_id: number;
  name: string;
  gp: number;
  pts: number;
  reb: number;
  ast: number;
  fg_pct: number;
}

async function fetchCelticsStats(): Promise<PlayerStatRow[]> {
  const params = new URLSearchParams({
    TeamID: "1610612738",
    Season: "2025-26",
    SeasonType: "Regular Season",
    PerMode: "PerGame",
    MeasureType: "Base",
    PaceAdjust: "N",
    Rank: "N",
    LeagueID: "00",
    PlusMinus: "N",
    Month: "0",
    OpponentTeamID: "0",
    Period: "0",
    LastNGames: "0",
  });
  const url =
    "https://stats.nba.com/stats/teamplayerdashboard?" + params.toString();

  const res = await fetch(url, {
    headers: {
      Host: "stats.nba.com",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      Accept: "application/json, text/plain, */*",
      "Accept-Language": "en-US,en;q=0.9",
      "Accept-Encoding": "gzip, deflate, br",
      Referer: "https://www.nba.com/",
      Origin: "https://www.nba.com",
      "Sec-Fetch-Site": "same-site",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Dest": "empty",
      "sec-ch-ua": '"Chromium";v="124", "Google Chrome";v="124"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
    },
  });

  if (!res.ok) {
    const errorBody = await res.text().catch(() => "");
    throw new Error(`Error en NBA stats: ${res.status} - ${errorBody}`);
  }

  // 2. data la tratás como any: no perdés tiempo tipando la API externa
  const data: any = await res.json();
  const dataset = data.resultSets.find(
    (rs: any) => rs.name === "PlayersSeasonTotals",
  );

  if (!dataset) {
    throw new Error(
      "No se encontró el conjunto de datos 'PlayersSeasonTotals'",
    );
  }
  const headers: string[] = dataset.headers;
  const rows: any[][] = dataset.rowSet;

  // Helper para sacar la columna por nombre
  const getCol = (row: any[], colName: string) => row[headers.indexOf(colName)];

  return rows.map((row) => ({
    player_id: Number(getCol(row, "PLAYER_ID")),
    name: String(getCol(row, "PLAYER_NAME")),
    gp: Number(getCol(row, "GP")),
    // gs: Number(getCol(row, "GS")),
    min: Number(getCol(row, "MIN")),
    pts: Number(getCol(row, "PTS")),
    // Tiros de campo
    fgm: Number(getCol(row, "FGM")),
    fga: Number(getCol(row, "FGA")),
    fg_pct: Number(getCol(row, "FG_PCT")),
    // Triples
    // fg3m: Number(getCol(row, "FG3M")),
    // fg3a: Number(getCol(row, "FG3A")),
    // fg3_pct: Number(getCol(row, "FG3_PCT")),
    // Libres
    // ftm: Number(getCol(row, "FTM")),
    // fta: Number(getCol(row, "FTA")),
    // ft_pct: Number(getCol(row, "FT_PCT")),
    // Rebotes y juego
    // oreb: Number(getCol(row, "OREB")),
    // dreb: Number(getCol(row, "DREB")),
    reb: Number(getCol(row, "REB")),
    ast: Number(getCol(row, "AST")),
    // stl: Number(getCol(row, "STL")),
    // blk: Number(getCol(row, "BLK")),
    // tov: Number(getCol(row, "TOV")),
    "+/-": Number(getCol(row, "PLUS_MINUS")),
  }));
}

async function main() {
  try {
    console.log("Iniciando sincronización...");
    const stats = await fetchCelticsStats();
    console.log(`Descargados ${stats.length} jugadores.`);

    // 3. Acá llamas a tu DB (Prisma, Supabase, Drizzle, etc.)
    // TypeScript acá sí te ayuda porque 'stats' ya tiene tipo seguro.
    console.table(stats);

    console.log("Sincronización finalizada con éxito.");
  } catch (err) {
    console.error("Error al sincronizar:", err);
    process.exit(1);
  }
}

main();
