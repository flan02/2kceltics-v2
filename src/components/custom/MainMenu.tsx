import React from 'react'
import JaylenBrownPoster from "../../../public/jaylenbrown.jpg";
import IsaiahThomas from "../../../public/isaiahthomas.jpg";
import BigThree from "../../../public/bigthree.jpg";
import MarcusSmart from "../../../public/smart.jpg";
import JaysonTatumPoster from "../../../public/jaysononlebron.jpg";
import Image from 'next/image';
type Props = {}

const MainMenu = (props: Props) => {
  return (
    <article className="max-w-screen-xl mx-auto pt-24">
      <h1 className="text-celtics mx-auto w-max text-center text-7xl text-shadow uppercase mt-24">Main Menu</h1>
      <aside className=' grid grid-cols-4 grid-rows-2 mt-12'>
        <div className='relative h-[450px] inline-block filter grayscale hover:grayscale-0 transition duration-300'>
          <Image src={JaysonTatumPoster} alt="jaylen brown poster" className='block object-cover' fill sizes="(max-width: 768px) 100vw, 33vw" priority />
          <div className="absolute inset-0"></div>
        </div>
        <div className='relative h-[450px] inline-block border border-black filter grayscale hover:grayscale-0 transition duration-300'>
          <Image src={IsaiahThomas} alt="isaiah thomas poster" className='block ' fill sizes="(max-width: 768px) 100vw, 33vw" priority />
          <div className="absolute inset-0"></div>
        </div>
        <div className='relative h-[450px] col-span-2 inline-block border border-black filter grayscale hover:grayscale-0 transition duration-300'>
          <Image src={BigThree} alt="paul pierce poster" className='block' fill sizes="(max-width: 768px) 100vw, 33vw" priority />
          <div className="absolute inset-0"></div>
        </div>

        <div className='relative h-[230px] inline-block filter grayscale hover:grayscale-0 transition duration-300'>
          <Image src={MarcusSmart} alt="marcus smart poster" className='block ' fill sizes="(max-width: 768px) 100vw, 33vw" priority />
          <div className="absolute inset-0"></div>
        </div>
        <div className="relative h-[230px] col-span-3 inline-block filter grayscale hover:grayscale-0 transition duration-300">
          <Image src={JaylenBrownPoster} alt="jaylen brown poster" className='block object-cover' fill sizes="(max-width: 768px) 100vw, 33vw" priority />
          <div className="absolute inset-0"></div>
        </div>
      </aside>
    </article>
  )
}

export default MainMenu