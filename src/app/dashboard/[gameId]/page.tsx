"use server"
import MaxWidthWrapper from '@/components/reutilizable/MaxWidthWrapper'
import React from 'react'

import { db } from "@/db";
import { cache } from "react";
import { notFound } from 'next/navigation';
import UpdateScheduleGameForm from '@/components/custom/update/UpdateScheduleGameForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';



type PageProps = {
  params: {
    gameId: string // ? its name must be the same as the folder name between brackets []
  }
}

// * This is how I cache the data. I can use the cache function to store the possible data that will come via url at the compile time, so the page will load faster.
const getGame = cache(async (gameId: string) => {
  const game = await db.schedule.findUnique({
    where: {
      id: gameId
    }
  })
  if (!game) return notFound()
  return game
})

const getGames = cache(async () => {
  const games = await db.schedule.findMany(
    {
      where: {
        season: "NBA2K24"  // ! CHECK THAT BECAUSE NOW I USE MORE SEASONS...
      },
      select: {
        id: true
      }
    }
  )
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

export default async function UpdateGamePage({ params: { gameId } }: PageProps) {

  const game = await getGame(gameId)
  // console.log("Game obtained", game);

  /*
    const plainGameObject = {
      ...game,
    };
  */
  return (
    <MaxWidthWrapper className='min-h-screen'>
      <section className='mt-16 space-y-4'>
        <h1 className='text-celtics text-3xl text-center'>UPDATE GAME PANEL</h1>
        <UpdateScheduleGameForm game={game} />
        <div className='pt-8 pb-16'>
          <Button asChild>
            <Link href="/dashboard?opt=schedule">BACK</Link>
          </Button>
        </div>
      </section>
    </MaxWidthWrapper>
  )
}

