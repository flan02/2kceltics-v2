import { getNextGame, getNextTeam } from '@/app/actions'
import Image from 'next/image'
import React from 'react'

type Props = {}

const MarqueePO = async (props: Props) => {
  const nextGame = await getNextGame()
  const nextTeam = await getNextTeam(nextGame.toString())
  return (
    <div className="absolute whitespace-nowrap overflow-hidden w-[100%] top-[50px] left-0 dark:bg-nighty bg-zinc-300/60 uppercase font-bold">
      <div className='min-w-full flex items-center animate-marquee-xs text-celtics dark:text-green-50'>

        <Image src='/playoffs-logo.png' alt='playoffs-logo' width={80} height={80} className='w-auto h-auto' />
        <h6 className="inline-block uppercase ml-20 mr-24 text-xs md:text-base"><span className='underline'>NEXT GAME #{`${!nextTeam?.playoffGame ? nextGame.toString() : nextTeam.playoffGame}`}:</span> &nbsp; &nbsp; &nbsp; BOSTON CELTICS <span className='lowercase'>vs</span> {nextTeam?.team2}  &nbsp; - &nbsp; starting 5: C - Kristap Porzingis | PF - Jayson Tatum | SF - Jaylen Brown | SG - Jrue Holiday | PG - Derrick White</h6>


      </div>

    </div>
  )
}

export default MarqueePO