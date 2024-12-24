import Image from 'next/image'
import React from 'react'
import DataCenterLogo from '/public/data-center-chatgpt.png'
import { TextShimmer } from '@/components/core/text-shimmer'

type Props = {}

const DataCenter = (props: Props) => {
  return (
    <section className='mt-10 grid grid-cols-12 min-h-screen'>
      <article className='border col-span-12 md:col-span-9 flex flex-col space-y-12'>
        <div className='flex flex-col space-y-1 items-center mt-8'>
          <TextShimmer className='text-6xl font-bold [--base-color:theme(colors.green.600)] [--base-gradient-color:theme(colors.green.200)] dark:[--base-color:theme(colors.green.700)] dark:[--base-gradient-color:theme(colors.green.400)]'>
            DATA
          </TextShimmer>
          <TextShimmer className='text-6xl font-bold [--base-color:theme(colors.green.600)] [--base-gradient-color:theme(colors.green.200)] dark:[--base-color:theme(colors.green.700)] dark:[--base-gradient-color:theme(colors.green.400)]'>
            CENTER
          </TextShimmer>
        </div>
        <Image src={DataCenterLogo} alt="Data Center" className='size-[400px] mx-auto' />
        <br /><br />
        <div className='w-[80%] mx-auto'>
          <h3 className='text-celtics text-3xl px-2'>&ldquo;Welcome to the Celtics Data Center: your ultimate destination for in-depth season stats and game-changing insights. Explore player performance, team trends behind every win!&rdquo;</h3>
        </div>
      </article>
      <aside className='border col-span-3 hidden md:flex flex-col space-y-8 px-4'>
        <h3 className='font-bold text-center'>KEY POINTS</h3>
        <p>Identify key player performance trends</p>
        <p>Optimize game strategies with real-time insights</p>
        <p>Compare teaams stats across seasons</p>
        <p>Access exclusive celtics-focused stats</p>

      </aside>
    </section>
  )
}

export default DataCenter