export const current_season = process.env.CURRENT_SEASON as currentSeason

export interface Task {
  id: string
  task: string
  description: string
  done: boolean
  createdAt: Date
  updatedAt: Date
}

export const gameTypes = ["RS", "PO"]
export const roundPlayoffs = ["First round", "Semi Finals", "Conf. Finals", "The Finals"]

export const stageTypes = ["RS", "CUP_GP", "CUP_QF", "CUP_SF", "CUP_THEFINAL", "FIRST_ROUND", "ESCF", "ECF", "FINALS"]
export const gamesMode = stageTypes.filter((s) => !["CUP_QF", "CUP_SF", "CUP_THEFINAL"].includes(s))

export const spanTypes = ["5", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55", "60", "65", "70", "75", "82"]

export const statTypes = ["TOTAL", "AVG"]

export const atHomeTypes = ["HOME", "AWAY"]

export const seasonTypes = ["NBA2K22", "NBA2K23", "NBA2K24", "NBA2K25", "NBA2K26"] as const // ! IN CASE OF ERRORS REMOVE (AS CONST)
const omitSeasons = new Set(["NBA2K22", "NBA2K23", "NBA2K24"])
export const graphicSeasons = seasonTypes.filter((season) => !omitSeasons.has(season))

export type currentSeason = typeof seasonTypes[number];

export const seasonReadOnly = ["NBA2K22", "NBA2K23", "NBA2K24", "NBA2K25", "NBA2K26"] as const

export const resultTypes = ["WIN", "LOSS"]

export const teamTypes = ["ATL", "BRO", "BOS", "CHI", "CHA", "CLE", "DAL", "DEN", "DET", "GSW", "HOU", "IND", "LAC", "LAL", "MEM", "MIA", "MIL", "MIN", "NOP", "NYK", "OKC", "ORL", "PHI", "PHX", "POR", "SAC", "SAS", "TOR", "UTA", "WAS"] as const;

export const teamWestTypes = ["DAL", "DEN", "GSW", "HOU", "LAC", "LAL", "MEM", "MIN", "NOP", "OKC", "PHX", "POR", "SAC", "SAS", "UTA"];
export const teamEastTypes = ["ATL", "BRO", "BOS", "CHI", "CHA", "CLE", "DET", "IND", "MIA", "MIL", "NYK", "ORL", "PHI", "TOR", "WAS"];


export type TeamType = typeof teamWestTypes | typeof teamEastTypes;

export type SeasonType = typeof seasonTypes
export type SeasonReadOnlyType = typeof seasonReadOnly

export const graphTypes = [
  { name: 'STATS', href: 'stats', disabled: false },
  { name: '???', href: '???', disabled: true }, // COMPARE
  { name: '???', href: '???', disabled: true }, // TWO DIMENSIONS
  { name: '???', href: '???', disabled: true } // DISTRIBUTION
  // { name: 'SCATTER PLOT', href: 'scatter-plot', disabled: true },
  // { name: 'PROJECTIONS', href: 'projections', disabled: true },
]

export type StatsResponse = {
  response: PlayerStatsType[];
};

export type GameSpan = {
  value: number | null;
  label: string;
}

export enum Round {
  FIRST_ROUND = "FIRST_ROUND",
  ECSF = "ECSF",
  WCSF = "WCSF",
  ECF = "ECF",
  WCF = "WCF",
  FINALS = "FINALS"
}

export type TwitchChannelFollowers = {
  total: number
  data: {
    user_id: string
    user_name: string
    user_login: string
    followed_at: string
  }[]
  pagination: {
    cursor: string
  }
}


export const playerImages2K25: Record<string, string> = {
  "J. Tatum": "/jt-profile.png",
  "J. Brown": "/jb-profile.png",
  "D. White": "/dw-profile.png",
  "K. Porzingis": "/kp-profile.png",
  "J. Holiday": "/jrue-profile.png",
  "A. Horford": "/al-profile.png",
  "P. Pritchard": "/pp-profile.png",
  "S. Hauser": "/sam-profile.png",
  "L. Kornet": "/kornet-profile.png",
  "N. Queta": "/queta-profile.png",
  "J. Walsh": "/walsh-profile.png",
  "X. Tillman Sr.": "/til-profile.png",
  "B. Scheierman": "/scheierman-profile.png",
  "J. Davison": "/jd-profile.png",
  "D. Peterson": "/peterson-profile.png",
  "T. Craig": "/craig-profile.png",
  "J. Minott": "/minott-profile.png",
  "L. Garza": "/garza-profile.png",
  "A. Simons": "/simons-profile.png",
  "C. Boucher": "/boucher-profile.png",
  "A. Williams": "/amari-profile.png",
  "H. Gonzalez": "/hugo-profile.png",
  "M. Shulga": "/schulga-profile.png",
  "R. Harper Jr.": "/ron-profile.png"
}

export type PlayerStatsType = {
  id: string;
  name: string;
  pos: string;
  stage: string;
  season: string;
  gamespan: number;
  gp: number;
  gs: number;
  min: number;
  pts: number;
  reb: number;
  ast: number;
  stl: number;
  blk: number;
  to: number;
  fls: number;
  fgPct: number;
  fgm: number;
  fga: number;
  tpPct: number;
  tpm: number;
  tpa: number;
  ftPct: number;
  ftm: number;
  fta: number;
  pa: number;
  ofgm: number;
  ofga: number;
  plusMinus: number;
}


export const fieldsToExclude = ["id", "season", "gamespan", "gp", "gs", "pos", "name", "stage"] // "ofgm", "ofga", "pa", "plusMinus"
export const percentageKeys: (keyof PlayerStatsType)[] = ['fgPct', 'tpPct', 'ftPct'];

export const fieldsMap: Record<string, string> = {
  "min": "Minutes",
  "pts": "Points",
  "reb": "Rebounds",
  "ast": "Assists",
  "stl": "Steals",
  "blk": "Blocks",
  "to": "Turnovers",
  "fls": "Fouls",
  "fgPct": "Field Goal %",
  "fgm": "Field Goals Made",
  "fga": "Field Goals Atte", // Attempted
  "tpPct": "3-Point %",
  "tpm": "3-Point Made",
  "tpa": "3-Point Atte",
  "ftPct": "Free Throws %",
  "ftm": "Free Throws Made",
  "fta": "Free Throws Atte",
  "pa": "Points Against",
  "ofgm": "Opp. FG Made",
  "ofga": "Opp. FG Atte",
  "plusMinus": "+/-",
  // Add more mappings as needed
}


export const multiplierMap: Record<string, string> = {
  "per game": "PER GAME",
  "total": "TOTAL"
}

export const gamespanMap: Record<number, string> = {
  10: "FIRST 10 GAMES",
  20: "FIRST 20 GAMES",
  30: "FIRST 30 GAMES",
  40: "FIRST 40 GAMES",
  50: "FIRST 50 GAMES",
  60: "FIRST 60 GAMES",
  70: "FIRST 70 GAMES",
  82: "FIRST 82 GAMES",
  1: "FIRST ROUND",
  2: "SEMI FINALS",
  3: "CONF. FINALS",
  4: "THE FINALS"
};

export const SeasonSpans: number[] = [10, 20, 30, 40, 50, 60, 70, 82]
export const PlayoffSpans: number[] = [1, 2, 3, 4]

export const roundLabels: Record<number, string> = {
  1: "FIRST ROUND",
  2: "SEMI FINALS",
  3: "CONF. FINALS",
  4: "THE FINALS",
};

