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
  const url =
    "https://stats.nba.com/stats/teamplayerdashboard?TeamID=1610612738&Season=2023-24&SeasonType=Regular+Season&PerMode=PerGame&MeasureType=Base";

  const res = await fetch(url, {
    headers: {
      Host: "stats.nba.com",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/122.0.0.0 Safari/537.36",
      Accept: "application/json, text/plain, */*",
      Referer: "https://www.nba.com/",
      Origin: "https://www.nba.com",
    },
  });

  if (!res.ok) {
    throw new Error(`Error en NBA stats: ${res.status}`);
  }

  // 2. data la tratás como any: no perdés tiempo tipando la API externa
  const data: any = await res.json();

  const dataset = data.resultSets.find(
    (rs: any) => rs.name === "PlayersSeasonTotals",
  );
  const headers: string[] = dataset.headers;
  const rows: any[][] = dataset.rowSet;

  // Helper para sacar la columna por nombre
  const getCol = (row: any[], colName: string) => row[headers.indexOf(colName)];

  return rows.map((row) => ({
    player_id: Number(getCol(row, "PLAYER_ID")),
    name: String(getCol(row, "PLAYER_NAME")),
    gp: Number(getCol(row, "GP")),
    pts: Number(getCol(row, "PTS")),
    reb: Number(getCol(row, "REB")),
    ast: Number(getCol(row, "AST")),
    fg_pct: Number(getCol(row, "FG_PCT")),
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
