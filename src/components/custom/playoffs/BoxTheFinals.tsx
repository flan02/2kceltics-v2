import Image from 'next/image'
import React from 'react'

type PlayoffsBracketProps = {
  bracket: any[]
  empty?: boolean
}

// space-y-8 2xl:space-y-16
const BoxTheFinals = ({ bracket, empty }: PlayoffsBracketProps) => {
  //console.log("The Finals", bracket)

  //console.log("empty finales values", empty)
  return (
    <div className='flex flex-col h-full  items-center justify-center 2xl:w-full 2xl:text-3xl xl:text-xl lg:text-lg text-sm w-max' >
      {
        bracket.length == 0 &&
        <>
          <div className={`flex items-center space-x-2 p-2 xl:w-full w-[180px] bg-gray-100/40 min-h-16 dark:bg-night-80/50 dark:text-zinc-500 text-black rounded-lg border shadow-md`}></div>
          <div><Image src="/trophy.png" alt='trophy' className='2xl:my-16 my-8 w-auto h-auto mx-auto' width={80} height={80} /></div>
          <div className={`flex items-center space-x-2 p-2 xl:w-full w-[180px] bg-gray-100/40 min-h-16 dark:bg-night-80/50 dark:text-zinc-500 text-black rounded-lg border shadow-md`}></div>
        </>
      }
      {
        bracket.map((b, index) => (
          <div key={index} className=''>
            {
              empty ? <div className={`flex items-center space-x-2 p-2 xl:w-full w-[180px] bg-gray-100/40 min-h-16 dark:bg-night-80/50 dark:text-zinc-500 text-black rounded-lg border shadow-md ${b.team_code == "BOS" && !empty ? "border-celtics" : ""}`}></div>
                :
                <div className={`flex items-center space-x-2 p-2 xl:w-max bg-gray-100/40 dark:bg-night-80/50 dark:text-zinc-700 text-muted-foreground rounded-lg border shadow-md ${b.team_code == "BOS" ? "border-celtics" : ""}`}>
                  <Image src={`/logos/${b.team_code}.png`} className='w-auto h-auto' width={36} height={36} alt={b.team_code} />
                  <p>
                    {b.team_code} ({b.position}) &nbsp; <span className='font-bold'>{b.wins > 12 ? b.wins - 12 : 0}</span>
                  </p>
                </div>
            }
            {
              (index == 0) && <div><Image src="/trophy.png" alt='trophy' className='2xl:my-16 my-8 w-auto h-auto mx-auto' width={80} height={80} /></div>
            }

          </div>
        ))
      }
    </div>
  )
}
export default BoxTheFinals

/* 
{
          empty ? <div className={`flex items-center space-x-2 p-2 xl:w-full w-[180px] bg-gray-100/40 min-h-16 dark:bg-night-80/50 dark:text-zinc-500 text-black rounded-lg border shadow-md ${b.team2 === "BOS" && !empty ? "border-celtics" : ""}`}></div>
            : <div className="flex w-full items-center space-x-4 p-2 xl:w-max bg-gray-100/40 dark:bg-night-80/50 dark:text-zinc-700 text-muted-foreground rounded-lg border shadow-md">
              <Image src={`/logos/${b.team2}.png`} className='w-auto h-auto' width={`${b.team2 === "MIA" ? 30 : 36}`} height={`${b.team2 === "MIA" ? 30 : 36}`} alt={b.team2} />
              <p>
                {b.team2} ({b.seed2}) &nbsp; <span className='font-bold'>{b.score2}</span>
              </p>
            </div>
        }
*/