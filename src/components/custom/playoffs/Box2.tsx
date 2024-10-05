import React from 'react'
import BracketSpace from './BracketSpace'
import Image from 'next/image'

type PlayoffsBracketProps = {
  bracket: any[],
  order: boolean
  empty?: boolean
}
const Box2 = ({ bracket, order, empty }: PlayoffsBracketProps) => {
  return (
    <>
      {
        bracket.map((b, index) => (
          <div key={index} className='2xl:text-xl xl:text-lg flex items-center justify-start 2xl:w-full w-max'>
            <div className='space-y-4 flex space-x-2 w-full'>
              <div className={`xl:flex items-center hidden mt-4 ${order ? "order-1 ml-2" : ""}`}>
                <div className={`w-[1px] border border-gray-200 dark:border-zinc-800 h-[120px] ${order ? "order-1" : ""}`}></div>
                <div className='w-8 border border-gray-200 dark:border-zinc-800 h-[0.5px]'></div>
              </div>
              <div className='space-y-6 w-full'>
                <div className={`flex items-center space-x-2 p-2 min-w-[120px] min-h-10 bg-gray-100/40 dark:bg-night-80/50 dark:text-zinc-700 text-muted-foreground rounded-lg border shadow-md ${b.team1 === "BOS" && !empty ? "border-celtics" : ""}`}>
                  {
                    !empty &&
                    <>
                      <Image src={`/logos/${b.team1}.png`} className='w-auto h-auto' width={24} height={24} alt={b.team1} />
                      <span>{b.team1} ({b.seed1}) {b.score1}</span>
                    </>
                  }
                </div>
                <div className="flex items-center min-h-10 space-x-2 p-2 bg-gray-100/40 dark:bg-night-80/50 dark:text-zinc-700 text-muted-foreground rounded-lg border shadow-md">
                  {
                    !empty &&
                    <>
                      <Image src={`/logos/${b.team2}.png`} className='w-auto h-auto' width={24} height={24} alt={b.team2} />
                      <span>{b.team2} ({b.seed2}) {b.score2}</span>
                    </>
                  }
                </div>
              </div>
            </div>
            {
              index < bracket.length - 1 && <BracketSpace />
            }
          </div>
        ))
      }

    </>
  )
}

export default Box2