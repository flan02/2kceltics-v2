"use server";

import { GameStatProps } from "@/components/custom/dashboard/AddPlayerStatsForm";
import { updateProps } from "@/components/custom/dashboard/UpdateScheduleGame";
import { db } from "@/db";
import { current_season } from "@/lib/types";
import {
  Conference,
  Schedule,
  Season,
  Season2k,
  StatType,
  Tournament,
  Stage,
} from "@prisma/client";
import { revalidatePath } from "next/cache";

type Team = {
  name: string;
  team_code: string;
  logo_url: string;
};

export async function loggedAsAdmin(email: string) {
  //console.log("loggedAsAdmin", id);
  try {
    const isAdmin = await db.user.findFirst({
      where: {
        email,
      },
    });

    //console.log('isAdmin', isAdmin);
    if (!isAdmin) return null;

    return isAdmin;
  } catch (error) {
    console.error("We found the following error: ", error);
    return null;
  }
}

export async function createUser(name: string, email: string, image: string) {
  try {
    const newUser = await db.user.create({
      data: {
        name,
        email,
        image,
      },
    });
    return true;
  } catch (error) {
    console.error("We found an error creating this new user: ", error);
    return { message: "We found an error creating this new user", status: 500 };
  }
}

export async function createNewSeason(
  values: Omit<Season2k, "id" | "createdAt" | "updatedAt">,
) {
  try {
    const response = db.season2k.create({
      data: {
        ...values,
      },
    });
    revalidatePath("/dashboard?opt=addseason");
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getSeason2k(season: Season) {
  try {
    const response = db.season2k.findFirst({
      where: {
        season,
      },
      select: {
        id: true,
        season: true,
        teamId: true,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getTeam(team: string) {
  try {
    const response = await db.team.findFirst({
      where: {
        team_code: team,
      },
      select: {
        id: true,
        name: true,
        team_code: true,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
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
      },
    });
    // revalidatePath('/dashboard?opt=addteam')
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function updateTeam(
  values: Omit<Season2k, "id" | "teamId" | "createdAt" | "updatedAt">,
) {
  try {
    // TODO -> First we call to database retrieving our team id
    const data: any = await getSeason2k(values.season as Season);
    //console.log(data)

    const filteredData: any = {};

    Object.keys(values).forEach((key) => {
      const value = values[key as keyof typeof values];
      if (typeof value === "string" && value.trim() !== "") {
        (filteredData[key as keyof typeof values] as string) = value;
      } else if (typeof value === "number") {
        (filteredData[key as keyof typeof values] as number) = value;
      }
    });

    const updateTeam = db.season2k.update({
      where: {
        id: data.id,
      },
      data: {
        ...filteredData,
      },
    });

    return updateTeam;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function createTask(
  task: string,
  description: string,
  done?: boolean,
) {
  try {
    const response = db.task.create({
      data: {
        task,
        description,
      },
    });
    revalidatePath("/dashboard");
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getTasks() {
  try {
    const response = (await db.task.findMany({ take: -10 })).sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    //console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function updateTask(id: string, done: boolean, task?: string) {
  try {
    const response = db.task.update({
      where: {
        id,
      },
      data: {
        task,
        done,
      },
    });
    revalidatePath("/dashboard");
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function deleteTask(id: string) {
  try {
    const response = db.task.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard");
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getSeasons2k(season: any) {
  try {
    const response = db.season2k.findMany({
      where: {
        season,
      },
      select: {
        season: true,
        total_games: true,
      },
    });
    //console.log(response)
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getScheduleGame(values: updateProps) {
  try {
    const response = db.schedule.findFirst({
      where: {
        currentGame: values.currentGame,
        season: values.season as "NBA2K24",
      },
      select: {
        id: true,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function createScheduleGame(
  values: Omit<
    Schedule,
    | "id"
    | "createdAt"
    | "updatedAt"
    | "video_url"
    | "gameStats"
    | "scoreTeam1"
    | "scoreTeam2"
    | "boxscoreTeam1"
    | "boxscoreTeam2"
    | "result"
  >,
) {
  try {
    const response = db.schedule.create({
      data: {
        ...values,
      },
    });

    revalidatePath("/dashboard?opt=schedule");
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getCurrentGame() {
  //console.log("CURRENT SEASON", current_season);
  const response = await db.schedule.findMany({
    where: {
      season: current_season,
      currentGame: { gt: 0 },
    },
    select: {
      currentGame: true,
      stage: true,
      type: true,
      playoffGame: true,
      team2: true,
      atHome: true,
    },
  });

  const currentGame: number = response.length - 1;

  return response[currentGame];
}

interface Seed {
  team_code: string;
  position: number;
  conference: string;
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

  let WEST: any = [];
  let EAST: any = [];
  let season: any;
  data.forEach((value: any, key: any) => {
    //console.log(key, value)
    if (key.includes("west")) {
      WEST.push(value);
    }
    if (key.includes("east")) {
      EAST.push(value);
    }
    if (key.includes("season")) {
      season = value;
    }
  });

  //console.log(WEST)
  //console.log(WEST[0])

  let west: Seed[] = [];
  let east: Seed[] = [];
  for (let i = 0; i < WEST.length; i++) {
    west[i] = {
      team_code: WEST[i],
      position: i + 1,
      conference: "WEST",
    };
  }

  //console.log(west)

  for (let i = 0; i < EAST.length; i++) {
    east[i] = {
      team_code: EAST[i],
      position: i + 1,
      conference: "EAST",
    };
  }

  //console.log(east)

  const conference = [...west, ...east];

  try {
    const response = await db.playoffs.create({
      data: {
        season,
        champ: "",
        mvp: "",
      },
    });

    const playoffs = await db.playoffs.findFirst({
      where: {
        season,
      },
      select: {
        id: true,
      },
    });

    if (playoffs?.id) await createSeeds(conference, playoffs.id);
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getPlayoffs(season: any) {
  try {
    const response = await db.playoffs.findFirst({
      where: {
        season,
      },
      select: {
        id: true,
        gamesPlayed: true,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function createSeeds(conference: any, playoffsId: any) {
  try {
    const response = await db.seed.createMany({
      data: conference.map((value: any) => ({
        team_code: value.team_code,
        position: value.position.toString(),
        conference: value.conference as Conference,
        playoffsId,
      })),
    });

    revalidatePath("/dashboard?opt=addplayoffs");
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getSeeds(season: any) {
  try {
    const playoffs = await db.playoffs.findFirst({
      where: {
        season,
      },
      select: {
        id: true,
      },
    });

    if (playoffs?.id) {
      const response = await db.seed.findMany({
        where: {
          playoffsId: playoffs.id,
        },
        select: {
          team_code: true,
          position: true,
          conference: true,
          wins: true,
          losses: true,
          round: true,
          eliminated: true,
        },
      });
      return response;
    }
    return playoffs;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function createPlayerStats(values: GameStatProps) {
  try {
    const response = db.playerStat.create({
      data: {
        ...values,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getCurrentPlayerStats(
  type: Tournament,
  season: Season,
  statType: StatType,
  stage: Stage,
  span?: string,
) {
  try {
    const response = db.playerStat.findFirst({
      where: {
        season,
        type,
        stage,
        statType,
        span,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getPlayerStatsTotals(
  type: Tournament,
  season: Season,
  statType: StatType,
  stage: Stage,
  span?: string,
) {
  console.log(
    "type, season, statType, stage, span",
    type,
    season,
    statType,
    stage,
    span,
  );
  try {
    const response = db.playerStat.findFirst({
      where: {
        season,
        type,
        stage,
        statType,
        span: {
          not: null,
        },
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getCurrentSchedule(season: Season) {
  try {
    const response = await db.schedule.findMany({
      where: {
        season,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

const NBA_HEADERS = {
  Host: "stats.nba.com",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/124.0.0.0 Safari/537.36",
  Accept: "application/json, text/plain, */*",
  "Accept-Language": "en-US,en;q=0.9",
  Referer: "https://www.nba.com/",
  Origin: "https://www.nba.com",
};

const CELTICS_ID = process.env.SCRIPTS_CELTICS_ID || "1610612738";
const SEASON_TYPE = process.env.SCRIPTS_SEASON_TYPE || "Regular Season";

async function fetchCelticsSeasonTotals() {
  const params = new URLSearchParams({
    TeamID: CELTICS_ID,
    SeasonType: SEASON_TYPE,
    PerMode: "Totals",
    LeagueID: "00",
  });

  const res = await fetch(
    `https://stats.nba.com/stats/teamyearbyyearstats?${params.toString()}`,
    { headers: NBA_HEADERS },
  );

  if (!res.ok)
    throw new Error(`Error NBA Stats ${res.status}: ${res.statusText}`);

  const data: any = await res.json();
  const dataset =
    data.resultSets?.find((rs: any) => rs.name === "TeamStats") ||
    data.resultSets?.[0];

  if (!dataset) throw new Error("No se encontró el resultSet TeamStats.");

  const headers: string[] = dataset.headers;
  const rows: any[][] = dataset.rowSet;
  const latestRow = rows[rows.length - 1];

  const getCol = (col: string) => latestRow[headers.indexOf(col)];

  const fgm = Number(getCol("FGM"));
  const fga = Number(getCol("FGA"));
  const fg3m = Number(getCol("FG3M"));
  const fg3a = Number(getCol("FG3A"));

  const fg2m = fgm - fg3m;
  const fg2a = fga - fg3a;
  const fg2Pct = fg2a > 0 ? (fg2m / fg2a) * 100 : 0;

  return {
    teamId: CELTICS_ID,
    season: String(getCol("YEAR")),
    gamesPlayed: Number(getCol("GP")),
    wins: Number(getCol("WINS")),
    losses: Number(getCol("LOSSES")),
    winPct: Number(getCol("WIN_PCT")),
    confRank: getCol("CONF_RANK") !== null ? Number(getCol("CONF_RANK")) : null,
    divRank: getCol("DIV_RANK") !== null ? Number(getCol("DIV_RANK")) : null,
    poWins: getCol("PO_WINS") !== null ? Number(getCol("PO_WINS")) : null,
    poLosses: getCol("PO_LOSSES") !== null ? Number(getCol("PO_LOSSES")) : null,
    pts: Number(getCol("PTS")),
    fgm,
    fga,
    fgPct: Number(getCol("FG_PCT")) * 100,
    fg2m,
    fg2a,
    fg2Pct: Number(fg2Pct.toFixed(2)),
    fg3m,
    fg3a,
    fg3Pct: Number(getCol("FG3_PCT")) * 100,
    ftm: Number(getCol("FTM")),
    fta: Number(getCol("FTA")),
    ftPct: Number(getCol("FT_PCT")) * 100,
    oreb: Number(getCol("OREB")),
    dreb: Number(getCol("DREB")),
    reb: Number(getCol("REB")),
    ast: Number(getCol("AST")),
    stl: Number(getCol("STL")),
    blk: Number(getCol("BLK")),
    tov: Number(getCol("TOV")),
    pf: Number(getCol("PF")),
  };
}

export async function syncTeamStatsAction() {
  try {
    const stats = await fetchCelticsSeasonTotals();
    const { teamId, season, ...updateFields } = stats;

    const record = await db.teamSeasonTotals.upsert({
      where: { season },
      update: updateFields,
      create: stats,
    });

    // Invalida la caché de la página de stats o del admin para ver los datos frescos
    revalidatePath("/admin");
    revalidatePath("/team");

    return {
      success: true,
      data: {
        season: record.season,
        record: `${record.wins}-${record.losses} (${record.gamesPlayed} GP)`,
        fg: `${record.fgm}/${record.fga} (${record.fgPct.toFixed(1)}%)`,
        threePt: `${record.fg3m}/${record.fg3a} (${record.fg3Pct.toFixed(1)}%)`,
      },
    };
  } catch (error: any) {
    console.error("Error en syncTeamStatsAction:", error);
    return {
      success: false,
      error: error.message || "Error al sincronizar con NBA Stats",
    };
  }
}
