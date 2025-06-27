'use client'

import { FaXTwitter } from "react-icons/fa6"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useEffect, useState } from "react"


type Props = {}

const ShareOnX = (props: Props) => {
  const [message, setMessage] = useState<string>('')
  let url
  const tweetText = encodeURIComponent(message)
  const tweetUrl = url ? encodeURIComponent(url) : "";
  const shareUrl = `https://twitter.com/intent/tweet?text=${tweetText}${tweetUrl ? `&url=${tweetUrl}` : ""}`;


  const messageCleaner = async () => {
    await setTimeout(() => {
      setMessage('')
    }, 2000)
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <h2 className="text-muted-foreground text-lg">Share some thoughts on </h2>
        <FaXTwitter size={20} color='#FFF' className='bg-black rounded-sm' />
      </div>
      <Textarea
        placeholder="What are the good news today..."
        className="w-full h-40 text-celtics caret-celtics"
        value={message}
        onChange={(e: any) => setMessage(e.target.value)}
      />
      <Link onClick={messageCleaner} href={shareUrl} target="_blank" rel="noopener noreferrer" className="dark:bg-celtics bg-black hover:bg-black/90 text-white px-4 text-center py-2 rounded">Post</Link>
    </div>
  )
}

export default ShareOnX