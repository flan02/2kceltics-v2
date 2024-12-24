import { getPlayerStats } from '@/app/dashboard/actions'
import React from 'react'
import { GameStatProps } from '../dashboard/AddPlayerStatsForm'
import { $Enums } from '@prisma/client'
import MarkdownRenderer from '@/components/markdown/MarkdownRenderer'
import NoStats from '@/components/reutilizable/NoStats'

type SeasonProps = {
  season: $Enums.Season
}

const SeasonStats = async ({ season }: SeasonProps) => {
  const average = await getPlayerStats(season, 'AVG') as GameStatProps
  const total = await getPlayerStats(season, 'TOTAL') as GameStatProps
  return (
    <section className='mt-4 flex flex-col space-y-20'>
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

  )
}

export default SeasonStats