'use client'
import Image from 'next/image'
import MarcusSmart from "../../../public/smart.jpg";
import { Link } from "react-scroll"

type Props = {}

const RosterTag = (props: Props) => {
  return (
    <div className='relative h-[230px] inline-block filter grayscale hover:grayscale-0 transition duration-300'>
      <Image src={MarcusSmart} alt="marcus smart poster" className='block lg:object-cover xl:object-cover' fill sizes="(max-width: 768px) 100vw, 33vw" priority />
      <div className='relative flex h-full justify-center items-center '>
        <Link to='roster' smooth="true" duration={1000} className='text-3xl xl:text-5xl text-slate-200 hover:text-white z-10 hover:underline'>
          ROSTER
        </Link>
      </div>
      <div className="absolute inset-0"></div>
    </div>
  )
}

export default RosterTag