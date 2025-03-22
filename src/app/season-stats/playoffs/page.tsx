import { Season, Stage, Tournament } from "@prisma/client";

import SeasonStats from '../../../components/custom/season-stats/SeasonStats'
import MaxWidthWrapper from '@/components/reutilizable/MaxWidthWrapper'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import { getCurrentPlayerStats, getPlayerStatsTotals } from '@/app/dashboard/actions'
import { GameStatProps } from '@/components/custom/dashboard/AddPlayerStatsForm'
import NavbarFilter from "@/components/custom/season-stats/NavbarFilter";



const PlayoffsStatPage = async ({ searchParams: { opt } }: { searchParams: { opt: Stage } }) => {
  const current = process.env.CURRENT_SEASON as Season


  const PLAYOFFS = process.env.NEXT_PUBLIC_PLAYOFFS!
  let type: Tournament
  if (PLAYOFFS == 'true') {
    type = 'PO'
  } else {
    type = 'RS'
  }
  // TODO: possible stage change -> FIRST_ROUND, ESCF, ECF, FINALS, ALL_GAMES

  const stage = opt

  let average, total, span

  if (!opt) {
    span = '30' // ! CHECK THIS LINE WHEN PLAYOFFS START
    average = await getPlayerStatsTotals(type, current, 'AVG', stage, span) as GameStatProps
    total = await getPlayerStatsTotals(type, current, 'TOTAL', stage, span) as GameStatProps
  }
  else {
    span = undefined
    average = await getCurrentPlayerStats(type, current, 'AVG', stage) as GameStatProps
    total = await getCurrentPlayerStats(type, current, 'TOTAL', stage) as GameStatProps
  }

  return (
    <MaxWidthWrapper className='mt-8 md:mt-12 lg:mt-24 space-y-8'>
      <h1 className='uppercase text-celtics text-2xl lg:text-4xl font-bold'>Playoffs {current}</h1>
      {
        type == 'PO'
          ? <>
            <NavbarFilter opt={opt} />
            <SeasonStats average={average} total={total} stage={stage} span={opt} label="Playoffs" />
            <br /><br /><br />

          </>
          : <section className="h-[500px]">
            <div className="flex justify-center items-center h-full">
              <h1 className="text-4xl">No Playoffs Data Available Yet.</h1>
            </div>
          </section>
      }
      <div className='md:pb-16 lg:pb-24 flex justify-center'>
        <Button asChild className='px-2 py-0 mb-4 dark:bg-celtics dark:hover:bg-celtics/90 dark:text-black '>
          <Link href="/season-stats" className='text-xs'>BACK</Link>
        </Button>
      </div>
    </MaxWidthWrapper>

  )
}

export default PlayoffsStatPage