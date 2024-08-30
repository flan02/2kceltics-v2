import Image from "next/image";

import MaxWidthWrapper from "@/components/reutilizable/MaxWidthWrapper";
import CelticsHero from "../../public/celtics-hero-removedbg.png";
import { TrophyIcon } from "lucide-react";
import MainMenu from "@/components/custom/MainMenu";
import About from "@/components/custom/About";
import H2underline from "@/components/reutilizable/H2underline";
import Schedule from "@/components/custom/Schedule";
import Roster from "@/components/custom/Roster";
import Marquee from "@/components/reutilizable/Marquee";
import VisitorsCounter from "@/components/custom/VisitorsCounter";
import CelticsLogo from "../../public/celtics-logo.png";


export default async function Home({ searchParams: { page = 0 } }: { searchParams: { page: number } }) {

  return (
    <>
      <Marquee />
      <MaxWidthWrapper className="min-w-[350px] h-[calc(100vh-100px)] lg:h-[calc(100vh-150px)] lg:px-16 xl:px-0 xl:pt-24 md:px-0 place-content-start lg:place-content-end mb-24">
        <div className="space-y-0 md:space-y-8">
          <div className="grid lg:grid-cols-2 grid-cols-1 lg:mb-24 xl:mb-0 mb-0">

            {/* Mobile celtics logo */}
            <section className="mt-16 md:mt-0 md:hidden block px-16 sm:px-48">
              <Image src={CelticsLogo} alt="CelticsTrebol Hero Image" />
            </section>
            {/* ****************** */}


            <article className="flex mt-8 md:order-1 lg:order-0 ">
              <H2underline className="" firstPhrase="Feel the" underlinedPhrase="Celtics" secondPhrase="spirit like never before in our 2k simulation league" />
            </article>
            <section className="place-self-end md:block hidden md:mx-auto md:mt-24 lg:mt-0 md:order-0 lg:order-1 xl:mx-0">
              <Image src={CelticsHero} alt="CelticsStarting5 Hero Image" className="px-0 md:px-10 lg:py-4 lg:px-8 xl:p-0" />
            </section>
          </div>

          <div className="flex items-center justify-center">
            <span className="text-celtics text-shadow text-5xl mr-2 font-bold">x 18</span>
            <TrophyIcon size={40} color="green" className="text-shadow-md" />
          </div>
        </div>
      </MaxWidthWrapper>

      <MaxWidthWrapper className="max-w-screen-3xl bg-zinc-200/60 px-0 sm:px-10 md:px-24">
        <MainMenu />
      </MaxWidthWrapper>

      <MaxWidthWrapper className="max-w-screen-3xl h-screen md:px-16 lg:px-24">
        <About />
      </MaxWidthWrapper>

      {/* <SearchParamsContext.Provider value={{ searchParams }} > */}
      <MaxWidthWrapper className="max-w-screen-3xl bg-zinc-200/60 px-0">
        <Schedule searchParams={{ page }} />
      </MaxWidthWrapper>
      {/*  </SearchParamsContext.Provider> */}

      <MaxWidthWrapper className="relative max-w-screen-3xl h-max px-0">
        <Roster />
      </MaxWidthWrapper>

      <MaxWidthWrapper className="mt-36 py-6 max-w-screen-3xl bg-zinc-200/70">
        <VisitorsCounter />
      </MaxWidthWrapper>
    </>
  );
}

