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
    // revalidatePath('/dashboard?opt=addteam')
    return response
  } catch (error) {
    console.log(error);
    return error
  }

}

export async function updateTeam(values: Team) {
  //console.log(values)
  const filteredData: Team = {
    name: "Boston Celtics",
    team_code: "BOS",
    logo_url: "/logos/BOS.png",
  }

  Object.keys(values).forEach(key => {
    if (values[key as keyof Team]?.trim() !== "") {
      filteredData[key as keyof Team]! = values[key as keyof Team] as string
    }
  })

  try {
    const response = db.team.update({
      where: {
        id: "66b4de0f0fa088d80a9b93d1"  // * Added manually
      },
      data: {
        ...filteredData
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