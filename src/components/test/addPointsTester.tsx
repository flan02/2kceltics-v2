'use client'


import { usePointsStore, useUserStore } from "@/store/store"
import { Button } from "../ui/button"

import { addPoints } from "@/app/actions"


type Props = {}

const AddPointsTester = () => {
  const { userId } = useUserStore()
  const multiplier: number = 1
  const { points, setPoints } = usePointsStore()

  const fcAddPoints = async () => {

    const addedPoints = await addPoints(userId!)
    setPoints(addedPoints.totalPoints)
  }

  return (
    <Button className="mt-4" onClick={fcAddPoints} >simulate +1</Button>
  )
}

export default AddPointsTester

// without db
/* 
 return (
    <Button className="mt-4" onClick={() => {
      setPoints(points + multiplier)

    }} >points +1</Button>
  )
*/