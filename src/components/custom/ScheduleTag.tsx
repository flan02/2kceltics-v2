'use client'
import Image from 'next/image'
import JaylenBrownPoster from "../../../public/jaylenbrown.jpg";
import { Link } from "react-scroll"


type Props = {
  playoffs: boolean
}

const ScheduleTag = ({ playoffs }: Props) => {
  const PO = true
  return (

    <div
      className={`relative h-[230px] ${playoffs ? "col-span-2" : "col-span-3"} inline-block filter grayscale hover:grayscale-0 transition duration-300`}>
      <Image src={JaylenBrownPoster} alt="jaylen brown poster" className='block lg:object-cover xl:object-cover' fill sizes="(max-width: 768px) 100vw, 33vw" priority />
      <div className='relative flex h-full justify-center items-center '>
        <Link to='schedule' smooth="true" duration={1000} className='text-3xl xl:text-5xl text-white hover:text-yellow-50 z-10 hover:underline'>2023/24 SCHEDULE
        </Link>
      </div>
      <div className="absolute inset-0"></div>
    </div>

  )
}

export default ScheduleTag