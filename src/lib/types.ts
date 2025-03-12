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

export const resultTypes = ["WIN", "LOSS"]

export const teamTypes = ["ATL", "BRO", "BOS", "CHI", "CHA", "CLE", "DAL", "DEN", "DET", "GSW", "HOU", "IND", "LAC", "LAL", "MEM", "MIA", "MIL", "MIN", "NOP", "NYK", "OKC", "ORL", "PHI", "PHX", "POR", "SAC", "SAS", "TOR", "UTA", "WAS"] as const;

export const teamWestTypes = ["DAL", "DEN", "GSW", "HOU", "LAC", "LAL", "MEM", "MIN", "NOP", "OKC", "PHX", "POR", "SAC", "SAS", "UTA"];
export const teamEastTypes = ["ATL", "BRO", "BOS", "CHI", "CHA", "CLE", "DET", "IND", "MIA", "MIL", "NYK", "ORL", "PHI", "TOR", "WAS"];


export type TeamType = typeof teamWestTypes | typeof teamEastTypes;

export type SeasonType = typeof seasonTypes

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

export type Platform = "twitch" | "youtube" | "twitter"

export type Token = {
  accessToken: string
  refreshToken: string
  expires_in: number
}