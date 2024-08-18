'use server'

import CardSchedule from "../reutilizable/CardSchedule"
import Link from "next/link"

import { getScheduleGames } from "@/app/actions"
import { Card, CardTitle } from "../ui/card"

//import { useSearchParamsContext } from "@/services/server/SearchParamsContext"




export default async function ScheduleList({ searchParams: { page } }: { searchParams: { page: number } }) {

  let schedule = await getScheduleGames()
  schedule = schedule.filter((game) => game.type == "RS")

  const total_pages: number[] = schedule
    // .filter(game => game.scoreTeam1! > 0)
    .map(game => game.scoreTeam1 as number);

  //console.log(total_pages);
  let limit = 20
  let amount_pages = Math.ceil(total_pages.length / limit)

  schedule.map((game, index) => {
    if (game.scoreTeam1! > 0) total_pages.push(game.scoreTeam1 as number)
  })

  let W = schedule.filter(game => game.scoreTeam1! > game.scoreTeam2!).length
  let L = schedule.filter(game => game.scoreTeam1! < game.scoreTeam2!).length

  const currentSchedule = schedule.slice(page * limit, (page + 1) * limit)
  return (
    <article className="pb-24 space-y-8">
      <div className="space-y-2 grid grid-cols-1 lg:grid-rows-10 lg:grid-flow-col space-x-2">
        {
          currentSchedule
            .map((game, index) => ( // Add parentheses around the parameter list
              index < limit &&
              <CardSchedule
                key={index}
                team_code2={game.team_code2}
                currentGame={game.currentGame}
                atHome={game.atHome}
                scoreTeam1={game.scoreTeam1 as number}
                scoreTeam2={game.scoreTeam2 as number}
                stage={game.stage}

              />
            ))
        }
      </div>
      <div className="flex justify-center mx-auto w-[300px] space-x-4">
        {
          Array.from({ length: amount_pages }).map((_, index) => (
            <Link
              key={index}
              className="text-2xl text-celtics hover:font-bold hover:underline"
              href={`/?page=${index}&skip=${index * limit}#schedule`}
            >
              {index + 1}
            </Link>
          ))
        }
      </div>
      <div className="flex justify-end">
        <Card className="flex w-max px-4">
          <CardTitle className="text-muted-foreground py-4">TEAM RECORD: <span className="text-celtics">{`${W} W`}</span> - <span className="text-red-600">{`${L} L`}</span></CardTitle>
        </Card>
      </div>
    </article>
  )
}


