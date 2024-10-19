import React from 'react'
import BracketSpace from './BracketSpace'
import Image from 'next/image'

type PlayoffsBracketProps = {
  bracket: any[],
  order: boolean
  empty?: boolean
  conferenceFinals?: boolean
}
const Box2 = ({ bracket, order, empty, conferenceFinals }: PlayoffsBracketProps) => {

  let bracketOrdered
  let matchup: any[] = [];
  bracketOrdered = bracket
  if (conferenceFinals == undefined) {
    const positionPairs = [
      [1, 8],
      [4, 5],
      [3, 6],
      [2, 7]
    ];
    positionPairs.forEach((pair, index) => {
      const matched = bracket.find(b => b.position == pair[0] || b.position == pair[1]);
      if (matched) {
        matchup.push(matched);
      }
    });

    bracketOrdered = matchup;

  }
  return (
    <div className={`${order && conferenceFinals ? "-mt-6" : ""}`}>

      {
        bracketOrdered!
          .map((b, index) => (
            <div key={index} className={` 2xl:text-xl xl:text-lg 2xl:w-full w-max`}>

              <div className={` flex space-x-2 w-full `}>



                <div className={`space-y-1 w-full `}>
                  <div className={`${order && conferenceFinals ? "xl:mr-0 -ml-4" : ""} flex items-center space-x-2 p-2 min-w-[120px] min-h-10 bg-gray-100/40 dark:bg-night-80/50 dark:text-zinc-700 text-muted-foreground rounded-lg border shadow-md ${b.team_code === "BOS" && !empty ? "border-celtics" : ""}`}>
                    {
                      !empty &&
                      <>
                        <Image src={`/logos/${b.team_code}.png`} className='w-auto h-auto' width={24} height={24} alt={b.team_code} />
                        <p>{b.team_code} ({b.position}) <span className='ml-4'>{
                          b.wins > 8 && b.wins > 12
                            ? 4 :
                            b.wins < 8 && b.wins > 4
                              ? b.wins - 4
                              :
                              conferenceFinals && b.wins >= 8
                                ? b.wins - 8
                                : 4


                        }</span></p>
                      </>
                    }


                  </div>

                  {
                    (index == 0 || index == 2) && <div className='text-center dark:text-zinc-700 text-gray-300'>|</div>
                  }
                  {
                    (index == 1 && !conferenceFinals) && <BracketSpace />
                  }
                </div>

              </div>


            </div>
          ))
      }

    </div>
  )
}

export default Box2


/* 

 {         
                  (index == 0 || index == 2) && <div className={` xl:flex items-center hidden mt-2 ${order ? "order-1 ml-2" : ""}`}>
                    <div className={`w-[1px] border border-gray-200 dark:border-zinc-800 h-[120px] ${order ? "order-1" : ""}`}></div>
                    <div className='w-8 border border-gray-200 dark:border-zinc-800 h-[0.5px]'></div>
                  </div>
                
                }
*/