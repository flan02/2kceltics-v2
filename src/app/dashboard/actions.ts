"use server"

import { db } from "@/db"
import { Season2k } from "@prisma/client"
import { revalidatePath } from "next/cache"

type Team = {
  name: string
  team_code: string
  logo_url: string
}


export async function getTeam(team: string) {
  try {
    const response = await db.team.findFirst({
      where: {
        team_code: team
      },
      select: {
        id: true,
        name: true,
        team_code: true,
      }
    })
    return response
  } catch (error) {
    console.log(error);
    return error

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

export async function updateTeam(values: Omit<Season2k, "id" | "teamId" | "season" | "createdAt" | "updatedAt">) {
  try {
    const team: any = await getTeam("BOS")

    // * I need bring [id,teamId,season,total_games] from server actions calling a fc inside this fc
    console.log("Before filter", values)

    const filteredData: any = {}

    Object.keys(values).forEach((key) => {
      const value = values[key as keyof typeof values];
      if (typeof value === 'string' && value.trim() !== '') {
        (filteredData[key as keyof typeof values] as string) = value;
      } else if (typeof value === 'number') {
        (filteredData[key as keyof typeof values] as number) = value;
      }
    });

    console.log("After Filter", filteredData)

    const updateTeam = await db.season2k.update({
      where: {
        id: "66bb7d42178533af7ee9d735", // * Added manually
        teamId: team.id
      },
      data: {
        ...filteredData
      }
    })
    // revalidatePath('/dashboard?opt=editteam')
    return updateTeam

  } catch (error) {
    console.log(error);
    return error;
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



export async function getSeasons2k() {
  try {
    const response = db.season2k.findMany()
    return response
  } catch (error) {
    console.log(error);
    return error
  }
}