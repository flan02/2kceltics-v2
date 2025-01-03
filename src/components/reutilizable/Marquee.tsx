import { getNextGame, getNextTeam } from '@/app/actions'
import React from 'react'

type Props = {}

export default async function Marquee() {
  const nextGame = await getNextGame()
  const nextTeam = await getNextTeam(nextGame.toString())

  // console.log(nextTeam, nextGame);
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

// TODO: PREVIOUS MARQUEE -> I SHOULD DESIGN A NEW ONE FROM NEXT SEASON...
/* 
<div className="absolute whitespace-nowrap overflow-hidden w-[100%] top-[50px] left-0 dark:bg-nighty bg-zinc-200/70 py-2 md:py-4 uppercase font-bold">
      <div className='min-w-full animate-marquee-x text-celtics dark:text-green-50'>

        <h6 className="inline-block uppercase text-xs md:text-base"><span className='underline'>NEXT GAME #{`${!nextTeam?.playoffGame ? nextGame.toString() : nextTeam.playoffGame}`}:</span> &nbsp; &nbsp; &nbsp; BOSTON CELTICS <span className='lowercase'>vs</span> {nextTeam?.team2}  &nbsp; - &nbsp; starting 5: C - Kristap Porzingis | PF - Jayson Tatum | SF - Jaylen Brown | SG - Jrue Holiday | PG - Derrick White </h6>
        <h6 className="inline-block uppercase ml-48 mr-48 text-xs md:text-base">Welcome to Boston Celtics Kristap Porzingis! 🦄</h6>
        <h6 className="inline-block uppercase ml-48 mr-48 text-xs md:text-base">We&apos;re all gonna miss you Marcus Smart [Heart and soul of the Boston Celtics] ☘</h6>
      </div>

    </div>
*/