import { z } from "zod";


export const updateTeamSchema = z.object({
  currentGame: z
    .string()
    .transform((value) => parseInt(value))
    .refine((value) => !isNaN(value), { message: "This field must be a number" }),
  season: z.enum(["NBA2K24", "NBA2K25", "NBA2K26", "NBA2K27", "NBA2K28"], { message: "This field can only be NBA2K24, NBA2K25, NBA2K26, NBA2K27, NBA2K28" }),
})