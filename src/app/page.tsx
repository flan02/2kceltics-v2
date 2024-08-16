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
export default async function Home({ searchParams: { page, skip } }: { searchParams: { page: number, skip: number } }) {

  return (
    <>
      <Marquee />
      <MaxWidthWrapper className="h-[calc(100vh-100px)] lg:h-[calc(100vh-150px)] lg:px-16 xl:px-0 xl:pt-24 md:px-0 place-content-start lg:place-content-center mb-24">
        <div>
          <div className="grid md:grid-cols-2 grid-cols-1">
            <section className="mt-24 md:mt-0 md:hidden block px-16">
              <Image src={CelticsLogo} alt="CelticsTrebol Hero Image" />
            </section>
            <article className="flex mt-8">
              <H2underline className="" firstPhrase="Feel the" underlinedPhrase="Celtics" secondPhrase="spirit like never before in our 2k simulation league" />

            </article>
            <section className="place-self-end md:block hidden">
              <Image src={CelticsHero} alt="CelticsStarting5 Hero Image" className="lg:px-8 px-0 xl:px-0" />
            </section>
          </div>

          <div className="flex items-center justify-center">
            <span className="text-celtics text-shadow text-5xl mr-2 font-bold">x 18</span>
            <TrophyIcon size={40} color="green" className="text-shadow-md" />
          </div>
        </div>
      </MaxWidthWrapper>

      <MaxWidthWrapper className="max-w-screen-3xl bg-zinc-200/60">
        <MainMenu />
      </MaxWidthWrapper>

      <MaxWidthWrapper className="max-w-screen-3xl h-screen">
        <About />
      </MaxWidthWrapper>

      <MaxWidthWrapper className="max-w-screen-3xl bg-zinc-200/60">
        <Schedule page={page} skip={skip} />
      </MaxWidthWrapper>

      <MaxWidthWrapper className="relative max-w-screen-3xl h-max">
        <Roster />
      </MaxWidthWrapper>

      <MaxWidthWrapper className="mt-36 py-8 max-w-screen-3xl bg-zinc-100/60">
        <VisitorsCounter />
      </MaxWidthWrapper>
    </>
  );
}
