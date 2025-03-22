//import DefaultPage from '@/components/reutilizable/DefaultPage'

import MaxWidthWrapper from '@/components/reutilizable/MaxWidthWrapper'
import { Button } from '@/components/ui/button'
import React from 'react'
import { $Enums } from '@prisma/client'
import Link from 'next/link'
import { Check } from 'lucide-react'
import Basketball from '@/components/reutilizable/Basketball'
import Dots from '@/components/reutilizable/Dots'
import TheJays from '/public/the_jays_trophy-no-bg.png'
import Image from 'next/image'
import VisitorsCounter from '@/components/custom/season-stats/VisitorsCounter'
import ChooseStatsDesktop from '@/components/custom/season-stats/ChooseStatsDesktop'
import ChooseStatsMobile from '@/components/custom/season-stats/ChooseStatsMobile'
import VideoPlayer from '@/components/reutilizable/VideoPlayer'


const SeasonStatsPage = async ({ searchParams: { opt, round } }: { searchParams: { opt: string, round?: string } }) => {

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
              <h1 className="relative w-fit tracking-tight text-balance mt-0 lg:mt-16 font-bold !leading-tight text-gray-500 text-5xl md:text-6xl lg:text-7xl">Track every stat in our <span className="bg-[#ddd] dark:bg-[#222] text-celtics px-2">Data Center</span> </h1>
              <Dots className='xl:block hidden' />
            </div>

            <div className="lg:hidden flex mt-10 -ml-24">
              <Dots className='animate-slide' />
              <Basketball className="animate-roll ml-4 size-12" />
            </div>
            <p className="mt-12 lg:mt-8 text-md md:text-lg lg:pr-10 max-w-prose text-center lg:text-left sm:text-center text-balance md:text-wrap dark:text-muted-foreground text-midnight">
              <span className='font-bold text-lg lg:text-xl'>W</span>elcome to the Celtics DataCenter: your ultimate destination for in-depth season stats, advanced analytics, and game-changing insights.
            </p>
            <p className="mt-6 lg:mt-8 text-md md:text-lg lg:pr-10 max-w-prose text-center sm:text-center lg:text-left text-balance md:text-wrap dark:text-muted-foreground text-midnight">
              <span className='font-bold text-lg lg:text-xl'>E</span>xplores player performance, team trends, and the metrics behind every win!</p>

            <aside className="mt-24 lg:mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
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
            </aside>
            <div className="mt-24 lg:mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <section className="flex flex-col justify-between items-center sm:items-start space-y-4">
                <article className=' flex items-end'>
                  <VisitorsCounter />
                </article>
              </section>
            </div>
          </div>
        </div>
        <div className="col-span-full lg:col-span-1 hidden w-full lg:block mt-32 lg:mx-0 lg:mt-20 h-fit">
          <VideoPlayer src="/gifs/sprite-stars.webm" alt="Sprite Stars" className="hidden lg:block fixed top-[1/2] lg:mt-36 lg:ml-36 xl:mt-36 xl:ml-40 left-[1/2] transform -translate-x-1/2 -translate-y-1/2 w-24 h-auto z-10 rounded-md" />
          <Image src={TheJays} alt="The Jays Trophy" className="w-full object-cover" />
          <VideoPlayer src="/gifs/sprite-stars.webm" alt="Sprite Stars" className="hidden lg:block fixed top-[0.1] lg:-mt-40 lg:ml-64 xl:-mt-44 xl:ml-64 left-[0.1] transform -translate-x-1/2 -translate-y-1/2 w-24 h-auto z-10 rounded-md" />
        </div>
      </MaxWidthWrapper>

      {/* DESKTOP VISIBLE */}
      <MaxWidthWrapper className='lg:block hidden'>
        <ChooseStatsDesktop />
      </MaxWidthWrapper>

      {/* MOBILE VISIBLE */}
      <MaxWidthWrapper className='block lg:hidden'>
        <ChooseStatsMobile />
      </MaxWidthWrapper>

      <MaxWidthWrapper className='lg:pt-20 h-[300px]'>
        <div className='flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-2 items-center dark:text-muted-foreground'>
          <p className='text-muted-foreground'>You can check the previous season stats</p>
          <Link href='previous-seasons' className='font-bold hover:underline'>[here] </Link>
          &nbsp;or
          <div className=''>
            <Button asChild className='px-2 py-0 dark:bg-celtics dark:hover:bg-celtics/90 dark:text-black'>
              <Link href="/" className='text-xs'>GO BACK</Link>
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


