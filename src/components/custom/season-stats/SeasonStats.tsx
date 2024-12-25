import { Conference } from "@prisma/client";

import { StatType } from "@prisma/client";

import { $Enums } from "@prisma/client";

import { getPlayerStats } from '@/app/dashboard/actions'
import React from 'react'
import { GameStatProps } from '../dashboard/AddPlayerStatsForm'
import MarkdownRenderer from '@/components/markdown/MarkdownRenderer'
import NoStats from '@/components/reutilizable/NoStats'


type SeasonProps = {
  average: GameStatProps
  total: GameStatProps
  stage?: string
}

const SeasonStats = async ({ average, total, stage }: SeasonProps) => {

  switch (stage) {
    case 'FIRST_ROUND':
      stage = 'First Round'
      break
    case 'ESCF':
      stage = 'Eastern Conference Semifinals'
      break
    default:
      stage = 'Regular Season'
  }
  return (
    <section className='mt-4 flex flex-col space-y-20'>
      <div>
        <div className='text-end text-muted-foreground dark:text-zinc-500 uppercase'>
          <p className='uppercase text-celtics lg:font-bold'>{stage} Per Game Stats</p>
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
          <p className='uppercase text-celtics lg:font-bold'>{stage} Total Stats</p>
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