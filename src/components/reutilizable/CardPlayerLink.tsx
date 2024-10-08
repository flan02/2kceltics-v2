"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import { Link as LinkClient } from "react-scroll"

type Props = {
  player?: StaticImageData
  cardTitle: string
  className?: string
  isTag: boolean
  link: string
  dim?: {
    width: string
    height: string
  }
  icon: React.ReactNode
}

const CardPlayerLink = ({ player, cardTitle, className, isTag, link, dim, icon }: Props) => {
  return (
    <aside>
      <Card className="flex items-center shadow-md h-[80px] mx-2">
        <CardTitle className="text-muted-foreground dark:text-zinc-700 hover:underline ml-4 text-xl w-full">
          {
            isTag
              ? <LinkClient to={link} smooth="true" duration={1000} className='uppercase text-muted-foreground dark:text-zinc-700'>{cardTitle}</LinkClient>
              : <Link href={link} className="uppercase text-muted-foreground dark:text-zinc-700">{cardTitle}</Link>
          }
        </CardTitle>
        <CardContent className="w-fit flex justify-center mr-4">
          <div className="absolute">
            {icon}
          </div>
        </CardContent>
      </Card>

    </aside>
  )
}

export default CardPlayerLink