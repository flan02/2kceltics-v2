"use server"

import { getNextGame } from "@/app/actions"
import BackToTop from "../reutilizable/BackToTop"

import ScheduleList from "./ScheduleList"






export default async function Schedule({ searchParams: { page } }: { searchParams: { page: number } }) {
  const nextGame = await getNextGame()


  return (

    <section id="schedule" className="space-y-4 max-w-screen-lg flex flex-col mx-auto pt-12">
      <div className="flex mx-auto">
        <h1 className="text-celtics mx-auto w-max text-center text-5xl md:text-7xl text-shadow uppercase mt-24">2023/24 SCHEDULE</h1>
        <BackToTop />
      </div>
      <br />
      <br />
      <div className="bg-celtics flex items-end justify-between text-white text-lg px-4 py-6">
        <h2>REGULAR SEASON 82 GAMES</h2>
        {
          nextGame
            ? <h6 className="uppercase text-sm text-muted underline">next game: {nextGame}</h6>
            : <h6 className="uppercase text-sm text-muted underline">NOT YET</h6>

        }
      </div>
      <ScheduleList searchParams={{ page }} />

    </section>


  )
}

