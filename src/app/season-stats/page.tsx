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
      <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-40">
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
            <p className="mt-8 text-md md:text-lg lg:pr-10 max-w-prose text-left sm:text-center lg:text-left text-balance md:text-wrap dark:text-muted-foreground text-midnight">
              Welcome to the Celtics DataCenter: your ultimate destination for in-depth season stats, advanced analytics, and game-changing insights.
              Explores player performance, team trends, and the metrics behind every win!
            </p>
            <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
              <ul className="space-y-2">
                <li className="flex text-xs lg:text-base gap-1.5 items-center text-left dark:text-muted-foreground text-midnight ">
                  <Check className="h-5 w-5 shrink-0 text-green-600" />
                  Identify key player performance trends
                </li>
                <li className="flex gap-1.5 text-xs lg:text-base items-center text-left dark:text-muted-foreground text-midnight ">
                  <Check className="h-5 w-5 shrink-0 text-green-600" />
                  Monitor progress with dynamic visualizations
                </li>
                <li className="flex gap-1.5 text-xs lg:text-base items-center text-left dark:text-muted-foreground text-midnight ">
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
        <div className="col-span-full lg:col-span-1 hidden w-full lg:block mt-32 lg:mx-0 lg:mt-20 h-fit">
          <Image src={TheJays} alt="The Jays Trophy" className="w-full object-cover" />
        </div>
      </MaxWidthWrapper>

      <MaxWidthWrapper className=''>
        <ChooseStats />
      </MaxWidthWrapper>

      <MaxWidthWrapper className='lg:pt-20 h-[300px]'>
        <div className='flex space-x-2 items-center dark:text-muted-foreground'>
          <p>You can check the previous season stats</p>
          <Link href='previous-seasons' className='font-bold hover:underline'>[here] </Link>
          &nbsp; or
          <div className=''>
            <Button asChild className='px-2 py-0 dark:bg-celtics dark:hover:bg-celtics/90 dark:text-black'>
              <Link href="/" className='text-xs'>BACK</Link>
            </Button>
          </div>
        </div>
        <br /><br /><br /><br />
        <p className='text-muted-foreground text-xs'>** Full Data Center stats are displayed since season 2024-25</p>
      </MaxWidthWrapper>
    </>
  )
}

export default SeasonStatsPage


