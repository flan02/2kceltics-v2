import { getNextGame, getNextTeam } from '@/app/actions'
import Image from 'next/image'
import React from 'react'

type Props = {}

const MarqueePO = async (props: Props) => {
  const nextGame = await getNextGame()
  const nextTeam = await getNextTeam(nextGame.toString())
  return (
    <div className="absolute whitespace-nowrap overflow-hidden w-[100%] top-[50px] left-0 dark:bg-nighty bg-zinc-200/70 py-2 md:py-4 uppercase font-bold">
      <div className='min-w-full animate-marquee-x text-celtics dark:text-green-50'>
        <h6 className="inline-block uppercase ml-48 mr-48 text-xs md:text-base">Boston Celtics has won the NBA 2K24 Championship!!!</h6>
        <h6 className="inline-block uppercase ml-48 mr-48 text-xs md:text-base">Next season will start on March 1, 2025</h6>
        <h6 className="inline-block uppercase ml-48 mr-48 text-xs md:text-base">Let&apos;s get a back-to-back</h6>
      </div>

    </div>
  )
}

export default MarqueePO


/*
    <div className="absolute whitespace-nowrap overflow-hidden w-[100%] top-[50px] left-0 dark:bg-nighty bg-zinc-300/60 uppercase font-bold">
      <div className='min-w-full flex items-center animate-marquee-xs text-celtics dark:text-green-50'>
        <Image src='/playoffs-logo.png' alt='playoffs-logo' width={70} height={70} className='w-auto h-auto' />
        <h6 className="inline-block uppercase ml-20 mr-24 text-xs md:text-base"><span className='underline'>NEXT GAME #{`${!nextTeam?.playoffGame ? nextGame.toString() : nextTeam.playoffGame}`}:</span> &nbsp; &nbsp; &nbsp; BOSTON CELTICS <span className='lowercase'>vs</span> {nextTeam?.team2}  &nbsp; - &nbsp; starting 5: C - Kristap Porzingis | PF - Jayson Tatum | SF - Jaylen Brown | SG - Jrue Holiday | PG - Derrick White</h6>
      </div>
    </div>
*/