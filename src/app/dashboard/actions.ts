"use server"

import { db } from "@/db"
import { revalidatePath } from "next/cache"

type Team = {
  name: string
  team_code: string
  logo_url: string
}

type TeamUpdate = {
  seasons2k: {
    season: string
    total_games: number
    players?: string
    standings?: string
    team_record?: string
    playoffs_record?: string
  }

}


export async function createTeam({ name, team_code, logo_url }: Team) {
  try {
    // console.log(name, team_code, logo_url, players);
    const response = db.team.create({
      data: {
        name,
        team_code,
        logo_url,
      }
    })
    // revalidatePath('/dashboard?opt=addteam')
    return response
  } catch (error) {
    console.log(error);
    return error
  }

}

export async function updateTeam(values: TeamUpdate) {
  console.log("Before filter", values)

  const filteredData: TeamUpdate = {
    seasons2k: {
      season: "NBA2K24",
      total_games: 0
    }
  }

  Object.keys(values.seasons2k).forEach((key) => {
    const value = values.seasons2k[key as keyof typeof values.seasons2k];
    if (typeof value === 'string' && value.trim() !== '') {
      (filteredData.seasons2k[key as keyof typeof values.seasons2k] as string) = value;
    } else if (typeof value === 'number') {
      (filteredData.seasons2k[key as keyof typeof values.seasons2k] as number) = value;
    }
  });

  console.log("After Filter", filteredData)

  // * I need to pass the id of the team to update from client component (server function drill props)
  /*try {
    const response = db.team.update({
      where: {
        id: "66b4de0f0fa088d80a9b93d1",

      },
      data: {
        seasons2k: { ...filteredData.seasons2k }
      }

    })
    return response
  } catch (error) {
    console.log(error);
    return error

  }
*/

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