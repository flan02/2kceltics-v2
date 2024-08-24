/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState } from "react"
import React from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import { Button } from "@/components/ui/button"
import { Check, Cross, Gamepad, LucideCross, TrophyIcon, X } from "lucide-react"
import Image from "next/image"
import { Schedule } from "@prisma/client"
import { clear } from "console"

type Props = {
  game: Omit<Schedule, "updatedAt">
}

const ResultsConfetti = ({ game }: Props) => {
  const { width, height } = useWindowSize()
  const [showResults, setShowResults] = useState(false)
  const [isMountedConfetti, setIsMountedConfetti] = useState(true)


  useEffect(() => {
    setIsMountedConfetti(true)
    let isMounted = true
    if (isMountedConfetti && isMounted) {
      const timeout = setTimeout(() => {
        setIsMountedConfetti(false)
      }, 8000)
      return () => {
        clearTimeout(timeout)

      }
    }
    return () => isMounted = false
  }, [showResults])



  return (
    <div className="text-center p-8 space-y-6 w-full" >
      <Button onClick={() => setShowResults(!showResults)}>
        View Results
      </Button>
      {
        showResults &&
        <div className="space-y-4">
          {
            isMountedConfetti && game.result == "WIN"
              ? <Confetti width={width} height={height} />
              : null
          }
          <div className="flex w-full items-center justify-center">
            <Gamepad color="green" className="mr-2" />
            <h2 className="text-xl text-celtics uppercase">
              Final Score
            </h2>
          </div>
          <div className="flex">
            <div className="flex flex-col w-full items-center justify-end space-y-4">
              <Image src={`/logos/${game.atHome == "AWAY" ? game.team_code1 : game.team_code2}.png`} className="w-auto h-auto" width={40} height={40} alt="celtics-logo" />
              <h6 className="text-midnight text-2xl font-bold">100</h6>
            </div>
            <div className="flex items-center">
              <p className="text-midnight font-bold text-xl">VS</p>
            </div>
            <div className="flex flex-col w-full items-center justify-end space-y-4">
              <Image src={`/logos/${game.atHome == "HOME" ? game.team_code1 : game.team_code2}.png`} className="w-auto h-auto" width={40} height={40} alt={`${game.team2}-logo`} />
              <h6 className="text-midnight text-2xl font-bold">99</h6>
            </div>
          </div>
          {
            game.result == "WIN"
              ?
              <div className="flex justify-center items-end">
                <Check className="mr-2" color="green" />
                <p className="underline text-celtics">CELTICS WIN !!! </p>
              </div>
              :
              <div className="flex justify-center items-end">
                <X className="mr-1" color="red" />
                <p className="underline text-red-500">CELTICS LOSS !!! </p>
              </div>
          }
        </div>
      }
    </div>
  )
}

export default ResultsConfetti