'use client'
import SkeletonGameCard from '@/components/reutilizable/SkeletonGameCard';
import { Button } from '@/components/ui/button';
import { $Enums } from '@prisma/client';


import Image from 'next/image';
import Link from 'next/link';

import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

type Props = {

  isSubmitted?: boolean,
  filteredGames: {
    id: number,
    season: string,
    currentGame: number,
    video_url: string,
    atHome: string,
    team2: string,
    team_code2: string
    stage: string
  }[]
}

const GameCard = ({ filteredGames }: Props) => {

  //console.log(filteredGames)
  const video_url: any = []
  filteredGames?.map((game: any) => game.video_url !== null && video_url.push(game))
  // console.log("ARRAY VIDEO URL", video_url);
  return (

    <aside className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 w-full px-8 md:px-2 gap-4 md:gap-2'>
      {
        !video_url
          ? <SkeletonGameCard />
          :
          video_url.length != 0
            ?
            video_url
              .sort((a: any, b: any) => parseInt(b.currentGame) - parseInt(a.currentGame))
              .map((game: any, index: number) => (
                <div className={`relative border border-slate-300 rounded-xl hover:bg-slate-200/50 hover:border hover:border-slate-900`} key={index}>
                  <LiteYouTubeEmbed
                    id={game.video_url}
                    title={`RS ${game.season} #${game.currentGame} Celtics vs Knicks Full Game`}
                    poster="hqdefault"
                    aspectWidth={16}
                    aspectHeight={9}
                  />
                  <h5 className='absolute top-0 left-0 z-10 w-full py-2 pl-1 bg-[rgba(0,0,0,0.3)] text-sm text-zinc-200 truncate'>{`RS ${game.season} #${game.currentGame} ${game.atHome == "HOME" ? game.team_code2 : "BOS"} vs ${game.atHome == "HOME" ? "BOS" : game.team_code2} Full Game`}</h5>
                  <div className={`px-4 pb-4 pt-2 flex justify-between ${game.stage == "CUP_GP" ? "bg-orange-200/40" : ""} `}>
                    <div className='flex items-center'>
                      <Image src={`/logos/${game.atHome == "HOME" ? game.team_code2 : "BOS"}.png`} width={100} height={100} className='mr-2 w-16 h-16' alt="celtics-logo" />
                      <span className='font-bold'>vs</span>
                      <Image src={`/logos/${game.atHome == "HOME" ? "BOS" : game.team_code2}.png`} width={100} height={100} className={`ml-2 w-16 h-16`} alt="celtics-logo" />
                    </div>
                    <div className='flex flex-col justify-end'>
                      <span className='uppercase text-midnight font-bold text-xs pb-2'>{game.stage == "CUP_GP" ? "tournament" : ""}</span>
                      <Button className='text-xs px-1 self-end' asChild>
                        <Link href={`/game-recap/${game.id}`}>Game recap</Link>
                      </Button>
                    </div>

                  </div>
                </div>
              ))
            :
            <div className='col-span-3 place-content-center text-center h-[450px]' >
              <h2 className='uppercase text-midnight text-4xl'>No games found.</h2>
            </div>
      }



    </aside>
  )
}

export default GameCard

