import Image from "next/image";
import { Button } from "@/components/ui/button"
import MaxWidthWrapper from "@/components/reutilizable/MaxWidthWrapper";
import CelticsHero from "../../public/celtics-hero-removedbg.png";
import { TrophyIcon } from "lucide-react";
import MainMenu from "@/components/custom/MainMenu";
import About from "@/components/custom/About";
import H2underline from "@/components/reutilizable/H2underline";
import Schedule from "@/components/custom/Schedule";

export default function Home() {
  return (
    <>
      <MaxWidthWrapper className="h-[calc(100vh-50px)] md:px-0 place-content-center">
        <div>
          <div className="grid grid-cols-2">
            <article className="flex mt-8">
              <H2underline firstPhrase="Feel the" underlinedPhrase="Celtics" secondPhrase="spirit like never before in our 2k simulation league" />

            </article>
            <section className="place-self-end">
              <Image src={CelticsHero} alt="Celtics Hero Image" className="" />
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

      <MaxWidthWrapper className="max-w-screen-3xl h-screen bg-zinc-200/60">
        <Schedule />
      </MaxWidthWrapper>

      <MaxWidthWrapper className="py-12 max-w-screen-2xl">
        <div className=''>
          <h1 className='text-3xl lowercase text-celtics text-center'>VISITORS COUNTER: &nbsp; 13 000</h1>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
