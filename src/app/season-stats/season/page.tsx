import { Season } from "@prisma/client";



import SeasonStats from '../../../components/custom/season-stats/SeasonStats'
import MaxWidthWrapper from '@/components/reutilizable/MaxWidthWrapper'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import { getPlayerStats } from '@/app/dashboard/actions'
import { GameStatProps } from '@/components/custom/dashboard/AddPlayerStatsForm'



const SeasonsStatPage = async () => {
  const current = process.env.CURRENT_SEASON as Season
  const type = 'RS'
  const average = await getPlayerStats(type, current, 'AVG', 'RS') as GameStatProps // 3rd param ... span
  const total = await getPlayerStats(type, current, 'TOTAL', 'RS') as GameStatProps
  const opt = undefined

  return (
    <MaxWidthWrapper className='mt-8 md:mt-12 lg:mt-24 space-y-8'>
      <h1 className='uppercase text-celtics text-2xl lg:text-4xl font-bold'>Season {current}</h1>
      <SeasonStats average={average} total={total} span={opt} label="Regular Season" />
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