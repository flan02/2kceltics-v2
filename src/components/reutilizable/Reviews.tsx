/* eslint-disable @next/next/no-img-element */
'use client'
import React, { HTMLAttributes, useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"
import { cn } from "@/lib/utils"
import FadeBorder from "../reutilizable/FadeBorder"
import { Skeleton } from "../ui/skeleton"

type Props = {
  isMounted: boolean
}

type Review = {
  reviews: string[]
  className?: string
  reviewClassName?: (reviewIndex: number) => string
  msPerPixel?: number
}

interface ReviewProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string
  className?: string
}

const PHONES = [
  "/bill-russell.png",
  "/larry-bird.png",
  "/reggie-lewis.png",
  "/antoine-walker.png",
  "/paul-pierce-crypto.png",
  "/tatum-crypto.png",
  "", ""
]


const Reviews = ({ isMounted }: Props) => {

  return (
    <>
      {
        isMounted
          ?
          <ReviewGrid />
          :
          <div className="relative h-screen w-full">
            <Skeleton className="h-[70vh] w-full absolute bottom-44 mb-1.5" />
          </div>
      }
    </>
  )
}

export default Reviews



function ReviewGrid() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.4 })
  const columns = splitArray(PHONES, 1) //
  const firstColumn = columns[0]

  return (<div
    ref={containerRef}
    className="overflow-hidden sm:mt-20 relative sm:-mx-4 h-[80vh] w-max"> {/*grid grid-cols-1 items-start mt-16 gap-8 h-[49rem] max-h-[150vh] md:grid-cols-2 lg:grid-cols-3 */}
    {
      isInView
        ? <>
          <ReviewColumn
            reviews={[...firstColumn]} // [...firstColumn, ...thirdColumn.flat(), ...secondColumn]
            reviewClassName={(reviewIndex: number) =>
              cn({
                "md:hidden": reviewIndex >= firstColumn.length,  // + thirdColumn[0].length
                "lg:hidden": reviewIndex >= firstColumn.length
              })
            }
            msPerPixel={8}
          />

        </>
        : null
    }
    <FadeBorder className="top-0 bg-gradient-to-b" />
    <FadeBorder className="bottom-0 bg-gradient-to-t" />

  </div>)
}


function Review({ imgSrc, className, ...props }: ReviewProps) {
  const POSSIBLE_ANIMATION_DELAY = ["0s", "0.1s", "0.2s", "0.3s", "0.4s", "0.5s"]
  const animationDelay = POSSIBLE_ANIMATION_DELAY[Math.floor(Math.random() * POSSIBLE_ANIMATION_DELAY.length)]
  return (
    <div {...props} className={cn("animate-fade-in rounded-[1.25rem] bg-white opacity-0 shadow-xl shadow-slate-900/5", className)} style={{ animationDelay }}> {/* p-6 */}
      {/* <Phone imgSrc={imgSrc} /> */}
      <img src={imgSrc} alt={imgSrc} className="rounded-[1.25rem] w-[300px] h-[375px] object-cover animate-fade-in bg-white opacity-0 shadow-xl shadow-slate-900/5" />
    </div>
  )
}

function splitArray<T>(array: Array<T>, columns: any) {
  const result: Array<Array<T>> = []
  for (let i = 0; i < array.length; i++) {
    const index = i % columns
    if (!result[index]) result[index] = []
    result[index].push(array[i])
  }
  return result
}

function ReviewColumn({ reviews, className, reviewClassName, msPerPixel = 0 }: Review) {
  const columnRef = useRef<HTMLDivElement | null>(null)
  const [columnHeight, setColumnHeight] = React.useState(0)
  const duration = `${columnHeight * msPerPixel}ms`

  // ? This useEffect handles the resize of the column when the window is resized
  React.useEffect(() => {
    if (!columnRef.current) return
    const resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current?.offsetHeight ?? 0)
    })
    resizeObserver.observe(columnRef.current) // ? Observes the column

    return () => {
      resizeObserver.disconnect() // ? Disconnects the observer - cleanup
    }
  }, [])

  return (
    <div
      ref={columnRef} // ? Ref to the column that is being observed
      className={cn("animate-marquee space-y-8 py-4", className)} // space-y-8 py-4
      style={{ '--marquee-duration': duration } as React.CSSProperties}
    >
      {reviews.concat(reviews).map((imgSrc, reviewIndex) => (
        <Review
          key={reviewIndex}
          imgSrc={imgSrc}
          className={`${reviewClassName?.(reviewIndex)} ${"w-max"}`} />
      ))}
    </div>)
}