"use server"
import { db } from "@/db"
import BackToTop from "../reutilizable/BackToTop"
import Image from "next/image"

import CelticsLogo from "../../../public/logos/MIA.png"


export default async function Schedule() {
  const logos = await db.team.findMany({
    select: {
      logo_url: true
    }
  })

  const path = logos.map(path => path.logo_url)
  return (

    <section id="schedule" className="max-w-screen-xl flex flex-col mx-auto pt-12">
      <div className="flex mx-auto">
        <h1 className="text-celtics mx-auto w-max text-center text-5xl md:text-7xl text-shadow uppercase mt-24">2023/24 SCHEDULE</h1>
        <BackToTop />
      </div>
      {
        path.map((path, index) => (
          <article key={index}>
            <Image
              className="s-24"
              width={50}
              height={50}
              src={`${path}`} alt={`index ${index}`} />

          </article>
        ))
      }

    </section>


  )
}

