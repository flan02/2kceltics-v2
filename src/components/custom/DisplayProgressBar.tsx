/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { useEffect, useState } from 'react'
import { Progress } from '../ui/progress'
import usePointsAndTier from '@/hooks/usePointsAndTier'
import AddPointsTester from '../test/addPointsTester'
import { useUserStore } from '@/store/store'
import { set } from 'js-cookie'

type Props = {
  id: string
}

const DisplayProgressBar = ({ id }: Props) => {

  const { userId, setUserId } = useUserStore()
  const { limitPoints, points, percentaje } = usePointsAndTier()


  useEffect(() => {

    if (!userId) setUserId(id)
  }, [])


  return (
    <div className='flex flex-col dark:bg-stone-900 space-x-2 pt-2 px-2'>
      <div className='text-sm text-celtics flex space-x-1 items-end'>
        <p className='text-sm text-celtics pl-2'>Next: </p>
        <p className='text-orange-500 dark:text-bubble-gum animate-pulse'>{points || '...'}</p>/{limitPoints}
        <span className='text-md'>☘</span>
      </div>

      {
        points && !isNaN(percentaje)
          ?
          <>
            <div className='h-[10px] w-full flex items-center space-x-2 mt-3'>
              <Progress className='w-3/4' value={percentaje} max={limitPoints} style={{ backgroundColor: '#007a33' }} />
              <p className='text-orange-500 dark:text-bubble-gum'>{`${percentaje} %` || '...'} </p> {/* +1 temporary fixed... */}
            </div>

            {/* For testing purposes */}
            {/* <AddPointsTester /> */}
          </>
          : <div className='h-[10px] w-full mt-3'>
            <p className='uppercase animate-pulse text-muted-foreground text-xs'>... LOADING</p>
          </div>
      }
    </div>

  )
}

export default DisplayProgressBar





