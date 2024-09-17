import Image from 'next/image'
import React from 'react'
import Yo from "../../../public/yo-unbackground.png";
import { Twitch, Youtube } from 'lucide-react';
import Link from 'next/link';

type Props = {}

const About = (props: Props) => {
  return (
    <section className="max-w-screen-xl mx-auto lg:pb-0 lg:pt-12">
      <h1 className="text-celtics mx-auto w-max text-center text-5xl sm:text-6xl lg:text-7xl text-shadow uppercase mt-16 lg:mt-24">Our Mission</h1>
      <article className='max-w-screen-lg mt-16 h-max mx-auto px-3 md:px-0'>
        <h3 className='text-celtics text-shadow text-base sm:text-lg lg:text-xl'>
          As a Celtics fan, you can now experience the thrill of the game like never before. Our 2k simulation league is the perfect place to feel the Celtics spirit and enjoy the game in a new way. Join us and be part of the action!
        </h3>
        <br />
        <h3 className='text-celtics text-shadow text-base md:text-lg lg:text-xl'>
          This season 2023/24, we have prepared an exciting schedule with streamed games, advanced stats, and season stats. You can also check the standings and follow the games in real-time. Do not miss out on the fun!
        </h3>
        <br />
        <h3 className='text-celtics text-shadow text-base md:text-lg lg:text-xl'>
          You can follow us on social media and share your thoughts with other fans. We are always looking for ways to improve our virtual league and make it more enjoyable for everyone. Let us know what you think and help us grow!
        </h3>
        <div className='mt-12 flex justify-end'>
          <div>
            <Link className='flex items-center'
              href="https://www.youtube.com/channel/UCz_FxdOU_XMhTKtZMuqwKNQ" target='_blank'>
              <span className='hover:underline dark:text-zinc-500 text-xs mr-2 uppercase'>Follow us on Youtube </span>
              <Youtube size={32} color='red' />
            </Link>
            <Link className='flex items-center'
              href="https://www.twitch.tv/flano2" target='_blank'>
              <span className='hover:underline dark:text-zinc-500 text-xs mr-3 uppercase'>Follow us on Twitch </span>
              <Twitch size={30} color='purple' />

            </Link>
          </div>
        </div>
        <div className='flex mt-8 items-center justify-end'>
          <Image src={Yo} alt='Profile photo' className='size-16 mt-1 rounded-full' />
          <h6 className='text-muted-foreground text-sm md:text-base ml-4'>
            Best regards, <br />
            Dan Chanivet. <br />
            Creator of 2kceltics.xyz
          </h6>
        </div>
      </article>
    </section>
  )
}

export default About