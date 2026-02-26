import { getNextGame, getNextTeam } from '@/app/actions'
import React from 'react'

type Props = {}

export default async function Marquee() {
  const nextGame = await getNextGame()
  const nextTeam = await getNextTeam(nextGame.toString())

  // console.log(nextTeam, nextGame);
  return (
    <div className="absolute whitespace-nowrap overflow-hidden w-[100%] top-[50px] left-0 dark:bg-nighty bg-zinc-200/70 py-2 md:py-4 uppercase font-bold">
      <div className='min-w-full animate-marquee-xs lg:animate-marquee-x text-celtics dark:text-green-50'>
        <h6 className="inline-block uppercase ml-12 mr-12 lg:ml-48 lg:mr-48 text-xs md:text-base">{nextTeam?.team2 ? `Next game #${nextGame} vs ${nextTeam?.team2}` : 'No next game scheduled'}</h6>
        <h6 className="inline-block uppercase ml-12 mr-12 lg:ml-48 lg:mr-48 text-xs md:text-base">Get well! Jayson Tatum 🎗</h6>
        <h6 className="inline-block uppercase ml-12 mr-12 lg:ml-48 lg:mr-48 text-xs md:text-base">New feature added NBA Celtics stats laboratory since 2025-26</h6>
        {/* <h6 className="inline-block uppercase ml-48 mr-48 text-xs md:text-base">Season starts on October 22, 2025</h6> */}
      </div>

    </div>
  )
}
