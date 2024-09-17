import Image from "next/image"
import Link from "next/link"

import IsaiahThomas from "../../../../public/isaiahthomas.jpg";
import BigThree from "../../../../public/bigthree.jpg";
import JaysonTatumPoster from "../../../../public/jaysononlebron.jpg";

import ScheduleTag from '@/components/custom/ScheduleTag';
import RosterTag from '@/components/custom/RosterTag';


type Props = {}

const DesktopMenu = (props: Props) => {
  return (
    <aside className='hidden lg:grid lg:grid-cols-4 lg:grid-rows-2 lg:mt-12'>
      <div className='relative h-[450px] inline-block filter grayscale hover:grayscale-0 transition duration-300'>
        <Image src={JaysonTatumPoster} alt="jaylen brown poster" className='block lg:object-cover xl:object-cover' fill sizes="(max-width: 768px) 100vw, 33vw" priority />
        <div className='relative flex h-full justify-center items-center '>
          <Link href='/streamed-games' className='text-center text-3xl xl:text-5xl text-white hover:text-yellow-50 z-10 hover:underline'>
            <span> STREAMED <br /> GAMES </span>
          </Link>
        </div>
        <div className="absolute inset-0"></div>
      </div>
      <div className='relative h-[450px] inline-block border border-black filter grayscale hover:grayscale-0 transition duration-300'>
        <Image src={IsaiahThomas} alt="isaiah thomas poster" className='block lg:object-cover xl:object-cover' fill sizes="(max-width: 768px) 100vw, 33vw" priority />
        <div className='relative flex h-full justify-center items-center '>
          <Link href='/advanced' className='text-center text-3xl xl:text-5xl text-white hover:text-yellow-50 z-10 hover:underline'>
            <span> ADVANCED <br /> STATS </span>
          </Link>
        </div>
        <div className="absolute inset-0"></div>
      </div>
      <div className='relative h-[450px] col-span-2 inline-block border border-black filter grayscale hover:grayscale-0 transition duration-300'>
        <Image src={BigThree} alt="big three poster" className='block lg:object-cover xl:object-fill' fill sizes="(max-width: 768px) 100vw, 33vw" priority />
        <div className='relative flex h-full justify-center items-center '>
          <Link href='/season-stats' className='text-center text-3xl xl:text-5xl text-white hover:text-yellow-50 z-10 hover:underline'>
            <span> SEASON STATS </span>
          </Link>
        </div>
        <div className="absolute inset-0">
        </div>
      </div>

      <RosterTag />
      <ScheduleTag />

    </aside>
  )
}

export default DesktopMenu