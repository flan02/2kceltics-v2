"use server"
import MaxWidthWrapper from '@/components/reutilizable/MaxWidthWrapper'
import React from 'react'

import { db } from "@/db";
import { cache } from "react";
import { notFound } from 'next/navigation';
import UpdateScheduleGameForm from '@/components/custom/update/UpdateScheduleGameForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FaXTwitter } from 'react-icons/fa6';
import StreamingLive from '@/components/custom/dashboard/StreamingLive';


interface PageProps {
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


export default async function UpdateGamePage({ params: { gameId } }: PageProps) {

  const game = await getGame(gameId)

  if (!game) notFound();

  const ShareOnX = () => {
    const hashTags = '#NBA2K25 #BackToBack #Celtics #NBA #Basketball'
    const tweetText = encodeURIComponent(`Check out this NBA2K25 game! ☘✨\nRegular Season - Game #${game.currentGame} ${game.team1} vs ${game.team2}\nWatch game stats: https://www.2kceltics.xyz/game-recap/${gameId}\n${hashTags}`)
    const tweetUrl = encodeURIComponent(`https://youtu.be/${game.video_url}`); // https://youtu.be/  || // https://www.youtube.com/watch?v=

    const shareUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${tweetUrl}`;

    return (
      <Link href={shareUrl} target="_blank" rel="noopener noreferrer" className="">
        <FaXTwitter size={20} color='#FFF' className='bg-black rounded-sm' />
      </Link>
    );
  };

  return (
    <MaxWidthWrapper className='min-h-screen'>
      <section className='mt-16 space-y-4'>
        <h1 className='text-celtics text-3xl text-center'>UPDATE GAME PANEL</h1>
        <div className='flex justify-between items-center space-x-1'>
          <StreamingLive game={game} /> {/* Client side component */}
          <div className='flex space-x-1 items-center'>
            <span className='text-lg text-muted-foreground'>Share on: </span>
            <ShareOnX />
          </div>
        </div>
        <UpdateScheduleGameForm game={game} />
        <br />
        <div className='pt-8 pb-16'>
          <Button asChild>
            <Link href="/dashboard?opt=schedule">BACK</Link>
          </Button>
        </div>
      </section>
    </MaxWidthWrapper>
  )
}

// * This is how I generate static paths. After this fc the slugs will be generated immediately and the page will be created faster
/*
export async function generateStaticParams() {
  const games = await getGames()
  return games.map((id) => ({ params: { gameId: id } }))
}
*/

// * Asynchronous function to generate metadata for the page
/* 
export async function generateMetadata({ params: { gameId } }: PageProps): Promise<Metadata> {
  const game = await getGame(add id here)
  const metadata = {
    title: `Update Game ${game.id}`,
    description: `Update the game ${game.id} with the form below`
  }
}
*/