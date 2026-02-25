import Image from "next/image";
import React from "react";

import MaxWidthWrapper from "@/components/reutilizable/MaxWidthWrapper";
// import CelticsHero from "../../public/celtics-hero-removedbg.png";
import CelticsHero from "../../public/celtics-hero-2025-26.png";
import MainMenu from "@/components/custom/MainMenu";
import About from "@/components/custom/About";
import H2underline from "@/components/reutilizable/H2underline";
import Schedule from "@/components/custom/Schedule";
import Marquee from "@/components/reutilizable/Marquee";
import VisitorsCounter from "@/components/custom/VisitorsCounter";

import TheJays from "../../public/the_jays_trophy-no-bg.png";
import { AnimatedNumberBasic } from "@/components/reutilizable/AnimatedNumberBasic";
import Roster from "@/components/custom/Roster";
import VideoPlayer from "@/components/reutilizable/VideoPlayer";

// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { Icons } from "@/components/custom/Icons";



export default async function Home({ searchParams: { page = 0 } }: { searchParams: { page: number } }) {

  return (
    <>
      <Marquee />
      <MaxWidthWrapper className="min-w-[350px] h-[calc(100vh-100px)] lg:h-[calc(100vh-150px)] lg:px-16 xl:px-0 xl:pt-24 md:px-0 place-content-start lg:place-content-end mb-36">
        <div className="space-y-0 md:space-y-8">
          <div className="grid lg:grid-cols-2 grid-cols-1 lg:mb-24 xl:mb-0 mb-0">

            {/* Mobile celtics logo */}
            <section className="mt-8 md:mt-0 md:hidden block ">
              {/* for mobile it worked with size-40 */}
              <Image src={TheJays} alt="CelticsTrebol Hero Image" className="mx-auto w-[304px] h-72" />
              <VideoPlayer src="/gifs/sprite-stars.webm" alt="Sprite Stars" className="lg:hidden block fixed top-[0.1] -mt-44 -ml-4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-auto z-10 rounded-md" />
              <VideoPlayer src="/gifs/sprite-stars.webm" alt="Sprite Stars" className="lg:hidden block fixed top-[0.1] -mt-36 ml-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-auto z-10 rounded-md" />
            </section>
            {/* ****************** */}

            <article className="flex mt-8 md:order-1 lg:order-0">
              <H2underline className="text-grad" firstPhrase="Feel the" underlinedPhrase="Celtics" secondPhrase="spirit like never before in our 2k simulation league" />
            </article>

            <section className="relative place-self-end md:block hidden md:mx-auto md:mt-24 lg:mt-0 md:order-0 lg:order-1 xl:mx-0">
              <VideoPlayer src="/gifs/twinkle-stars.webm" alt="Twinkle Stars" className="hidden lg:block lg:fixed top-[0.1] left-1/4 -ml-32 xl:-mt-8 lg:mt-4 transform -translate-x-1/2 -translate-y-1/2 lg:w-40 xl:w-56 h-auto z-10 rounded-md" />
              <VideoPlayer src="/gifs/twinkle-stars.webm" alt="Twinkle Stars" className="hidden lg:block lg:fixed top-[0.1] left-1/2 lg:ml-[320px] lg:mt-8 xl:ml-[500px] transform -translate-x-1/2 -translate-y-1/2 w-24 h-auto z-10 rounded-md" />
              <VideoPlayer src="/gifs/twinkle-stars.webm" alt="Twinkle Stars" className="hidden lg:block lg:fixed lg:top-[460px] xl:top-[500px] left-1/2 lg:ml-[180px] lg:mt-8 xl:ml-[320px] transform -translate-x-1/2 -translate-y-1/2 w-24 h-auto z-10 rounded-md" />
              <Image src={CelticsHero} alt="Celtics Big3 Hero Image" className="x-0 md:px-10 lg:py-4 lg:px-8 xl:p-0" />

              {/* <Button className="absolute w-[80%] py-6 -mb-16 bottom-4 left-1/2 transform -translate-x-1/2 bg-black hover:bg-black/80 text-white shadow-lg dark:bg-gray-200 dark:text-black dark:hover:bg-gray-200/90 font-bold">
                <Icons.nbaLogo width={40} height={40} />
                <Link href="/nba-stats">GO TO NBA STATS</Link>
              </Button> */}

            </section>
          </div>

          <div className="flex items-center justify-center ">
            {/* <span className="text-celtics text-shadow text-5xl mr-2 font-bold">x 18</span>*/}
            <AnimatedNumberBasic />
            {/* <TrophyIcon size={40} color="green" className="text-shadow-md" /> */}
            <VideoPlayer src="/gifs/sprite-stars.webm" alt="Sprite Stars" className="hidden lg:block lg:fixed top-[1/3] mt-48 ml-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-auto z-10 rounded-md" />
            <Image className="w-auto h-auto -mt-8" src='/trophy.png' alt='celtics' width={35} height={35} />
          </div>
        </div>




      </MaxWidthWrapper>

      <MaxWidthWrapper className="max-w-screen-3xl dark:bg-night-80/50 bg-zinc-200/60 px-0 sm:px-10 md:px-24">
        <MainMenu />
      </MaxWidthWrapper>

      <MaxWidthWrapper className="max-w-screen-3xl h-max pb-0 lg:pb-32 md:px-16 lg:px-24">
        <About />
      </MaxWidthWrapper>

      {/* <SearchParamsContext.Provider value={{ searchParams }} > */}
      <MaxWidthWrapper className="max-w-screen-3xl dark:bg-night-80/50 bg-zinc-200/60 px-0">
        <Schedule searchParams={{ page }} />
      </MaxWidthWrapper>
      {/*  </SearchParamsContext.Provider> */}

      <MaxWidthWrapper className="relative max-w-screen-3xl h-max px-0">
        <Roster />
      </MaxWidthWrapper>

      <MaxWidthWrapper className="mt-36 py-6 max-w-screen-3xl bg-zinc-200/70 dark:bg-night-80/50">
        <VisitorsCounter />
      </MaxWidthWrapper>
    </>
  );
}

