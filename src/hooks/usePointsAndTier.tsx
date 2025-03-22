/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { LimitPoints, TierNames } from '@/lib/types'
import { KY, Method } from '@/services/api'
import { useEffect } from 'react'

import { usePointsStore, useUserStore } from '@/store/store'
import { getPointsAndTier, upgradeTier } from '@/app/actions'
import { calculatePercentage } from '@/lib/utils'

const usePointsAndTier = () => {

  const { userId } = useUserStore()

  const { points, tier, percentaje, limitPoints, setPoints, setTier, setPercentaje, setLimitPoints } = usePointsStore()

  const getUserPoints = async () => {
    const data: any = await KY(Method.GET, '/api/v1/points')
    const points: number = data.userData[0].totalPoints
    const tier: TierNames = data.userData[0].tier
    const limitPoints = data.userData[0].limitPoints

    setPoints(points)
    setTier(tier)
    setLimitPoints(limitPoints)

    let tiers = Object.keys(LimitPoints) as TierNames[]
    let currentIndex = tiers.indexOf(tier)

    const percentaje = calculatePercentage(points, LimitPoints[tiers[currentIndex + 1]], LimitPoints[tiers[currentIndex]])
    let fixedPercentaje
    if (points === 1) {
      fixedPercentaje = percentaje + 1
    } else {
      fixedPercentaje = percentaje
    }

    setPercentaje(fixedPercentaje)

  }

  async function getNextLimitPoints() {
    if (!userId) return
    const userPointsAndTier = await getPointsAndTier(userId)

    const limit = userPointsAndTier[0].limitPoints
    return limit
  }


  useEffect(() => {
    getUserPoints()
  }, [points])

  useEffect(() => {
    let tiers = Object.keys(LimitPoints) as TierNames[]
    let currentIndex = tiers.indexOf(tier)
    const percentaje = calculatePercentage(points, LimitPoints[tiers[currentIndex + 1]], LimitPoints[tiers[currentIndex]])
    setPercentaje(percentaje)
    //console.log('adding points', points, limitPoints, `${percentaje}%`)
    if (points == limitPoints) {
      // console.log('NEW TIER UNLOCKED')
      const nextLimit = tiers[currentIndex + 1] ? LimitPoints[tiers[currentIndex + 2]] : LimitPoints[tier]
      setLimitPoints(nextLimit)
      upgradeTier(userId!, points, limitPoints, tier) // * Update tier in db

    }
  }, [points])

  useEffect(() => {
    getNextLimitPoints().then((updatedLimit) => { // * Retrieve new limitPoints from db
      setLimitPoints(updatedLimit as number)
    })

    let tiers = Object.keys(LimitPoints) as TierNames[]
    let currentIndex = tiers.indexOf(tier)
    const percentaje = calculatePercentage(points, limitPoints, LimitPoints[tiers[currentIndex + 1]])

    if (percentaje != 0) setPercentaje(percentaje)

  }, [limitPoints])


  useEffect(() => {
    if (points == limitPoints) {
      let tiers = Object.keys(LimitPoints) as TierNames[]
      let currentIndex = tiers.indexOf(tier)

      const nextLimit = LimitPoints[tiers[currentIndex + 2]];
      const prevLimit = LimitPoints[tiers[currentIndex + 1]];
      const percentaje = calculatePercentage(points, nextLimit, prevLimit)

      setPercentaje(percentaje)
    }
  }, [points, limitPoints])


  return { limitPoints, setPoints, setTier, points, tier, percentaje, setLimitPoints, setPercentaje }
}

export default usePointsAndTier


// MODIFY TO UPDATE POINTS AND TIER
// if ((window.performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming).type !== 'reload') {
//   ky.post('/api/v1/addvisit',
//    { json: { count: data.count + 1 } }).json()
//   await KY(Method.POST, '/api/v1/points', { json: { count: data.count + 1 } })
// }





