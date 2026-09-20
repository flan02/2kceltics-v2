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

const CELTICS_ID = process.env.SCRIPTS_CELTICS_ID || "1610612738";
const SEASON_TYPE = process.env.SCRIPTS_SEASON_TYPE || "Regular Season";

async function fetchCelticsSeasonTotals(): Promise<any> {
  const params = new URLSearchParams({
    TeamID: CELTICS_ID,
    SeasonType: SEASON_TYPE,
    PerMode: "Totals",
    LeagueID: "00",
  });

  const res = await fetch(
    `https://stats.nba.com/stats/teamyearbyyearstats?${params.toString()}`,
    { headers: NBA_HEADERS },
  );

  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

  const data: any = await res.json();
  const dataset =
    data.resultSets?.find((rs: any) => rs.name === "TeamStats") ||
    data.resultSets?.[0];

  if (!dataset) throw new Error("No se encontró el resultSet TeamStats.");

  const headers: string[] = dataset.headers;
  const rows: any[][] = dataset.rowSet;
  const latestRow = rows[rows.length - 1];

  const getCol = (col: string) => latestRow[headers.indexOf(col)];

  const fgm = Number(getCol("FGM"));
  const fga = Number(getCol("FGA"));
  const fg3m = Number(getCol("FG3M"));
  const fg3a = Number(getCol("FG3A"));

  // 2PT calculados por resta directa
  const fg2m = fgm - fg3m;
  const fg2a = fga - fg3a;
  const fg2Pct = fg2a > 0 ? (fg2m / fg2a) * 100 : 0;

  return {
    teamId: CELTICS_ID,
    season: String(getCol("YEAR")),
    gamesPlayed: Number(getCol("GP")),
    wins: Number(getCol("WINS")),
    losses: Number(getCol("LOSSES")),
    winPct: Number(getCol("WIN_PCT")),
    confRank: getCol("CONF_RANK") !== null ? Number(getCol("CONF_RANK")) : null,
    divRank: getCol("DIV_RANK") !== null ? Number(getCol("DIV_RANK")) : null,
    poWins: getCol("PO_WINS") !== null ? Number(getCol("PO_WINS")) : null,
    poLosses: getCol("PO_LOSSES") !== null ? Number(getCol("PO_LOSSES")) : null,
    pts: Number(getCol("PTS")),
    fgm,
    fga,
    fgPct: Number(getCol("FG_PCT")) * 100,
    fg2m,
    fg2a,
    fg2Pct: Number(fg2Pct.toFixed(2)),
    fg3m,
    fg3a,
    fg3Pct: Number(getCol("FG3_PCT")) * 100,
    ftm: Number(getCol("FTM")),
    fta: Number(getCol("FTA")),
    ftPct: Number(getCol("FT_PCT")) * 100,
    oreb: Number(getCol("OREB")),
    dreb: Number(getCol("DREB")),
    reb: Number(getCol("REB")),
    ast: Number(getCol("AST")),
    stl: Number(getCol("STL")),
    blk: Number(getCol("BLK")),
    tov: Number(getCol("TOV")),
    pf: Number(getCol("PF")),
  };
}

(async () => {
  try {
    console.log(
      "🏀 Consultando estadísticas de temporada de Boston Celtics...",
    );
    const stats = await fetchCelticsSeasonTotals();

    console.log(`💾 Guardando registro para la temporada ${stats.season}...`);

    // Separamos teamId y season para el where del upsert
    const { teamId, season, ...updateFields } = stats;

    const record = await db.teamSeasonTotals.upsert({
      where: {
        season: season,
      },
      update: updateFields,
      create: stats,
    });

    console.log("✅ Registro actualizado correctamente en MongoDB:", {
      id: record.id,
      season: record.season,
      record: `${record.wins}-${record.losses} (${record.gamesPlayed} GP)`,
      fg: `${record.fgm}/${record.fga} (${record.fgPct.toFixed(1)}%)`,
      twoPt: `${record.fg2m}/${record.fg2a} (${record.fg2Pct.toFixed(1)}%)`,
      threePt: `${record.fg3m}/${record.fg3a} (${record.fg3Pct.toFixed(1)}%)`,
    });
  } catch (err) {
    console.error("❌ Error en la ejecución:", err);
  } finally {
    await db.$disconnect();
  }
})();
