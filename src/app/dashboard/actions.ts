"use server"

import { db } from "@/db"
import { revalidatePath } from "next/cache"

type Team = {
  name: string
  team_code: string
  logo_url: string
  players?: string
  standings?: string
  team_record?: string
}

export async function createTeam({ name, team_code, logo_url, players, standings, team_record }: Team) {
  try {
    // console.log(name, team_code, logo_url, players);
    const response = db.team.create({
      data: {
        name,
        team_code,
        logo_url,
        players,
        standings,
        team_record
      }
    })
    return response
  } catch (error) {
    console.log(error);
    return error
  }

}


export async function createTask(task: string, done?: boolean) {
  try {
    const response = db.task.create({
      data: {
        task
      }
    })
    revalidatePath('/dashboard')
    return response
  } catch (error) {
    console.log(error);
    return error
  }
}


export async function getTasks() {
  try {
    const response = (await db.task.findMany({ take: -10 })).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    return response
  } catch (error) {
    console.log(error);
    return error
  }
}


export async function updateTask(id: string, done: boolean, task?: string) {
  try {
    const response = db.task.update({
      where: {
        id
      },
      data: {
        task,
        done
      }
    })
    revalidatePath('/dashboard')
    return response
  } catch (error) {
    console.log(error);
    return error
  }
}