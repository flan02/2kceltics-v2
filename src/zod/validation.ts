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


export const updateTeamSchema = z.object({
  currentGame: z
    .string()
    .transform((value) => parseInt(value))
    .refine((value) => !isNaN(value), { message: "This field must be a number" }),
  season: z.enum(["NBA2K24", "NBA2K25", "NBA2K26", "NBA2K27", "NBA2K28"], { message: "This field can only be NBA2K24, NBA2K25, NBA2K26, NBA2K27, NBA2K28" }),
})


export const createGameSchema = z.object({
  season: z.string().regex(/NBA2K2[4-8]/, { message: "Season must be NBA2K24, NBA2K25, NBA2K26, NBA2K27, NBA2K28" }),
  type: z.enum(["RS", "PO"], { message: "Type must be RS, PO" }),
  stage: z.enum(["RS", "CUP_GP", "CUP_QF", "CUP_SF", "CUP_THEFINAL", "FIRST_ROUND", "ESCF", "ECF", "FINALS"], { message: "Stage must be RS, CUP_GP, CUP_QF, CUP_SF, CUP_THEFINAL, FIRST_ROUND, ESCF, ECF, FINALS" }),
  currentGame: z
    .string()
    .transform((value) => parseInt(value))
    .refine((value) => !isNaN(value), { message: "This field must be a number" }),
  athome: z.enum(["HOME", "AWAY"], { message: "This field must be HOME, AWAY" }),
  team1: z.string().regex(/Boston Celtics/, { message: "Team name must be Boston Celtics" }),
  team_code1: z.string().regex(/BOS/, { message: "Team code must be BOS" }),
  team2: z.string().min(2, { message: "Team name must be at least 2 characters" }),
  team_code2: z.string().max(3, { message: "Team code must be 3 characters" }),
})

/* 
season: NBA2K24
type: RS PO  (select option)
stage: RS ... PO ... (select option)
currentGame: int 1-110
atHome: HOME AWAY (select option)

team1: Boston Celtics
team2: "TEAM NAME"

team_code1: BOS
team_code2: "TEAM CODE"
*/