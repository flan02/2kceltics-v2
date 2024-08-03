import Image from "next/image";
import { Button } from "@/components/ui/button"
import MaxWidthWrapper from "@/components/reutilizable/MaxWidthWrapper";
import CelticsHero from "../../public/celtics-hero-removedbg.png";
import { TrophyIcon } from "lucide-react";
import MainMenu from "@/components/custom/MainMenu";
import Schedule from "@/components/custom/Schedule";

export default function Home() {
  return (
    <>
      <MaxWidthWrapper className="h-[calc(100vh-50px)] md:px-0 place-content-center">
        <div>
          <div className="grid grid-cols-2">
            <article className="flex mt-8">
              <h1 className="text-celtics text-shadow-md text-7xl text-center uppercase line-height-4">
                Feel the <span className="text-celtics underline">Celtics</span> spirit like never before
                in our 2k simulation league
              </h1>
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

      <MaxWidthWrapper className="max-w-screen-3xl bg-slate-100/50">
        <MainMenu />
      </MaxWidthWrapper>

      <MaxWidthWrapper className="max-w-screen-3xl">
        <Schedule />
      </MaxWidthWrapper>
    </>
  );
}
