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

interface ShotData {
  game_id: string;
  player_id: number;
  player_name: string;
  period: number;
  minutes_remaining: number;
  seconds_remaining: number;
  event_type: string; // "Made Shot" | "Missed Shot"
  action_type: string; // ej: "Jump Shot", "Pullup Jump shot", "Fadeaway"
  shot_type: string; // "2PT Field Goal" | "3PT Field Goal"
  shot_distance: number; // Distancia en pies (ft)
  loc_x: number; // Coordenada X (-250 a 250)
  loc_y: number; // Coordenada Y (-50 a 400+)
}

async function fetchGameShots(
  gameId: string,
  season: string = "2024-25",
): Promise<ShotData[]> {
  const params = new URLSearchParams({
    LeagueID: "00",
    Season: season,
    SeasonType: "Regular Season",
    TeamID: CELTICS_ID.toString(),
    PlayerID: "0", // 0 = todos los jugadores del equipo
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
    ContextMeasure: "FGA", // Field Goals Attempted (trae anotados y errados)
  });

  const url = `https://stats.nba.com/stats/shotchartdetail?${params.toString()}`;
  const res = await fetch(url, { headers: NBA_HEADERS });

  if (!res.ok) throw new Error(`Error en ShotChartDetail: ${res.status}`);

  const data: any = await res.json();
  const dataset = data.resultSets.find(
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
    event_type: String(getCol(row, "EVENT_TYPE")), // "Made Shot" o "Missed Shot"
    action_type: String(getCol(row, "ACTION_TYPE")),
    shot_type: String(getCol(row, "SHOT_TYPE")),
    shot_distance: Number(getCol(row, "SHOT_DISTANCE")),
    loc_x: Number(getCol(row, "LOC_X")), // Eje horizontal respecto al aro
    loc_y: Number(getCol(row, "LOC_Y")), // Distancia perpendicular al aro
  }));
}

(async () => {
  // Probamos con el partido que ya descargaste antes
  const testGameId = "0022400021";
  console.log(`Descargando mapa de tiros para el partido ${testGameId}...`);

  const shots = await fetchGameShots(testGameId);
  console.log(`Se descargaron ${shots.length} tiros en total.`);

  // Mostramos los primeros 5 tiros de muestra
  console.table(shots.slice(0, 5), [
    "player_name",
    "event_type",
    "shot_distance",
    "loc_x",
    "loc_y",
    "action_type",
  ]);
})();
