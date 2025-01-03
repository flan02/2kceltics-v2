
'use client'
import React, { useState, useEffect } from 'react';
import Box from './Box';
import Box2 from './Box2';
import BoxTheFinals from './BoxTheFinals';
import { Button } from '@/components/ui/button';
import { Seed } from '@prisma/client';
import Link from 'next/link';

type SeedProps = {
  seeds: Omit<Seed, 'id' | 'playoffsId' | 'createAt' | 'updatedAt'>[]
}



const PlayoffsBracket = ({ seeds }: SeedProps) => {


  const [empty, setEmpty] = useState(true); // During RS, in playoffs this value turns into false
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

  return (
    <div className="flex flex-col items-center justify-center p-4 ">
      <h1 className='text-3xl sm:text-5xl text-celtics mt-16 lg:mt-8 sm:mt-4 mb-4 lg:mb-8'>PLAYOFFS 2023/24</h1>
      <div className='w-full max-w-full overflow-x-auto overflow-y-hidden'>

        <div className={`min-w-[1024px] border shadow-xl rounded-xl p-4 grid grid-cols-7 gap-4 ${dimensions.width < 640 ? 'text-xs' : 'text-base'} text-white`}>
          {/* First Column - Western Conference */}
          <div className="">
            <Box bracket={seeds.filter(b => b.conference == "WEST")} order={empty} />
          </div>

          {/* Second Column - Western Conference - Next Round */}
          <div className="place-content-center">
            <Box2 conferenceFinals={false} bracket={seeds.filter(b => b.conference == "WEST" && b.wins > 3)} order={false} empty={empty} />
          </div>

          {/* Third Column - Western Conference Finals - Next Round */}
          <div className="space-y-4 place-content-center ">
            <Box2 conferenceFinals={true} bracket={seeds.filter(b => b.conference == "WEST" && b.wins > 7)} order={false} empty={empty} />
          </div>


          <div className=''>
            <BoxTheFinals bracket={seeds.filter(b => b.wins > 11)} empty={empty} />
          </div>


          {/* Fourth Column - Eastern Conference Finals - Next Round */}
          <div className=" space-y-4 place-content-center mt-6 ml-6">
            <Box2 conferenceFinals={true} bracket={seeds.filter(b => b.conference == "EAST" && b.wins > 7)} order={true} empty={empty} />
          </div>

          {/* Third Column - Eastern Conference */}
          <div className="place-content-center">
            <Box2 conferenceFinals={false} bracket={seeds.filter(b => b.conference == "EAST" && b.wins > 3)} order={true} empty={empty} />
          </div>

          {/* Fourth Column - Eastern Conference - Next Round */}
          <div className="">
            <Box bracket={seeds.filter(b => b.conference == "EAST")} order={true} />
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





