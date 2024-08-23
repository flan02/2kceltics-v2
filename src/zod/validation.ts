import { z } from "zod";


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
  season: z.enum(["NBA2K24", "NBA2K25", "NBA2K26", "NBA2K27", "NBA2K28"], { message: "This field can only be NBA2K24, NBA2K25, NBA2K26, NBA2K27, NBA2K28" }),
})


export const createGameSchema = z.object({
  //season: z.string().regex(/NBA2K2[4-8]/, { message: "Season must be NBA2K24, NBA2K25, NBA2K26, NBA2K27, NBA2K28" }),
  season: z.enum(["NBA2K24"], { message: "Season must be NBA2K24, NBA2K25, NBA2K26, NBA2K27, NBA2K28" }),
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

})


export const updateGameSchema = z.object({
  id: z.string(),
  type: z.enum(["RS", "PO"], { message: "Season must be NBA2K24, NBA2K25, NBA2K26, NBA2K27, NBA2K28" }),
  stage: z.enum(["RS", "CUP_GP", "CUP_QF", "CUP_SF", "CUP_THEFINAL", "FIRST_ROUND", "ESCF", "ECF", "FINALS"], { message: "Stage must be RS, CUP_GP, CUP_QF, CUP_SF, CUP_THEFINAL, FIRST_ROUND, ESCF, ECF, FINALS" }),
  video_url: z.string().max(11, { message: "This field must contain only 11 characters" }),
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
  boxscoreTeam1: z.string({ message: "This field is a markdown text" }).optional(),
  boxscoreTeam2: z.string({ message: "This field is a markdown text" }).optional(),
  gameStats: z.string({ message: "This field is a markdown text" }).optional(),
  result: z.enum(["WIN", "LOSS"], { message: "Result must be WIN or LOSS" }).optional(),

})


export const filterGamesSchema = z.object({
  season: z.enum(["NBA2K22", "NBA2K23", "NBA2K24"]),
  type: z.enum(["RS", "PO"]).optional(),
  stage: z.enum(["RS", "CUP_GP", "CUP_QF", "CUP_SF", "CUP_THEFINAL", "FIRST_ROUND", "ESCF", "ECF", "FINALS"]).optional(),
  atHome: z.enum(["HOME", "AWAY"]).optional(),
  result: z.enum(["WIN", "LOSS"]).optional(),
})

