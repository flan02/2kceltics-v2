//import DefaultPage from '@/components/reutilizable/DefaultPage'
'use client'
import MdxLayout from '@/components/mdx-layout'
import TotalSeasonStats from '../../components/markdown/TotalSeasonStats.mdx'
import PerGameSeasonStats from '../../components/markdown/PerGameSeasonStats.mdx'
import MaxWidthWrapper from '@/components/reutilizable/MaxWidthWrapper'
import { Button } from '@/components/ui/button'
import React from 'react'


type Props = {}

const SeasonStatsPage = (props: Props) => {
  const photo_dimension = {
    width: 400,
    height: 400
  }
  const className = {
    title: 'xl:text-7xl md:text-5xl lg:text-6xl text-4xl text-celtics leading-tight md:leading-tight lg:leading-tight xl:leading-tight'
  }
  return (
    <MaxWidthWrapper className='min-h-[calc(100vh-150px)] mt-4 mb-12 pb-8 place-content-start border'>
      {/*
      <DefaultPage title={'THIS SITE IS BEING DEVELOPED AT THIS MOMENT'} image_url={'/marcus-smart23.png'} className={className} photo_dimension={photo_dimension} />
      */}
      <h1 className='text-celtics text-4xl md:text-5xl text-center mt-4 md:mt-12'>SEASON STATS</h1>
      <div className='space-x-2 mt-8 mb-4 lg:mb-8'>
        <Button className='dark:bg-celtics dark:hover:bg-celtics/80 p-2 lg:p-4'>Season</Button>
        {/* 
        <Button className='dark:bg-celtics dark:hover:bg-celtics/80'>Playoffs</Button>
        */}

      </div>


      <section className='space-y-20'>
        <div>
          <div className='text-end text-muted-foreground dark:text-zinc-500 uppercase'>
            <p className='uppercase text-celtics lg:font-bold'>regular season per game stats</p>
          </div>
          <aside className='flex justify-center'>
            {/* INSERTED WITHOUT BBDD CALL */}
            <MdxLayout>
              <PerGameSeasonStats />
            </MdxLayout>

          </aside>
        </div>

        <div>
          <div className='text-end text-muted-foreground dark:text-zinc-500 uppercase'>
            <p className='uppercase text-celtics lg:font-bold'>regular season total stats</p>
          </div>
          <aside className='flex justify-center'>
            {/* INSERTED WITHOUT BBDD CALL */}
            <MdxLayout>
              <TotalSeasonStats />
            </MdxLayout>

          </aside>
        </div>
      </section>


      <div className="text-center w-max mt-8 flex flex-col mx-auto">

        <Button className='mt-4 dark:bg-celtics dark:hover:bg-celtics/90 dark:text-black' asChild>
          <a href="/">Back</a>
        </Button>
      </div>
    </MaxWidthWrapper>
  )
}

export default SeasonStatsPage