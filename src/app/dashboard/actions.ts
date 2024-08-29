"use server"


import { updateProps } from "@/components/custom/dashboard/UpdateScheduleGame"
import { db } from "@/db"
import { Schedule, Season, Season2k } from "@prisma/client"
import { revalidatePath } from "next/cache"



type Team = {
  name: string
  team_code: string
  logo_url: string
}

export async function getKindeUser(kindeId: string) {
  try {
    const response = await db.user.findUnique({
      where: {
        kindeId
      }, select: {
        id: true,
        email: true,
        given_name: true,
        picture: true,
        kindeId: true,
      }
    })
    return response
  } catch (error) {
    console.log(error);
    return error
  }
}

export async function createNewSeason(values: Omit<Season2k, "id" | "createdAt" | "updatedAt">) {
  try {
    const response = db.season2k.create({
      data: {
        ...values
      }
    })
    revalidatePath('/dashboard?opt=addseason')
    return response
  } catch (error) {
    console.log(error);
    return error
  }
}

export async function getSeason2k(season: Season) {
  try {
    const response = db.season2k.findFirst({
      where: {
        season
      },
      select: {
        id: true,
        season: true,
        teamId: true,
      }
    })
    return response
  } catch (error) {
    console.log(error);
    return error
  }
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

export async function updateTeam(values: Omit<Season2k, "id" | "teamId" | "createdAt" | "updatedAt">) {
  try {
    // TODO -> First we call to database retrieving our team id
    const data: any = await getSeason2k(values.season as Season)
    console.log(data)


    const filteredData: any = {}

    Object.keys(values).forEach((key) => {
      const value = values[key as keyof typeof values];
      if (typeof value === 'string' && value.trim() !== '') {
        (filteredData[key as keyof typeof values] as string) = value;
      } else if (typeof value === 'number') {
        (filteredData[key as keyof typeof values] as number) = value;
      }
    });

    const updateTeam = db.season2k.update({
      where: {
        id: data.id
      },
      data: {
        ...filteredData
      }
    })

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



export async function getSeasons2k(season: any) {
  try {
    const response = db.season2k.findMany(
      {
        where: {
          season
        },
        select: {
          season: true,
          total_games: true,
        }
      },

    )
    //console.log(response)
    return response
  } catch (error) {
    console.log(error);
    return error
  }
}


export async function getScheduleGame(values: updateProps) {
  try {
    const response = db.schedule.findFirst({
      where: {
        currentGame: values.currentGame,
        season: values.season as "NBA2K24"
      },
      select: {
        id: true
      }
    })

    return response

  } catch (error) {
    console.log(error)
    return error
  }
}


export async function createScheduleGame(values: Omit<Schedule, "id" | "createdAt" | "updatedAt" | "video_url" | "gameStats" | "scoreTeam1" | "scoreTeam2" | "boxscoreTeam1" | "boxscoreTeam2" | "result">) {

  try {
    const response = db.schedule.create({
      data: {
        ...values
      }
    })

    revalidatePath('/dashboard?opt=schedule')
    return response
  } catch (error) {
    console.log(error)
    return error
  }
}


export async function getCurrentGame() {
  const response = await db.schedule.findMany({
    where: {
      season: "NBA2K24",
      currentGame: { gt: 0 }
    },
    select: {
      currentGame: true,
      stage: true,
    }
  })

  const currentGame: number = response.length - 1


  return response[currentGame]
}