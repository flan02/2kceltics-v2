export const current_season = process.env.CURRENT_SEASON as currentSeason

export const gameTypes = ["RS", "PO"]

export const stageTypes = ["RS", "CUP_GP", "CUP_QF", "CUP_SF", "CUP_THEFINAL", "FIRST_ROUND", "ESCF", "ECF", "FINALS"]

export const spanTypes = ["5", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55", "60", "65", "70", "75", "82"]

export const statTypes = ["TOTAL", "AVG"]

export const atHomeTypes = ["HOME", "AWAY"]

export const seasonTypes = ["NBA2K22", "NBA2K23", "NBA2K24", "NBA2K25"] as const // ! IN CASE OF ERRORS REMOVE (AS CONST)
const omitSeasons = new Set(["NBA2K22", "NBA2K23", "NBA2K24"])
export const graphicSeasons = seasonTypes.filter((season) => !omitSeasons.has(season))

export type currentSeason = typeof seasonTypes[number];

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
  82: "FIRST 82 GAMES"
};

export const SeasonSpans: number[] = [10, 20, 30, 40, 50, 60, 70, 82]

export const tokenSymbolToId: Record<string, string> = {
  ETH: 'ethereum',
  USDT: 'tether',
  USDC: 'usd-coin',
  AAVE: 'aave',
  UNI: 'uniswap',
  DAI: 'dai',
  LINK: 'chainlink',
  MATIC: 'matic-network',
  ARB: 'arbitrum',
  OP: 'optimism',
  // agregá más según tu app...
};

export interface AlchemyToken {
  network: string
  contractAddress: string;
  tokenBalance: number;
  tokenSymbol: string;
  tokenName?: string;
  tokenLogo: string;
  isMultichain: boolean;
}

export interface AggregatedToken extends Omit<AlchemyToken, "network" | "contractAddress"> {
  networks: string[];
};


export const ALCHEMY_RPC_URLS = {
  ethereum: "https://eth-mainnet.g.alchemy.com/v2/",
  polygon: "https://polygon-mainnet.g.alchemy.com/v2/",
  arbitrum: "https://arb-mainnet.g.alchemy.com/v2/",
  optimism: "https://opt-mainnet.g.alchemy.com/v2/",
  base: "https://base-mainnet.g.alchemy.com/v2/",
  zksync: "https://zksync-mainnet.g.alchemy.com/v2/"
};


export const NETWORK_LOGOS = {
  ethereum: "/crypto/eth-logo.png",
  polygon: "/crypto/polygon-logo.png",
  arbitrum: "/crypto/arbitrum-logo.png",
  optimism: "/crypto/optimism-logo.png",
  base: "/crypto/base-logo.png",
  zksync: "/crypto/zksync-logo.png"
}


export const AVAILABLE_NETWORKS = {
  ethereum: {
    rpc: "https://eth-mainnet.g.alchemy.com/v2/" + process.env.ALCHEMY_API_KEY!,
    chainId: 1,
  },
  polygon: {
    rpc: "https://polygon-rpc.com",
    chainId: 137,
  },
  arbitrum: {
    rpc: "https://arb1.arbitrum.io/rpc",
    chainId: 42161,
  },
  optimism: {
    rpc: "https://mainnet.optimism.io",
    chainId: 10,
  },
  base: {
    rpc: "https://mainnet.base.org",
    chainId: 8453,
  },
  zksync: {
    rpc: "https://mainnet.era.zksync.io",
    chainId: 324,
  },
};


// $ Multichain props should be generated in our backend
export const HOME_TOKENS = {
  "tokenBalances":
    [
      { "network": "ethereum", "contractAddress": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", "tokenBalance": 0.00000303, "tokenSymbol": "ETH", "tokenLogo": "/crypto/eth-logo.png", "isMultichain": true },
      { "network": "base", "contractAddress": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", "tokenBalance": 0.01000000, "tokenSymbol": "ETH", "tokenLogo": "/crypto/eth-logo.png", "isMultichain": true },
      { "network": "base", "contractAddress": "0x07865c6e87b9f70255377e024ace6630c1eaa37f", "tokenBalance": 100.00, "tokenSymbol": "USDC", "tokenLogo": "/crypto/usdc-logo.png", "isMultichain": false },
      { "network": "optimism", "contractAddress": "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58", "tokenBalance": 55.5, "tokenSymbol": "USDT", "tokenLogo": "https://static.alchemyapi.io/images/assets/825.png", "isMultichain": true },
      { "network": "arbitrum", "contractAddress": "0xFd086bC7CD5C481DCC9C85ebE5ea9C8952Ab963", "tokenBalance": 305, "tokenSymbol": "USDT", "tokenLogo": "https://static.alchemyapi.io/images/assets/825.png", "isMultichain": true },
      { "network": "arbitrum", "contractAddress": "0x912CE59144191C1204E64559FE8253a0e49E6548", "tokenBalance": 32.44, "tokenSymbol": "ARB", "tokenLogo": "/crypto/arbitrum-logo.png", "isMultichain": false },
      { "network": "ethereum", "contractAddress": "0xdac17f958d2ee523a2206206994597c13d831ec7", "tokenBalance": 1.34, "tokenSymbol": "USDT", "tokenLogo": "https://static.alchemyapi.io/images/assets/825.png", "isMultichain": true }
    ]
}

