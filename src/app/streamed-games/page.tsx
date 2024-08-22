import FilterForm from "@/components/custom/streamed-games/FilterForm"
import DefaultPage from "@/components/reutilizable/DefaultPage"
import MaxWidthWrapper from "@/components/reutilizable/MaxWidthWrapper"
import { getStreamedGames } from "./action"



type Props = {}

export default async function StreamedGamesPage() {
  const filteredGames = await getStreamedGames({
    season: 'NBA2K24',
    type: 'RS',
    stage: undefined,
    atHome: undefined,
    result: undefined
  })



  return (
    <MaxWidthWrapper className='min-w-[350px] lg:max-w-5xl lg:px-0 mb-16'>
      <section className='flex flex-col justify-start items-center mt-16 py-8 border border-slate-200 rounded-lg w-full min-h-screen'>
        <h1 className=' text-center text-4xl text-celtics'>STREAMED GAMES</h1>
        <br />
        <FilterForm filteredGames={filteredGames} />
      </section>
    </MaxWidthWrapper>
  )
}

