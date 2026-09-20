export {};

const CELTICS_TEAM_ID = "1610612738";

const NBA_HEADERS = {
  Host: "stats.nba.com",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  Accept: "application/json, text/plain, */*",
  "Accept-Language": "en-US,en;q=0.9",
  "Accept-Encoding": "gzip, deflate, br",
  Referer: "https://www.nba.com/",
  Origin: "https://www.nba.com",
  Connection: "keep-alive",
  "x-nba-stats-origin": "stats",
  "x-nba-stats-token": "true",
};

async function getCelticsSeasonTotals() {
  const url = new URL("https://stats.nba.com/stats/teamyearbyyearstats");
  url.searchParams.set("TeamID", CELTICS_TEAM_ID);
  url.searchParams.set("SeasonType", "Regular Season");
  url.searchParams.set("PerMode", "Totals");
  url.searchParams.set("LeagueID", "00");

  console.log("🏀 Consultando stats oficiales de Boston Celtics...");

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: NBA_HEADERS,
    });

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    // La API devuelve un array 'resultSets'. El principal suele ser 'TeamStats'
    const teamStatsSet =
      data.resultSets?.find((res: any) => res.name === "TeamStats") ||
      data.resultSets?.[0];

    if (!teamStatsSet) {
      throw new Error(
        "No se encontró el resultSet de estadísticas del equipo.",
      );
    }

    const headers = teamStatsSet.headers;
    const rows = teamStatsSet.rowSet;

    // Tomamos la última temporada disponible (última fila)
    const latestSeasonRow = rows[rows.length - 1];

    // Helper para mapear encabezado -> valor
    const getStat = (columnName: any) => {
      const index = headers.indexOf(columnName);
      return index !== -1 ? latestSeasonRow[index] : null;
    };

    const seasonYear = getStat("YEAR");
    const gamesPlayed = getStat("GP");
    const wins = getStat("WINS");
    const losses = getStat("LOSSES");

    // Totales de Campo (FG)
    const fgm = Number(getStat("FGM"));
    const fga = Number(getStat("FGA"));
    const fgPct = Number(getStat("FG_PCT")) * 100;

    // Triples (3PT)
    const fg3m = Number(getStat("FG3M"));
    const fg3a = Number(getStat("FG3A"));
    const fg3Pct = Number(getStat("FG3_PCT")) * 100;

    // Dobles (2PT calculados por resta)
    const fg2m = fgm - fg3m;
    const fg2a = fga - fg3a;
    const fg2Pct = fg2a > 0 ? (fg2m / fg2a) * 100 : 0;

    const summary = {
      team: "Boston Celtics",
      season: seasonYear,
      record: `${wins}-${losses} (${gamesPlayed} GP)`,
      fieldGoals: {
        made: fgm,
        attempted: fga,
        pct: `${fgPct.toFixed(1)}%`,
        display: `${fgm}/${fga}`,
      },
      twoPointers: {
        made: fg2m,
        attempted: fg2a,
        pct: `${fg2Pct.toFixed(1)}%`,
        display: `${fg2m}/${fg2a}`,
      },
      threePointers: {
        made: fg3m,
        attempted: fg3a,
        pct: `${fg3Pct.toFixed(1)}%`,
        display: `${fg3m}/${fg3a}`,
      },
    };

    console.log("\n✅ Datos obtenidos con éxito:");
    console.dir(summary, { depth: null });

    return summary;
  } catch (error) {
    console.error("❌ Error al obtener las estadísticas:", error);
  }
}

getCelticsSeasonTotals();
