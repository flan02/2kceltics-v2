"use server"

import { GameStatProps } from "@/components/custom/dashboard/AddPlayerStatsForm"
import { updateProps } from "@/components/custom/dashboard/UpdateScheduleGame"
import { db } from "@/db"
import { SeasonType, seasonTypes } from "@/lib/types"
import { Conference, Schedule, Season, Season2k, StatType, Tournament, Stage } from "@prisma/client"
import { revalidatePath } from "next/cache"




type Team = {
  name: string
  team_code: string
  logo_url: string
}

export async function loggedAsAdmin(email: string) {
  //console.log("loggedAsAdmin", id);
  try {
    const isAdmin = await db.user.findFirst({
      where: {
        email
      }
    })

    //console.log('isAdmin', isAdmin);
    if (!isAdmin) return null

    return isAdmin
  } catch (error) {
    console.error("We found the following error: ", error)
    return null
  }
}

export async function createUser(name: string, email: string, image: string) {
  try {
    const newUser = await db.user.create({
      data: {
        name,
        email,
        image
      }

    })
    return true
  } catch (error) {
    console.error("We found an error creating this new user: ", error)
    return { message: "We found an error creating this new user", status: 500 }
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
    //console.log(data)


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
  const currentSeason = process.env.CURRENT_SEASON as Season
  const response = await db.schedule.findMany({
    where: {
      season: currentSeason,
      currentGame: { gt: 0 }
    },
    select: {
      currentGame: true,
      stage: true,
      type: true,
      playoffGame: true,
      team2: true,
    }
  })

  const currentGame: number = response.length - 1


  return response[currentGame]
}


interface Seed {
  team_code: string
  position: number
  conference: string
}



export async function createNewPlayoffs(data: any) {

  //console.log(data)
  /* 
  console.log(data.season)
  const filteredData: any = {}
  Object.keys(data).forEach((key) => {
    const value = data[key as keyof typeof data];
    if (typeof value === 'string' && value.trim() !== '') {
      (filteredData[key as keyof typeof data] as string) = value;
    } else if (typeof value === 'number') {
      (filteredData[key as keyof typeof data] as number) = value;
    }
  });
  */

  let WEST: any = []
  let EAST: any = []
  let season: any
  data.forEach((value: any, key: any) => {
    //console.log(key, value)
    if (key.includes("west")) {
      WEST.push(value)
    }
    if (key.includes("east")) {
      EAST.push(value)
    }
    if (key.includes("season")) {
      season = value
    }

  })

  //console.log(WEST)
  //console.log(WEST[0])

  let west: Seed[] = [];
  let east: Seed[] = [];
  for (let i = 0; i < WEST.length; i++) {
    west[i] = {
      team_code: WEST[i],
      position: i + 1,
      conference: "WEST",
    }
  }

  //console.log(west)

  for (let i = 0; i < EAST.length; i++) {
    east[i] = {
      team_code: EAST[i],
      position: i + 1,
      conference: "EAST",
    }
  }

  //console.log(east)

  const conference = [...west, ...east]


  try {
    const response = await db.playoffs.create({
      data: {
        season,
        champ: "",
        mvp: "",
      }
    })

    const playoffs = await db.playoffs.findFirst({
      where: {
        season
      },
      select: {
        id: true
      }
    })


    if (playoffs?.id) await createSeeds(conference, playoffs.id)


  } catch (error) {
    console.log(error)
    return error
  }
}


export async function getPlayoffs(season: any) {
  try {
    const response = await db.playoffs.findFirst({
      where: {
        season
      },
      select: {
        id: true,
        gamesPlayed: true,
      }
    })
    return response
  } catch (error) {
    console.log(error)
    return error
  }
}

export async function createSeeds(conference: any, playoffsId: any) {
  try {
    const response = await db.seed.createMany({
      data: conference.map((value: any) => ({
        team_code: value.team_code,
        position: value.position.toString(),
        conference: value.conference as Conference,
        playoffsId
      }))
    })

    revalidatePath('/dashboard?opt=addplayoffs')
    return response
  } catch (error) {
    console.log(error)
    return error
  }
}


export async function getSeeds(season: any) {
  try {
    const playoffs = await db.playoffs.findFirst({
      where: {
        season
      },
      select: {
        id: true
      }
    })

    if (playoffs?.id) {
      const response = await db.seed.findMany({
        where: {
          playoffsId: playoffs.id
        },
        select: {
          team_code: true,
          position: true,
          conference: true,
          wins: true,
          losses: true,
          round: true,
          eliminated: true,
        }
      })
      return response
    }
    return playoffs
  } catch (error) {
    console.log(error)
    return error
  }
}


export async function createPlayerStats(values: GameStatProps) {
  try {
    const response = db.playerStat.create({
      data: {
        ...values
      }
    })
    return response
  } catch (error) {
    console.log(error)
    return error
  }
}


export async function getPlayerStats(type: Tournament, season: Season, statType: StatType, stage: Stage, span?: string) {

  try {
    const response = db.playerStat.findFirst({
      where: {
        season,
        type,
        stage,
        statType,
        span
      }
    })
    return response
  } catch (error) {
    console.log(error)
    return error
  }
}



export async function getPlayerStatsTotals(type: Tournament, season: Season, statType: StatType, stage: Stage, span?: string) {

  try {
    const response = db.playerStat.findFirst({
      where: {
        season,
        type,
        stage,
        statType,
        span: {
          not: null
        }
      }
    })
    return response
  } catch (error) {
    console.log(error)
    return error
  }
}