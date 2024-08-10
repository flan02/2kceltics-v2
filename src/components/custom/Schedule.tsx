"use server"
import { db } from "@/db"
import BackToTop from "../reutilizable/BackToTop"




const Schedule = async () => {
  const schedule = await db.schedule.findMany()
  return (
    <section id="schedule" className="max-w-screen-xl flex mx-auto pt-12">
      <div className="flex mx-auto">
        <h1 className="text-celtics mx-auto w-max text-center text-5xl md:text-7xl text-shadow uppercase mt-24">2023/24 SCHEDULE</h1>
        <BackToTop />
      </div>
      <div>
        {
          JSON.stringify(schedule)
        }
      </div>
    </section>
  )
}

export default Schedule