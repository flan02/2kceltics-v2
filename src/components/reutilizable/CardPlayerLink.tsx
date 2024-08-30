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
  player: StaticImageData
  cardTitle: string
  className?: string
  isTag: boolean
  link: string
  dim: {
    width: string
    height: string
  }
}

const CardPlayerLink = ({ player, cardTitle, className, isTag, link, dim }: Props) => {
  return (
    <aside>
      <Card className="flex items-center shadow-md h-[120px] mx-2">
        <CardTitle className="text-muted-foreground hover:underline ml-4 text-xl w-full">
          {
            isTag
              ? <LinkClient to={link} smooth="true" duration={1000} className='uppercase text-muted-foreground'>{cardTitle}</LinkClient>
              : <Link href={link} className="uppercase text-muted-foreground">{cardTitle}</Link>
          }
        </CardTitle>
        <CardContent className="relative w-full flex justify-end ">
          <Image
            src={player}
            alt={cardTitle}
            className={`mt-2 block object-contain ${dim.width} ${dim.height}`} sizes="(max-width: 768px) 100vw, 33vw" priority />
        </CardContent>
      </Card>

    </aside>
  )
}

export default CardPlayerLink