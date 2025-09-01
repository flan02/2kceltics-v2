import { GameStatProps } from '../dashboard/AddPlayerStatsForm'
import MarkdownRenderer from '@/components/markdown/MarkdownRenderer'
import NoStats from '@/components/reutilizable/NoStats'
import type { $Enums } from '@prisma/client'


type SeasonProps = {
  average: GameStatProps
  total?: GameStatProps
  stage?: string
  span?: string
  opt?: $Enums.Stage
  label: 'Regular Season' | 'Playoffs'
}

const SeasonStats = async ({ average, total, opt, span, label }: SeasonProps) => {
  let title
  switch (span) {
    case 'FIRST_ROUND':
      title = 'First Round'
      break
    case 'ESCF':
      title = 'Eastern Conference Semifinals'
      break
    case 'ECF':
      title = 'Eastern Conference Finals'
      break
    case 'FINALS':
      title = 'The Finals'
      break
    default:
      label
  }

  console.log('current span', span);

  return (
    <section className='mt-4 flex flex-col space-y-20'>
      <div>
        <div className='text-end text-muted-foreground dark:text-zinc-500 uppercase'>
          <p className='uppercase text-celtics lg:font-bold text-sm lg:text-md'>{!span ? label : title} Per Game Stats</p>
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
          <p className='uppercase text-celtics lg:font-bold'>{!span ? label : title} Total Stats</p>
        </div>
        <aside className='flex justify-center'>
          {
            total || span == "82"
              ? <MarkdownRenderer markdown={total!.gamestat} />
              : null //<NoStats />
          }
        </aside>
      </div>
    </section>
  )
}

export default SeasonStats