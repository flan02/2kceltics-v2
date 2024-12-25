import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
//import CelticsOldDuo from "../../../../public/antoine-walker-paul-pierce.png";
import Pp11 from "../../../../public/pp11-three.png";
import KP_dunk from "../../../../public/kp-dunk.png";
type Props = {}

const ChooseStats = (props: Props) => {


  // TODO: CREATE AN INTERFACE FOR MOBILE PHONES !

  return (
    <aside className='hidden lg:grid grid-cols-1 lg:grid-cols-2 lg:mt-12 px-20'>
      <div className='relative h-[500px] inline-block filter grayscale hover:grayscale-0 transition duration-300'>
        <Image src={Pp11} alt="jaylen brown poster" className='block lg:object-cover xl:object-cover' fill sizes="(max-width: 768px) 100vw, 33vw" priority />
        <div className='relative flex h-full justify-center items-center '>
          <Link href='/season-stats/season' className='text-center text-3xl xl:text-5xl text-white hover:text-yellow-50 z-10 hover:underline'>
            <span> SEASON <br /> STATS </span>
          </Link>
        </div>
        <div className="absolute inset-0"></div>
      </div>
      <div className='relative h-[500px] inline-block filter grayscale hover:grayscale-0 transition duration-300'>
        <Image src={KP_dunk} alt="kp_dunk" className='block lg:object-cover xl:object-cover' fill sizes="(max-width: 768px) 100vw, 33vw" priority />
        <div className='relative flex h-full justify-center items-center '>
          <Link href='/season-stats/playoffs' className='text-center text-3xl xl:text-5xl text-white hover:text-yellow-50 z-10 hover:underline'>
            <span className='text-gray-200'> PLAYOFFS <br /> STATS </span>
          </Link>
        </div>
        <div className="absolute inset-0"></div>
      </div>

    </aside>
  )
}

export default ChooseStats