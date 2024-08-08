"use server"

import { db } from "@/db"

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