//import DefaultPage from '@/components/reutilizable/DefaultPage'

import MaxWidthWrapper from '@/components/reutilizable/MaxWidthWrapper'
import { Button, buttonVariants } from '@/components/ui/button'
import React from 'react'


import { $Enums } from '@prisma/client'

import Link from 'next/link'
import { ArrowBigLeft, Check, Database, Phone, Star } from 'lucide-react'
import SeasonStats from '@/components/custom/season-stats/SeasonStats'
import PlayoffStats from '@/components/custom/season-stats/PlayoffStats'
import DataCenter from '@/components/custom/season-stats/DataCenter'
import Basketball from '@/components/reutilizable/Basketball'
import Dots from '@/components/reutilizable/Dots'


import TheJays from '/public/the_jays_trophy-no-bg.png'
import Image from 'next/image'
import VisitorsCounter from '@/components/custom/season-stats/VisitorsCounter'
import ChooseStats from '@/components/custom/season-stats/ChooseStats'

const SeasonStatsPage = async ({ searchParams: { opt, round } }: { searchParams: { opt: string, round?: string } }) => {
  const season = process.env.CURRENT_SEASON! as $Enums.Season

  //console.log(opt);

  const rs = opt === 'season'
  const po = opt === 'playoffs'

  return (
    <>
      <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52">
        <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
          <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="absolute w-40 left-0 -top-20 hidden lg:flex">
              <Dots className='animate-slide' />
              <Basketball className="animate-roll ml-4 size-24" />

            </div>
            <div className='flex items-end'>
              <h1 className="relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-500 text-5xl md:text-6xl lg:text-7xl">Track every stats on our <span className="bg-[#ddd] dark:bg-[#222] text-celtics px-2">Data Center</span> </h1>
              <Dots className='xl:block hidden' />
            </div>
            <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap dark:text-gray-300 text-midnight">
              Welcome to the Celtics Data Center: your ultimate destination for in-depth season stats, advanced analytics, and game-changing insights.
              Explores player performance, team trends, and the metrics behind every win!


            </p>
            <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
              <ul className="space-y-2">
                <li className="flex gap-1.5 items-center text-left dark:text-gray-300 text-midnight ">
                  <Check className="h-5 w-5 shrink-0 text-green-600" />
                  Identify key player performance trends
                </li>
                <li className="flex gap-1.5 items-center text-left dark:text-gray-300 text-midnight ">
                  <Check className="h-5 w-5 shrink-0 text-green-600" />
                  Monitor progress with dynamic visualizations
                </li>
                <li className="flex gap-1.5 items-center text-left dark:text-gray-300 text-midnight ">
                  <Check className="h-5 w-5 shrink-0 text-green-600" />
                  Access exclusive 2k Celtics-focused analytics
                </li>
              </ul>
            </ul>
            <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">

              <section className="flex flex-col justify-between items-center sm:items-start space-y-4">

                <article className=' flex items-end'>
                  <VisitorsCounter />

                </article>
              </section>
            </div>
          </div>
        </div>
        <div className="col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit">
          <div className="relative md:max-w-2xl">

            {/* Custom component */}
            <Image src={TheJays} alt="The Jays Trophy" className="w-full" />

          </div>
        </div>


      </MaxWidthWrapper>

      <MaxWidthWrapper className=''>
        <ChooseStats />

      </MaxWidthWrapper>

      <MaxWidthWrapper className=''>
        <div>
          <p>You can check the previous season stats [here]</p>
        </div>
      </MaxWidthWrapper>
    </>
  )
}

export default SeasonStatsPage


/* 
<MaxWidthWrapper className='min-h-screen mt-4 mb-12 pb-8 place-content-start border'>

      <h1 className='text-celtics text-4xl md:text-5xl text-center mt-4 md:mt-12'>SEASON STATS</h1>
      <nav className='flex justify-start space-x-1 mt-8'>

        <div className='mr-8 space-x-2'>
          <Link href="/season-stats?opt=season" className={buttonVariants({
            variant: `${(opt === 'addteam') ? 'default' : 'outline'}`,
            className: `transition-all duration-500 ease-in-out text-gray-500 ${opt !== 'addteam' ? " hover:bg-zinc-200/60 dark:hover:bg-zinc-800/20 hover:text-gray-400" : ""}`
          })}>
            Season
          </Link>
          <Link href="/season-stats?opt=playoffs" className={buttonVariants({
            variant: `${(opt === 'addteam') ? 'default' : 'outline'}`,
            className: `transition-all duration-500 ease-in-out text-gray-500 ${opt !== 'addteam' ? " hover:bg-zinc-200/60 dark:hover:bg-zinc-800/20 hover:text-gray-400" : ""}`
          })}>
            Playoffs
          </Link>
        </div>
        {
          opt
            ? <Link href="/season-stats" className={buttonVariants({
              variant: `${(opt === 'addteam') ? 'default' : 'outline'}`,
              className: `transition-all duration-500 ease-in-out text-gray-500 ${opt !== 'addteam' ? " hover:bg-zinc-200/60 dark:hover:bg-zinc-800/20 hover:text-gray-400" : ""}`
            })}>
              <ArrowBigLeft size={24} className='' fill='orange' />
            </Link>
            : null
        }
      </nav>




      <section className='space-y-20'>
        {
          opt != 'season' && opt != 'playoffs'
            ? <DataCenter />
            : opt === 'season'
              ? <SeasonStats season={season} />
              : <PlayoffStats season={season} round={round!} />
        }

      </section>


      <div className="text-center w-max flex flex-col mx-auto relative">
        <Button className='mt-4 dark:bg-celtics dark:hover:bg-celtics/90 dark:text-black' asChild>
          <a href="/">Back</a>
        </Button>
      </div>
    </MaxWidthWrapper>
*/