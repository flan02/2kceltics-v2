"use server"
import NotFound from "@/app/not-found"
import UpdatePlayoffsForm from "@/components/custom/playoffs/UpdatePlayoffsForm"

import MaxWidthWrapper from "@/components/reutilizable/MaxWidthWrapper"
import { Button } from "@/components/ui/button"

import Link from "next/link"

import { getPlayoffsGames, getSeeds } from "./action"




interface PageProps {
  params: {
    playoffsId: string // ? its name must be the same as the folder name between brackets []
  }
}



export default async function PlayoffsEditPage({ params: { playoffsId } }: PageProps) {

  const seeds = await getSeeds(playoffsId)
  const response = await getPlayoffsGames(playoffsId)
  //console.log(response?.gamesPlayed);
  if (!seeds) return NotFound()

  return (
    <MaxWidthWrapper className='min-h-screen'>
      <section className='mt-16 space-y-4'>
        <h1 className='text-celtics text-3xl text-center'>UPDATE PLAYOFFS PANEL</h1>
        <UpdatePlayoffsForm seeds={seeds} gamesPlayed={response?.gamesPlayed} playoffsId={playoffsId} />
        <div className='pt-8 w-full pb-12 text-center'>
          <Button asChild>
            <Link href="/dashboard?opt=addplayoffs" className="dark:bg-celtics hover:dark:bg-celtics/80">BACK</Link>
          </Button>
        </div>
      </section>
    </MaxWidthWrapper>

  )
}