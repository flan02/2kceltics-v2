
'use client'
import { useState, useEffect, useMemo } from 'react';
import Box from './Box';
import Box2 from './Box2';
import BoxTheFinals from './BoxTheFinals';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getCurrentPlayoffs } from '@/lib/utils';
import type { Seed } from '@prisma/client';


type SeedProps = {
  seeds: Omit<Seed, 'id' | 'playoffsId' | 'createAt' | 'updatedAt'>[]
}


const PlayoffsBracket = ({ seeds }: SeedProps) => {


  const [empty, setEmpty] = useState(true); // * During RS, in playoffs this value turns into false
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window !== 'undefined') {


      setDimensions({ width: window.innerWidth, height: window.innerHeight });
      const handleResize = () => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);


  const PLAYOFFS = getCurrentPlayoffs()

  const westQuarters = useMemo(() => { return seeds.filter(b => b.conference == "WEST") }, [seeds]);
  const eastQuarters = useMemo(() => { return seeds.filter(b => b.conference == "EAST") }, [seeds]);
  const westSemis = useMemo(() => { return seeds.filter(b => b.conference == "WEST" && b.wins > 3) }, [seeds]);
  const eastSemis = useMemo(() => { return seeds.filter(b => b.conference == "EAST" && b.wins > 3) }, [seeds]);
  const westFinals = useMemo(() => { return seeds.filter(b => b.conference == "WEST" && b.wins > 7) }, [seeds]);
  const eastFinals = useMemo(() => { return seeds.filter(b => b.conference == "EAST" && b.wins > 7) }, [seeds]);
  const theFinals = useMemo(() => { return seeds.filter(b => b.wins > 11) }, [seeds]);

  // console.log("WEST SEMI FINALS", westSemis);
  // console.log("west semis length", westSemis.length);
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <br />
      <h1 className='text-3xl sm:text-5xl text-celtics mt-16 lg:mt-8 sm:mt-4 mb-4 lg:mb-8'>PLAYOFFS {PLAYOFFS}</h1>
      <div className='w-full max-w-full overflow-x-auto overflow-y-hidden'>

        <div className={`min-w-[1024px] border shadow-xl rounded-xl p-4 grid grid-cols-7 gap-4 ${dimensions.width < 640 ? 'text-xs' : 'text-base'} text-white`}>
          {/* First Column - Western Conference */}
          <div className="">
            <Box bracket={westQuarters} order={empty} />
          </div>

          {/* Second Column - Western Conference SemiFinals - Next Round */}
          <div className="place-content-center">
            <Box2 conferenceFinals={false} bracket={westSemis} order={false} empty={empty} /> {/* westSemis.length == 4 ? westSemis : [] */}
          </div>

          {/* Third Column - Western Conference Finals - Next Round */}
          <div className="space-y-4 place-content-center ">
            <Box2 conferenceFinals={true} bracket={westFinals} order={false} empty={empty} /> {/* westFinals.length == 2 ? westFinals : [] */}
          </div>


          <div className=''>
            <BoxTheFinals bracket={theFinals} empty={empty} /> {/* theFinals.length == 2 ? theFinals : [] */}
          </div>


          {/* Fourth Column - Eastern Conference Finals - Next Round */}
          <div className=" space-y-4 place-content-center mt-6 ml-6">
            <Box2 conferenceFinals={true} bracket={eastFinals} order={true} empty={empty} /> {/* eastFinals.length == 4 ? eastSemis : [] */}
          </div>

          {/* Third Column - Eastern Conference SemiFinals */}
          <div className="place-content-center">
            <Box2 conferenceFinals={false} bracket={eastSemis} order={true} empty={empty} /> {/* eastSemis.length == 4 ? eastSemis : [] */}
          </div>

          {/* Fourth Column - Eastern Conference - Next Round */}
          <div className="">
            <Box bracket={eastQuarters} order={true} />
          </div>
        </div>
      </div>

      {/* Placeholder for Finals */}
      <div className="m-10 lg:mt-1 px-4 flex items-center justify-between space-x-4 w-full">
        <div className="px-4 py-2 border shadow-lg rounded font-bold text-xs md:text-base">West Conference</div>
        <div className="text-center w-max mt-2 flex flex-col mx-auto">

          <Button className='dark:bg-celtics dark:hover:bg-celtics/90 dark:text-black' asChild>
            <Link href="/">Back</Link>
          </Button>
        </div>
        <div className="px-4 py-2 border shadow-lg rounded font-bold text-xs md:text-base">East Conference</div>
      </div>
    </div>
  );
};

export default PlayoffsBracket;





