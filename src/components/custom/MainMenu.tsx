
import React from 'react'

import IsaiahThomas from "../../../public/isaiahthomas.jpg";
import BigThree from "../../../public/bigthree.jpg";
import MarcusSmart from "../../../public/smart.jpg";
import JaysonTatumPoster from "../../../public/jaysononlebron.jpg";
import Image from 'next/image';
import ScheduleTag from './ScheduleTag';
type Props = {}

const MainMenu = (props: Props) => {
  return (
    <article className="max-w-screen-xl mx-auto pt-24">
      <h1 className="text-celtics mx-auto w-max text-center text-7xl text-shadow uppercase mt-24">Main Menu</h1>
      <aside className=' grid grid-cols-4 grid-rows-2 mt-12'>
        <div className='relative h-[450px] inline-block filter grayscale hover:grayscale-0 transition duration-300'>
          <Image src={JaysonTatumPoster} alt="jaylen brown poster" className='block object-cover' fill sizes="(max-width: 768px) 100vw, 33vw" priority />
          <div className='relative flex h-full justify-center items-center '>
            <h1 className='text-center text-5xl text-slate-200 hover:text-white z-10 hover:underline'>STREAMED <br /> GAMES</h1>
          </div>
          <div className="absolute inset-0"></div>
        </div>
        <div className='relative h-[450px] inline-block border border-black filter grayscale hover:grayscale-0 transition duration-300'>
          <Image src={IsaiahThomas} alt="isaiah thomas poster" className='block ' fill sizes="(max-width: 768px) 100vw, 33vw" priority />
          <div className='relative flex h-full justify-center items-center '>
            <h1 className='text-center text-5xl text-slate-200 hover:text-white z-10 hover:underline'>ADVANCED <br /> STATS</h1>
          </div>
          <div className="absolute inset-0"></div>
        </div>
        <div className='relative h-[450px] col-span-2 inline-block border border-black filter grayscale hover:grayscale-0 transition duration-300'>
          <Image src={BigThree} alt="big three poster" className='block' fill sizes="(max-width: 768px) 100vw, 33vw" priority />
          <div className='relative flex h-full justify-center items-center '>
            <h1 className=' text-5xl text-slate-200 hover:text-white z-10 hover:underline'>SEASON STATS</h1>
          </div>
          <div className="absolute inset-0">
          </div>
        </div>

        <div className='relative h-[230px] inline-block filter grayscale hover:grayscale-0 transition duration-300'>
          <Image src={MarcusSmart} alt="marcus smart poster" className='block ' fill sizes="(max-width: 768px) 100vw, 33vw" priority />
          <div className='relative flex h-full justify-center items-center '>
            <h1 className=' text-5xl text-slate-200 hover:text-white z-10 hover:underline'>STANDINGS</h1>
          </div>
          <div className="absolute inset-0"></div>
        </div>
        <ScheduleTag />

      </aside>
    </article>
  )
}

export default MainMenu