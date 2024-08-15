"use server"

import BackToTop from "../reutilizable/BackToTop"
import CardSchedule from "../reutilizable/CardSchedule"
import ScheduleList from "./ScheduleList"






export default async function Schedule({ page, skip }: { page: number, skip: number }) {

  return (

    <section id="schedule" className="space-y-4 max-w-screen-lg flex flex-col mx-auto pt-12">
      <div className="flex mx-auto">
        <h1 className="text-celtics mx-auto w-max text-center text-5xl md:text-7xl text-shadow uppercase mt-24">2023/24 SCHEDULE</h1>
        <BackToTop />
      </div>
      <div className="bg-celtics text-white text-lg px-4 py-6">
        <h2>REGULAR SEASON 82 GAMES</h2>
      </div>
      <ScheduleList page={page} skip={skip} />

    </section>


  )
}

