'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FaGamepad, FaTwitch } from "react-icons/fa6"

type Props = {
  game: any
}

const StreamingLive = ({ game }: Props) => {

  const TweeterTwitchLive = () => {
    const hashTags = '#NBA2K25 #BackToBack #Celtics #NBA #Basketball'
    const tweetText = encodeURIComponent(`Going live now! 🎮 Who's tuning in to watch the game? Drop by the chat and let’s talk basketball!\nGame #${game.currentGame} | ${game.team1} vs ${game.team2}\n${hashTags}`)
    const tweetUrl = encodeURIComponent(`https://twitch.tv/flano2`)

    const shareUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${tweetUrl}`;

    return (
      <Link href={shareUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-black hover:bg-black/80 dark:hover:bg-black/30 rounded-lg text-white px-4 py-2">
        <FaGamepad size={20} color='#FFF' />
        <span className="text-xs md:text-md">
          Tweet: Live on Twitch!
        </span>
      </Link>
    );
  };

  return (
    <TweeterTwitchLive />

  )
}

export default StreamingLive