"use server"
import MaxWidthWrapper from '@/components/reutilizable/MaxWidthWrapper'
import React from 'react'

import { db } from "@/db";
import { cache } from "react";
import { notFound } from 'next/navigation';
import UpdateScheduleGameForm from '@/components/custom/update/UpdateScheduleGameForm';



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
        season: "NBA2K24"
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
  const game = await getGame(gameId)
  const metadata = {
    title: `Update Game ${game.id}`,
    description: `Update the game ${game.id} with the form below`
  }
}
*/

export default async function UpdateGamePage({ params: { gameId } }: PageProps) {

  const game = await getGame(gameId)
  // console.log("Game obtained", game);
  return (
    <MaxWidthWrapper className='min-h-screen'>
      <section className='mt-16'>
        <h1 className='text-celtics text-3xl text-center'>UPDATE GAME PANEL</h1>
        <UpdateScheduleGameForm game={game} />
      </section>
    </MaxWidthWrapper>
  )
}

