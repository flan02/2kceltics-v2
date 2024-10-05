import Image from 'next/image'
import React from 'react'

type Props = {}

const MarqueePO = (props: Props) => {
  return (
    <div className="absolute whitespace-nowrap overflow-hidden w-[100%] top-[50px] left-0 dark:bg-nighty bg-zinc-300/60 uppercase font-bold">
      <div className='min-w-full flex items-center animate-marquee-xs text-celtics dark:text-green-50'>

        <Image src='/playoffs-logo.png' alt='playoffs-logo' width={80} height={80} className='w-auto h-auto' />
        <h6 className="inline-block uppercase ml-24 mr-24 text-xs md:text-base">NEXT GAME #R1G1:  &nbsp; Boston Celtics vs Miami Heat</h6>


      </div>

    </div>
  )
}

export default MarqueePO