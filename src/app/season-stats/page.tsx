import DefaultPage from '@/components/reutilizable/DefaultPage'
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
    <MaxWidthWrapper className='min-h-[calc(100vh-150px)] mt-4 pb-16 place-content-start border'>
      {/*
      <DefaultPage title={'THIS SITE IS BEING DEVELOPED AT THIS MOMENT'} image_url={'/marcus-smart23.png'} className={className} photo_dimension={photo_dimension} />
      */}
      <h1 className='text-celtics text-5xl'>SEASON STATS 2023/24</h1>
      <div className='space-x-2'>
        <Button className='dark:bg-celtics dark:hover:bg-celtics/80'>Regular Season</Button>
        <Button className='dark:bg-celtics dark:hover:bg-celtics/80'>Playoffs</Button>

      </div>
      <div className="text-center w-max mt-8 flex flex-col mx-auto">

        <Button className='mt-4 dark:bg-celtics dark:hover:bg-celtics/90 dark:text-black' asChild>
          <a href="/">Back</a>
        </Button>
      </div>
    </MaxWidthWrapper>
  )
}

export default SeasonStatsPage