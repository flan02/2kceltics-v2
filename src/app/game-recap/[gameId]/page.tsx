import ResultsConfetti from "@/components/custom/game-recap/ResultsConfetti"
import MaxWidthWrapper from "@/components/reutilizable/MaxWidthWrapper"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { db } from "@/db"

import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { cache } from "react"
import BoxScoreMarkdown from "@/components/markdown/BoxScoreMarkdown.mdx"


import { MDXProvider } from "@mdx-js/react"
import MarkdownRendered from "@/components/markdown/MarkdownRenderer"
import { markdownToHtml } from "@/lib/markdownToHtml"
import GamePlayerStats from "@/components/markdown/GamePlayerStats"
import { Box } from "lucide-react"
import Markdown from "@/components/markdown/Markdown"
import MarkdownRenderer from "@/components/markdown/MarkdownRenderer"
import { stat } from "fs"

type PageProps = {
  params: {
    gameId: string // ? its name must be the same as the folder name between brackets []
  }
  searchParams: {
    stats: string
  }
}

// * This is how I cache the data. I can use the cache function to store the possible data that will come via url at the compile time, so the page will load faster.
const getGame = cache(async (gameId: string) => {
  try {
    const game = await db.schedule.findUnique({
      where: {
        id: gameId
      }
    })
    if (!game) return notFound()

    return game
  } catch (error) {
    console.error(error);
  }
})


const getGames = cache(async () => {
  const games = await db.schedule.findMany({
    select: {
      id: true
    }
  })
  //console.log("ALL GAMES OBTAINED", games)
  return games
})


// * This is how I generate static paths. After this fc the slugs will be generated immediately and the page will be created faster
export async function generateStaticParams() {
  const games = await getGames()
  return games.map(({ id }) => ({ params: { gameId: id } }))
}


// * Asynchronous function to generate metadata for the page
/* 
export async function generateMetadata() {
  const game = await getGame(add id here)
  const metadata = {
    title: `Update Game ${game.id}`,
    description: `Update the game ${game.id} with the form below`
  }
}
*/


export default async function GameIdPage({ params: { gameId }, searchParams: { stats } }: PageProps) {

  const game = await getGame(gameId)
  /*
    const markdownBoxScore = game?.boxscoreTeam1
    const contentHtml = await markdownToHtml(markdownBoxScore!)
   <div dangerouslySetInnerHTML={{ __html: contentHtml }} id="boxscore" />
  */

  const BOS = stats === game?.team_code1
  const OPP = stats === game?.team_code2
  const TOTAL = stats === "TOTAL"
  return (
    <MaxWidthWrapper className='min-h-screen max-w-4xl'>
      <section className='mt-16 space-y-4'>
        <h1 className='text-celtics text-3xl text-center'>GAME RECAP</h1>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-2 min-h-[330px]">

          <Card className="md:flex md:justify-center py-4 block md:py-0">
            <div className="w-full flex justify-center md:block">
              <CardHeader>
                <CardTitle className="text-midnight font-bold uppercase">{`Season ${game?.season} Game #${game?.currentGame}`}</CardTitle>
              </CardHeader>
              <CardContent>

                <CardDescription className="flex items-center">
                  <span className="text-slate-700 text-lg font-bold mr-2">VS</span>
                  <Image src={`/logos/${game?.team_code2}.png`} width={100} height={100} className='mr-2 w-16 h-16' alt={`${game?.team_code2}-logo`} />
                </CardDescription>


                <CardDescription className="flex flex-col space-y-1 mt-4">
                  <span className="text-base text-slate-800 font-bold">Type: {game?.type === "RS" ? "Regular Season" : "Playoffs"}</span>
                  <span className="text-base text-slate-800 font-bold">Rival: {game?.team2}</span>
                  <span className="text-base text-slate-800 font-bold">at {game?.atHome}</span>
                </CardDescription>

              </CardContent>
              <CardFooter>
              </CardFooter>
            </div>

            <ResultsConfetti game={game!} />
          </Card>
        </div>
        <Card>
          <CardContent>
            <CardDescription className="py-8 flex justify-between items-end">
              <span className="text-midnight font-bold text-xl" >Game details</span>
              <span className="space-x-1">
                <Button asChild className="text-xs px-2 md:text-base">
                  <Link href={`./${game?.id}?stats=${game?.team_code1}`}>{game?.team_code1}</Link>
                </Button>
                <Button asChild className="text-xs px-2 md:text-base">
                  <Link href={`./${game?.id}?stats=${game?.team_code2}`}>{game?.team_code2}</Link>
                </Button><Button asChild className="text-xs px-2 md:text-base">
                  <Link href={`./${game?.id}?stats=TOTAL`}>TOTAL</Link>
                </Button>
              </span>
            </CardDescription>

            {/* MARKDOWN CONTENT SERVER SIDE */}


          </CardContent>
          <CardContent className="w-max mx-auto">
            {stats === undefined && <MarkdownRenderer markdown={game?.boxscoreTeam1!} />}
            {BOS ? <MarkdownRenderer markdown={game?.boxscoreTeam1!} /> : null}
            {OPP ? <MarkdownRenderer markdown={game?.boxscoreTeam2!} /> : null}
            {TOTAL ? <MarkdownRenderer markdown={game?.gameStats!} /> : null}

          </CardContent>

        </Card>
        <div className="text-center pb-16">
          <Button asChild>
            <Link href="/streamed-games">BACK</Link>
          </Button>
        </div>
      </section>


    </MaxWidthWrapper>
  )
}

