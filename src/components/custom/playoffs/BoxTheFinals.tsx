import Image from 'next/image'
import React from 'react'

type PlayoffsBracketProps = {
  bracket: any[]
}

const BoxTheFinals = ({ bracket }: PlayoffsBracketProps) => {
  return (
    bracket.map((b, index) => (
      <div className='flex flex-col h-full space-y-8 2xl:space-y-16 items-center justify-center 2xl:w-full 2xl:text-3xl xl:text-xl lg:text-lg text-sm w-max' key={index}>
        <div className={`flex items-center space-x-2 p-2 xl:w-max bg-white dark:bg-night-80/50 dark:text-zinc-500 text-black rounded-lg border shadow-md ${b.team1 === "BOS" ? "border-celtics" : ""}`}>
          <Image src={`/logos/${b.team1}.png`} className='w-auto h-auto' width={36} height={36} alt={b.team1} />
          <p>
            {b.team1} ({b.seed1}) &nbsp; <span className='font-bold'>{b.score2}</span>
          </p>
        </div>
        <Image src="/trophy.png" alt='trophy' className='w-auto h-auto' width={80} height={80} />
        <div className="flex w-full items-center space-x-4 p-2 xl:w-max bg-white dark:bg-night-80/50 dark:text-zinc-500 text-black rounded-lg border shadow-md">
          <Image src={`/logos/${b.team2}.png`} className='w-auto h-auto' width={`${b.team2 === "MIA" ? 30 : 36}`} height={`${b.team2 === "MIA" ? 30 : 36}`} alt={b.team2} />
          <p>
            {b.team2} ({b.seed2}) &nbsp; <span className='font-bold'>{b.score2}</span>
          </p>
        </div>
      </div>
    ))
  )
}

export default BoxTheFinals

