/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import useVisitorsCounter from '@/hooks/useVisitorsCounter'
import BackToTop from '../reutilizable/BackToTop'



type Props = {}

const VisitorsCounter = (props: Props) => {
  const print = useVisitorsCounter()

  const digits = print.visitCounter?.toString().split('')


  return (
    <div className='flex justify-center items-end'>
      <h1 className='text-xl text-celtics text-center underline mr-4'>VISITORS COUNTER:</h1>
      {
        digits?.map((digit, index) => (
          <span key={index} className='bg-celtics hover:bg-white hover:text-celtics mr-2 px-2 text-xl md:text-3xl text-white'> {digit}</span>
        ))
      }
      <BackToTop className='lg:mt-0' />
    </div>
  )
}

export default VisitorsCounter