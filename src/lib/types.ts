

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