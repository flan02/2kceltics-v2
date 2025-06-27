import { Season, Tournament } from "@prisma/client";



import SeasonStats from '../../../components/custom/season-stats/SeasonStats'
import MaxWidthWrapper from '@/components/reutilizable/MaxWidthWrapper'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import { getCurrentPlayerStats } from '@/app/dashboard/actions'
import { GameStatProps } from '@/components/custom/dashboard/AddPlayerStatsForm'
import CookieBanner from "@/components/reutilizable/CookieBanner";
import { getNextGame } from "@/app/actions";

//import SelectRSGames from "@/components/custom/season-stats/SelectRSGames";
{/* <SelectRSGames /> */ } {/* FILTER WITH SELECT-OPTION BY SPAN 5,10,15,20,25,30...*/ }

export const dynamic = 'force-dynamic'; // * force static generation to be dynamic

const SeasonsStatPage = async () => {
  const current = process.env.CURRENT_SEASON as Season
  const type: Tournament = process.env.CURRENT_STAGE! as Tournament
  // const type = 'RS'

  let span = await getNextGame()
  span = Number(span) - 1 // Obtains current game
  span = Math.floor(span / 5) * 5 // 5,10,15,20,25,30...

  let parsedSpan: string = span.toString()
  // console.log('parsedSpan', parsedSpan);
  const average = await getCurrentPlayerStats(type, current, 'AVG', 'RS', parsedSpan) as GameStatProps
  const total = await getCurrentPlayerStats(type, current, 'TOTAL', 'RS', '82') as GameStatProps

  return (
    <MaxWidthWrapper className='mt-8 md:mt-12 lg:mt-24 space-y-8'>
      <h1 className='uppercase text-celtics text-2xl lg:text-4xl font-bold'>Season {current}</h1>
      <div className="flex space-x-2">
        <h2 className="text-muted-foreground text-lg">Games Played: <span className="text-celtics font-bold">{span}</span></h2>
      </div>
      <SeasonStats average={average} total={total} span={parsedSpan} label="Regular Season" />
      <br /><br /><br />
      <div className='md:pb-16 lg:pb-24 flex justify-center'>
        <Button asChild className='px-2 py-0 dark:bg-celtics dark:hover:bg-celtics/90 dark:text-black '>
          <Link href="/season-stats" className='text-xs'>BACK</Link>
        </Button>
      </div>
    </MaxWidthWrapper>

  )
}

export default SeasonsStatPage