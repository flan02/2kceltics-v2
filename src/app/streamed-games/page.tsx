import FilterForm from "@/components/custom/streamed-games/FilterForm"
import MaxWidthWrapper from "@/components/reutilizable/MaxWidthWrapper"
import { getStreamedGames } from "./action"
import { Button } from "@/components/ui/button"
import Link from "next/link"



type Props = {
  searchParams: {
    page: number
  }
}

export default async function StreamedGamesPage({ searchParams: { page = 0 } }: Props) {
  let request = await getStreamedGames({
    season: 'NBA2K24',
    type: 'RS',
    stage: undefined,
    atHome: undefined,
    result: undefined
  })

  let filteredGames = request!
    .filter((game: any) => game.video_url !== null)
    .sort((a: any, b: any) => parseInt(b.currentGame) - parseInt(a.currentGame))







  return (
    <MaxWidthWrapper className='min-w-[350px] lg:max-w-5xl lg:px-0 mb-16'>
      <section className='flex flex-col justify-start items-center mt-16 py-8 border border-slate-200 rounded-lg w-full min-h-screen'>
        <h1 className=' text-center text-4xl text-celtics'>STREAMED GAMES</h1>
        <br />

        <FilterForm filteredGames={filteredGames} />


      </section>
      <div className="text-center w-max mt-8 flex flex-col mx-auto">

        <Button className='mt-4' asChild>
          <a href="/">Back</a>
        </Button>
      </div>
    </MaxWidthWrapper>
  )
}

