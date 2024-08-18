/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import useVisitorsCounter from '@/hooks/useVisitorsCounter'



type Props = {}

const VisitorsCounter = (props: Props) => {
  const print = useVisitorsCounter()

  const digits = print.visitCounter?.toString().split('')


  return (
    <div className='flex justify-center items-end'>
      <h1 className='text-xl text-celtics text-center underline mr-4'>VISITORS COUNTER:</h1>
      {
        digits?.map((digit, index) => (
          <span key={index} className='bg-celtics hover:bg-white hover:text-celtics mr-2 px-2 text-3xl text-white'> {digit}</span>
        ))
      }
    </div>
  )
}

export default VisitorsCounter