import Image from 'next/image'
import React, { memo } from 'react'

type PlayoffsBracketProps = {
  bracket: any[]
  order: boolean
}



const Box = ({ bracket, order }: PlayoffsBracketProps) => {

  // console.log("Bracket data in Box component:", bracket);

  //const matchups = [0, 7, 3, 4, 2, 5, 1, 6];
  const matchups = [1, 8, 4, 5, 3, 6, 2, 7];
  const bracketOrdered = matchups.map(pos => bracket.find(t => t.position == pos)).filter(Boolean);
  // console.log(bracket)
  return (
    bracketOrdered
      .map((b, index) => (
        <div className='2xl:text-xl xl:text-lg 2xl:w-full w-max' key={b.position}>
          <div className={`flex items-center space-x-2 p-2 bg-gray-100/40 dark:bg-night-80/50 dark:text-zinc-700 text-muted-foreground rounded-lg border shadow-md ${b.team_code === "BOS" ? "border-celtics" : ""}`}>
            <Image src={`/logos/${b.team_code}.png`} className='w-auto h-auto' width={`${b.team_code === "BOS" ? 28 : 24}`} height={`${b.team_code === "BOS" ? 28 : 24}`} alt={b.team_code} />
            <span >
              {b.team_code} ({b.position}) &nbsp; {b.wins > 4 ? 4 : b.wins}
            </span>
          </div>
          {
            (index != 7 && index != 3 && index != 1 && index != 5) && <div className='text-center dark:text-zinc-700 text-gray-300'>|</div>
          }
          {
            (index == 3 || index == 1 || index == 5) && <div className='mt-8'></div>
          }


        </div>
      ))
  )
}

export default memo(Box)



/*
0: 
conference: "WEST"
losses: 0
position: "1"
round: "FIRST_ROUND"
team_code: "OKC"
wins: 0
*/