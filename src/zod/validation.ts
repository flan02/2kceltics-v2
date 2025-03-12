
import { seasonTypes, teamEastTypes, teamTypes, teamWestTypes } from "@/lib/types";
import { z } from "zod";

export const createNewSeasonSchema = z.object({
  teamId: z.string().min(24, { message: "Team ID must be 24 characters" }).max(24, { message: "Team ID must be 24 characters" }),
  season: z.enum(["NBA2K21", "NBA2K22", "NBA2K23", "NBA2K24", "NBA2K25"]),
  total_games: z.string().optional(),
  players: z.string({ message: "Markdown table format" }).optional(),
  standings: z.string().optional(),
  team_record: z.string().optional(),
  playoffs_record: z.string().optional(),
})

export const createNewGameStatSchema = z.object({
  season: z.enum(["NBA2K21", "NBA2K22", "NBA2K23", "NBA2K24", "NBA2K25"]),
  type: z.enum(["RS", "PO"]),
  stage: z.enum(["RS", "CUP_GP", "CUP_QF", "CUP_SF", "CUP_THEFINAL", "FIRST_ROUND", "ESCF", "ECF", "FINALS"]),
  span: z.enum(["5", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55", "60", "65", "70", "75", "82"]).optional(),
  statType: z.enum(["TOTAL", "AVG"]),
  gamestat: z.string({ message: "Markdown table format" })
})

export const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  team_code: z.string().max(3, {
    message: "Team code must be 3 characters.",
  }),
  logo_url: z.string({ message: "Current path is /public/logos/[team_code].png" })
})

export const editTeamSchema = z.object({
  season: z.enum(["NBA2K22", "NBA2K23", "NBA2K24", "NBA2K25"]),
  total_games: z.string().nullable(),
  players: z.string({ message: "Markdown table format" }).nullable(),
  standings: z.string().nullable(),
  team_record: z.string().nullable(),
  playoffs_record: z.string().nullable(),
})



export const updateTeamSchema = z.object({
  currentGame: z
    .string()
    .transform((value) => parseInt(value))
    .refine((value) => !isNaN(value), { message: "This field must be a number" }),
  season: z.enum(["NBA2K22", "NBA2K23", "NBA2K24", "NBA2K25"])
})


export const createGameSchema = z.object({
  season: z.enum(["NBA2K22", "NBA2K23", "NBA2K24", "NBA2K25"]),
  type: z.enum(["RS", "PO"], {
    errorMap: () => ({ message: "Selecciona una opción válida: RS o PO" }),
  }),
  stage: z.enum(["RS", "CUP_GP", "CUP_QF", "CUP_SF", "CUP_THEFINAL", "FIRST_ROUND", "ESCF", "ECF", "FINALS"], { message: "Stage must be RS, CUP_GP, CUP_QF, CUP_SF, CUP_THEFINAL, FIRST_ROUND, ESCF, ECF, FINALS" }),
  currentGame: z
    .string()
    .transform((value) => parseInt(value))
    .refine((value) => !isNaN(value), { message: "This field must be a number" }),
  atHome: z.enum(["HOME", "AWAY"], { message: "This field must be HOME, AWAY" }),
  team1: z.string().regex(/Boston Celtics/, { message: "Team name must be Boston Celtics" }),
  team_code1: z.string().regex(/BOS/, { message: "Team code must be BOS" }),
  team2: z.string().min(2, { message: "Team name must be at least 2 characters" }),
  team_code2: z.string().max(3, { message: "Team code must be 3 characters" }),
  playoffGame: z.string({ message: "Example R1G1" })
})


export const updateGameSchema = z.object({
  id: z.string(),
  type: z.enum(["RS", "PO"]),
  stage: z.enum(["RS", "CUP_GP", "CUP_QF", "CUP_SF", "CUP_THEFINAL", "FIRST_ROUND", "ESCF", "ECF", "FINALS"], { message: "Stage must be RS, CUP_GP, CUP_QF, CUP_SF, CUP_THEFINAL, FIRST_ROUND, ESCF, ECF, FINALS" }),
  video_url: z.string().min(11, { message: "This field must contain only 11 characters" }).max(11, { message: "This field must contain only 11 characters" }),
  atHome: z.enum(["HOME", "AWAY"], { message: "This field must be HOME, AWAY" }),
  currentGame: z.number().int().min(1, { message: "Current game must be between 1 a 100" }).max(110, { message: "Current game must be between 1 a 100" }),
  team2: z.string().min(2, { message: "Team name must be at least 2 characters" }),
  team_code2: z.string().max(3, { message: "Team code must be 3 characters" }),
  scoreTeam1: z
    .string()
    .transform((value) => parseInt(value))
    .refine((value) => !isNaN(value), { message: "This field must be a number" }),
  scoreTeam2: z
    .string()
    .transform((value) => parseInt(value))
    .refine((value) => !isNaN(value), { message: "This field must be a number" }),
  boxscoreTeam1: z.string({ message: "This field is a markdown text" }).nullable(),
  boxscoreTeam2: z.string({ message: "This field is a markdown text" }).nullable(),
  gameStats: z.string({ message: "This field is a markdown text" }).nullable(),
  playoffGame: z.string({ message: "Example R1G1" }).nullable(),
  result: z.enum(["WIN", "LOSS"], { message: "Result must be WIN or LOSS" }),

})

const unionType = z.union([
  z.literal("RS"),
  z.literal("PO"),
  z.array(z.union([z.literal("RS"), z.literal("PO")])),
])

export const filterGamesSchema = z.object({
  season: z.enum(["NBA2K22", "NBA2K23", "NBA2K24", "NBA2K25"]),
  type: unionType,
  stage: z.enum(["RS", "CUP_GP", "CUP_QF", "CUP_SF", "CUP_THEFINAL", "FIRST_ROUND", "ESCF", "ECF", "FINALS"]).optional(),
  atHome: z.enum(["HOME", "AWAY"]).optional(),
  result: z.enum(["WIN", "LOSS"]).optional(),
})


const seasonSchema = z.enum([...seasonTypes] as [string, ...string[]], { message: "Insert a valid season" })

const createSeedSchema = async (teamTypes: string[]) =>
  z.enum([...teamTypes] as [string, ...string[]], { message: "Insert a valid team" });

const generateSeedFields = (teamTypes: string[], prefix: string) => {
  const seeds: Record<string, any> = {};
  for (let i = 1; i <= 8; i++) {
    seeds[`${prefix}_${i}`] = createSeedSchema(teamTypes);
  }
  return seeds;
};


export const createPlayoffsSchema = z.object({
  season: seasonSchema,
  seed_west_1: z.enum([...teamWestTypes] as [string, ...string[]], { message: "Insert a valid team" }),
  seed_west_2: z.enum([...teamWestTypes] as [string, ...string[]], { message: "Insert a valid team" }),
  seed_west_3: z.enum([...teamWestTypes] as [string, ...string[]], { message: "Insert a valid team" }),
  seed_west_4: z.enum([...teamWestTypes] as [string, ...string[]], { message: "Insert a valid team" }),
  seed_west_5: z.enum([...teamWestTypes] as [string, ...string[]], { message: "Insert a valid team" }),
  seed_west_6: z.enum([...teamWestTypes] as [string, ...string[]], { message: "Insert a valid team" }),
  seed_west_7: z.enum([...teamWestTypes] as [string, ...string[]], { message: "Insert a valid team" }),
  seed_west_8: z.enum([...teamWestTypes] as [string, ...string[]], { message: "Insert a valid team" }),
  seed_east_1: z.enum([...teamEastTypes] as [string, ...string[]], { message: "Insert a valid team" }),
  seed_east_2: z.enum([...teamEastTypes] as [string, ...string[]], { message: "Insert a valid team" }),
  seed_east_3: z.enum([...teamEastTypes] as [string, ...string[]], { message: "Insert a valid team" }),
  seed_east_4: z.enum([...teamEastTypes] as [string, ...string[]], { message: "Insert a valid team" }),
  seed_east_5: z.enum([...teamEastTypes] as [string, ...string[]], { message: "Insert a valid team" }),
  seed_east_6: z.enum([...teamEastTypes] as [string, ...string[]], { message: "Insert a valid team" }),
  seed_east_7: z.enum([...teamEastTypes] as [string, ...string[]], { message: "Insert a valid team" }),
  seed_east_8: z.enum([...teamEastTypes] as [string, ...string[]], { message: "Insert a valid team" }),
})

export const TokenSetSchema = z.object({
  accessToken: z.string().min(1, "accessToken is required"),
  refreshToken: z.string().min(1, "refreshToken is required"),
  expires_in: z.date(),
});

/*
export const generatePlayoffsSchema = async (): Promise<z.ZodObject<any>> => {
  return z.object({
    season: seasonSchema,
    ...generateSeedFields(teamWestTypes, "seed_west"),
    ...generateSeedFields(teamEastTypes, "seed_east"),
  });
}
*/

const seasons2k = ["NBA2K22", "NBA2K23", "NBA2K24", "NBA2K25"] as const;
/* 
    id: seed.id,
    wins: seed.wins,
    team_code: seed.team_code,
    position: seed.position,
    losses: seed.losses,
    disabled: false,
    eliminated: seed.eliminated
*/
export const getPlayoffsDataSchema = z.object({
  season: z.enum(seasons2k, { message: "Season must be NBA2K22, NBA2K23, NBA2K24, NBA2K25" })
})


const updateSeedProps = {
  id: z.string(),
  wins: z.number().optional(),
  losses: z.number().optional(),
  position: z.string().optional(),
  eliminated: z.boolean(),
  playoffsId: z.string(),
  conference: z.enum(["WEST", "EAST"])
}

/*
const updateSeedSchema = (teamTypes: string[], prefix: string) => {
  const seeds: Record<string, any> = {};
  for (let i = 1; i <= 8; i++) {
    seeds[`${prefix}_${i}`] = z.object(updateSeedProps);
  }
  return seeds;
}

const generateUpdateSeedFields = (teamTypes: string[]) => {
  const seeds: Record<string, any> = {};
  seeds["west"] = z.object(updateSeedSchema(teamWestTypes, "seed_west"));
  seeds["east"] = z.object(updateSeedSchema(teamEastTypes, "seed_east"));
  return seeds;
}
*/




export const updateSeedSchema = z.object({
  seed_WEST_1: z.object(updateSeedProps),
  seed_WEST_2: z.object(updateSeedProps),
  seed_WEST_3: z.object(updateSeedProps),
  seed_WEST_4: z.object(updateSeedProps),
  seed_WEST_5: z.object(updateSeedProps),
  seed_WEST_6: z.object(updateSeedProps),
  seed_WEST_7: z.object(updateSeedProps),
  seed_WEST_8: z.object(updateSeedProps),
  seed_EAST_1: z.object(updateSeedProps),
  seed_EAST_2: z.object(updateSeedProps),
  seed_EAST_3: z.object(updateSeedProps),
  seed_EAST_4: z.object(updateSeedProps),
  seed_EAST_5: z.object(updateSeedProps),
  seed_EAST_6: z.object(updateSeedProps),
  seed_EAST_7: z.object(updateSeedProps),
  seed_EAST_8: z.object(updateSeedProps),
})


/* 
seed_west_1: z.enum([...teamWestTypes] as [string, ...string[]], { message: "Insert a valid team" }),
  seed_west_2: z.enum([...teamWestTypes] as [string, ...string[]], { message: "Insert a valid team" }),
  seed_west_3: z.enum([...teamWestTypes] as [string, ...string[]], { message: "Insert a valid team" }),
  seed_west_4: z.enum([...teamWestTypes] as [string, ...string[]], { message: "Insert a valid team" }),
  seed_west_5: z.enum([...teamWestTypes] as [string, ...string[]], { message: "Insert a valid team" }),
  seed_west_6: z.enum([...teamWestTypes] as [string, ...string[]], { message: "Insert a valid team" }),
  seed_west_7: z.enum([...teamWestTypes] as [string, ...string[]], { message: "Insert a valid team" }),
  seed_west_8: z.enum([...teamWestTypes] as [string, ...string[]], { message: "Insert a valid team" }),
  seed_east_1: z.enum([...teamEastTypes] as [string, ...string[]], { message: "Insert a valid team" }),
  seed_east_2: z.enum([...teamEastTypes] as [string, ...string[]], { message: "Insert a valid team" }),
  seed_east_3: z.enum([...teamEastTypes] as [string, ...string[]], { message: "Insert a valid team" }),
  seed_east_4: z.enum([...teamEastTypes] as [string, ...string[]], { message: "Insert a valid team" }),
  seed_east_5: z.enum([...teamEastTypes] as [string, ...string[]], { message: "Insert a valid team" }),
  seed_east_6: z.enum([...teamEastTypes] as [string, ...string[]], { message: "Insert a valid team" }),
  seed_east_7: z.enum([...teamEastTypes] as [string, ...string[]], { message: "Insert a valid team" }),
  seed_east_8: z.enum([...teamEastTypes] as [string, ...string[]], { message: "Insert a valid team" }),
*/