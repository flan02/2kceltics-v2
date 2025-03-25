'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Share2 } from 'lucide-react'
import { Button } from '../ui/button'


type Props = {}

const ShareModal = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  // const pageUrl = encodeURIComponent(window.location.href);
  const message = encodeURIComponent("Mirá este partido de los Celtics! 🍀🏀")

  // const shareOptions = [
  //   {
  //     name: "Twitter",
  //     url: `https://twitter.com/intent/tweet?url=${pageUrl}&text=${message}`,
  //   },
  //   {
  //     name: "Facebook",
  //     url: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
  //   },
  //   {
  //     name: "WhatsApp",
  //     url: `https://wa.me/?text=${message}%20${pageUrl}`,
  //   },
  // ]
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="text-xs dark:bg-celtics dark:hover:bg-celtics/90 text-white rounded-lg flex items-center gap-2">
          <Share2 size={18} /> SHARE
        </Button>
      </DialogTrigger>

      <DialogContent className='p-12 fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <DialogHeader className='flex flex-col space-y-4'>
          <DialogTitle>Share this content with your friends</DialogTitle>
          <DialogDescription>Boost your rank! The more you share, the higher you climb</DialogDescription>
        </DialogHeader>

        {/* <div className="flex flex-col gap-3">
          {shareOptions.map((option) => (
            <a
              key={option.name}
              href={option.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-200 p-2 text-muted-foreground rounded-lg text-center hover:bg-gray-200/80 dark:bg-zinc-900/50 dark:hover:bg-zinc-900"
            >
              Share on {option.name}
            </a>
          ))}
        </div> */}
      </DialogContent>

    </Dialog>
  )
}

export default ShareModal