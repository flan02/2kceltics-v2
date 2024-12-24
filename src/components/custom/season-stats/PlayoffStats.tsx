import { $Enums } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

type PlayoffProps = {
  season: $Enums.Season
  round?: string
}

const PlayoffStats = ({ season, round }: PlayoffProps) => {
  return (
    <section>
      <nav className=''>
        <Link href={`/season-stats?opt=playoffs&round=first`} className=''>
          {round === 'first' ? <p>First Round</p> : <p>First Round</p>}
        </Link>
      </nav>
    </section>
  )
}

export default PlayoffStats

/* 
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
*/