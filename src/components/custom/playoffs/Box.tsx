import Image from 'next/image'
import React from 'react'

type PlayoffsBracketProps = {
  bracket: any[]
  order: boolean
}



const Box = ({ bracket, order }: PlayoffsBracketProps) => {
  return (
    bracket.map((b, index) => (
      <div className='2xl:text-xl xl:text-lg 2xl:w-full w-max ' key={index}>
        <div className={`flex items-center space-x-2 p-2 bg-gray-100/40 dark:bg-night-80/50 dark:text-zinc-700 text-muted-foreground rounded-lg border shadow-md ${b.team1 === "BOS" ? "border-celtics" : ""}`}>
          <Image src={`/logos/${b.team1}.png`} className='w-auto h-auto' width={`${b.team1 === "BOS" ? 28 : 24}`} height={`${b.team1 === "BOS" ? 28 : 24}`} alt={b.team1} />
          <span >
            {b.team1} ({b.seed1}) &nbsp; {b.score1}
          </span>
        </div>
        <div className='text-center dark:text-zinc-500 text-gray-300'>|</div>
        <div className={`flex items-center space-x-2 p-2 bg-gray-100/40 dark:bg-night-80/50 dark:text-zinc-700 text-muted-foreground rounded-lg border shadow-md`}>
          <Image src={`/logos/${b.team2}.png`} className='w-auto h-auto' width={`${b.team2 === "MIA" ? 20 : 24}`} height={`${b.team2 === "MIA" ? 20 : 24}`} alt={b.team2} />
          <span>
            {b.team2} ({b.seed2}) &nbsp; {b.score2}
          </span>
        </div>
      </div>
    ))
  )
}

export default Box