import CardPlayerLink from '@/components/reutilizable/CardPlayerLink'
import { ChartSplineIcon, MonitorPlayIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
//import CelticsOldDuo from "../../../../public/antoine-walker-paul-pierce.png";


const labels = [{
  title: "SEASON STATS",
  isTag: false,
  link: "/season-stats/season",
  icon: <MonitorPlayIcon color="#888" />
}, {
  title: "PLAYOFFS STATS",
  isTag: false,
  link: "/season-stats/playoffs",
  icon: <ChartSplineIcon color="#888" />
}]


const ChooseStatsMobile = () => {

  return (
    <section className="mb-24 flex flex-col space-y-6">
      {
        labels.map((player, index) => (
          <CardPlayerLink cardTitle={player.title} key={index} isTag={player.isTag} link={player.link} icon={player.icon} />
        ))
      }
    </section>
  )
}

export default ChooseStatsMobile