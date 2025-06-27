export const LimitPoints = {
  NOT_RANKED: 1,
  ROOKIE: 100,
  BENCHER: 200,
  SIXTH_MAN: 500,
  STARTER: 1000,
  ALL_STAR: 3500,
  HALL_OF_FAME: 5000
} as const

export type LimitPoints = typeof LimitPoints
export type TierNames = keyof typeof LimitPoints // Esto te devuelve los nombres 'rookie' | 'bencher' | ...
export type LimitPointsType = typeof LimitPoints[TierNames] // Esto devuelve los valores 100 | 200 | 500...

export const gameTypes = ["RS", "PO"]

export const stageTypes = ["RS", "CUP_GP", "CUP_QF", "CUP_SF", "CUP_THEFINAL", "FIRST_ROUND", "ESCF", "ECF", "FINALS"]

export const spanTypes = ["5", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55", "60", "65", "70", "75", "82"]

export const statTypes = ["TOTAL", "AVG"]

export const atHomeTypes = ["HOME", "AWAY"]

export const seasonTypes = ["NBA2K22", "NBA2K23", "NBA2K24", "NBA2K25"]


const omitSeasons = new Set(["NBA2K22", "NBA2K23", "NBA2K24"])
export const graphicSeasons = seasonTypes.filter((season) => !omitSeasons.has(season))

export const seasonReadOnly = ["NBA2K22", "NBA2K23", "NBA2K24", "NBA2K25"] as const


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

export type UserSession = {
  id?: string
  email?: string
  name?: string
  nickname?: string
  totalPoints?: number
  tier?: TierNames
  image?: string
  createdAt: Date
  premium?: boolean
  twitchUser?: string
  youtubeUser?: string
  twitterUser?: string
  newsletter?: boolean
}

export type SOCIAL_MEDIA = "twitch" | "youtube" | "twitter"

export type TokenBody = {
  access_token: string
  refresh_token: string
  expires_in: number
  generatedAt: number
  user_id: string
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

// BROADCASTER INFO
// data: [
//   {
//     id: '1284419660',
//     login: 'xbox_dan',
//     display_name: 'xbox_dan',
//     type: '',
//     broadcaster_type: '',
//     description: '',
//     profile_image_url: 'https://static-cdn.jtvnw.net/user-default-pictures-uv/41780b5a-def8-11e9-94d9-784f43822e80-profile_image-300x300.png',
//     offline_image_url: '',
//     view_count: 0,
//     created_at: '2025-03-20T14:12:38Z'
//   }
// ]

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
  "T. Craig": "/craig-profile.png"
}

export type PlayerStatsType = {
  id: string;
  name: string;
  pos: string;
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


export const fieldsToExclude = ["id", "season", "gamespan", "gp", "gs", "pos", "name"] // "ofgm", "ofga", "pa", "plusMinus"
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
  "fga": "Field Goals Attempted",
  "tpPct": "3-Point %",
  "tpm": "3-Point Made",
  "tpa": "3-Point Attempted",
  "ftPct": "Free Throws %",
  "ftm": "Free Throws Made",
  "fta": "Free Throws Att",
  "pa": "Points Against",
  "ofgm": "Opp. FG Made",
  "ofga": "Opp. FG Att",
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
  82: "FIRST 82 GAMES"
};

export const SeasonSpans: number[] = [10, 20, 30, 40, 50, 60, 70, 82]
