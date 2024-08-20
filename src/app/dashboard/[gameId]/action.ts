"use server"
import { db } from "@/db";
import { Schedule } from "@prisma/client";

export async function updateScheduleGame(values: Omit<Schedule, "season" | "team1" | "team_code1" | "createdAt" | "updatedAt" | "boxscoreTeam1" | "boxscoreTeam2" | "gameStats" | "createdAt" | "updatedAt">) {
  const { id, ...rest } = values

  try {
    // console.log("Before sending bbdd", values);
    const response = await db.schedule.update({
      where: {
        id: values.id
      },
      data: {
        ...rest
      }
    })
    // console.log(response)
    return response

  } catch (error) {
    console.log(error);
    return error
  }
}