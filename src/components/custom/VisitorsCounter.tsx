/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import useVisitorsCounter from '@/hooks/useVisitorsCounter'
import { KY, Method } from '@/services/api'
import { ReactNode, useEffect, useState } from 'react'


type Props = {}

const VisitorsCounter = (props: Props) => {
  const print = useVisitorsCounter()
  return (
    <div className=''>
      <h1 className='text-xl lowercase text-celtics text-center'>VISITORS COUNTER: &nbsp; {print.visitCounter}</h1>
    </div>
  )
}

export default VisitorsCounter