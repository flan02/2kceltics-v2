'use server'
import { db } from "@/db"
import CardSchedule from "../reutilizable/CardSchedule"
import Link from "next/link"




export default async function ScheduleList() {
  const schedule = await db.schedule.findMany({
    where: {
      season: "NBA2K24"
    }
  })



  let total_pages = ["1", "2", "3", "4", "5"] // cantidad de paginas a mostrar
  let increment = 0 // recibe por parametro cuantos partidos se saltea
  let limit = 20 // cantidad de elementos a mostrar


  return (
    <article className="pb-24 space-y-8">
      <div className="space-y-2 grid grid-cols-1 sm:grid-cols-2 space-x-2">
        {
          schedule.map((game, index) => ( // Add parentheses around the parameter list
            index < limit &&
            <CardSchedule
              key={index}
              team_code2={game.team_code2}
              currentGame={game.currentGame}
              atHome={game.atHome}
              scoreTeam1={game.scoreTeam1 as number}
              scoreTeam2={game.scoreTeam2 as number}
            />
          ))
        }
      </div>
      <div className="flex justify-center mx-auto w-[300px] space-x-4">
        {
          total_pages.map((game, index) => ( // Add parentheses around the parameter list
            <Link className="text-2xl text-celtics hover:font-bold hover:underline" href={`/?page=1&limit=10`} key={index}>{index + 1}</Link>
          ))
        }
      </div>
    </article>
  )
}

