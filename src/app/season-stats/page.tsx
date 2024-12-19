//import DefaultPage from '@/components/reutilizable/DefaultPage'

import MaxWidthWrapper from '@/components/reutilizable/MaxWidthWrapper'
import { Button } from '@/components/ui/button'
import React from 'react'
import { getPlayerStats } from '../dashboard/actions'
import MarkdownRenderer from '@/components/markdown/MarkdownRenderer'
import { GameStatProps } from '@/components/custom/dashboard/AddPlayerStatsForm'
import { $Enums } from '@prisma/client'
import NoStats from '@/components/reutilizable/NoStats'


type Props = {}

const SeasonStatsPage = async () => {
  const season = process.env.CURRENT_SEASON! as $Enums.Season

  const average = await getPlayerStats(season, 'AVG') as GameStatProps
  const total = await getPlayerStats(season, 'TOTAL') as GameStatProps

  //console.log(average)

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
            {
              average
                ? <MarkdownRenderer markdown={average.gamestat} />
                : <NoStats />
            }
          </aside>
        </div>

        <div>
          <div className='text-end text-muted-foreground dark:text-zinc-500 uppercase'>
            <p className='uppercase text-celtics lg:font-bold'>regular season total stats</p>
          </div>
          <aside className='flex justify-center'>
            {
              total
                ? <MarkdownRenderer markdown={total.gamestat} />
                : <NoStats />
            }

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

/*
const photo_dimension = { width: 400, height: 400 }
const className = { title: 'xl:text-7xl md:text-5xl lg:text-6xl text-4xl text-celtics leading-tight md:leading-tight lg:leading-tight xl:leading-tight' }
*/
/* INSERTED WITHOUT BBDD CALL 
          <MdxLayout>
            <PerGameSeasonStats />
          </MdxLayout>
*/