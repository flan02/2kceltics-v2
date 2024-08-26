"use server"
import { db } from "@/db";
import { Schedule } from "@prisma/client";

export async function updateScheduleGame(values: Omit<Schedule, "season" | "team1" | "team_code1" | "createdAt" | "updatedAt">) {
  const { id, ...rest } = values
  const filteredData = Object.fromEntries(Object.entries(rest).filter(([key, value]) => value !== undefined && value !== null && value !== ""))

  try {
    // console.log("Before sending bbdd", values);
    const updateGame = await db.schedule.update({
      where: {
        id
      },
      data: filteredData
    })
    // console.log(response)
    return updateGame

  } catch (error) {
    console.log(error);
    return error
  }
}