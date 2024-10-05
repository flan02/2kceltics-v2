'use client'
import React, { useState, useEffect } from 'react';
import Box from './Box';
import Box2 from './Box2';
import BoxTheFinals from './BoxTheFinals';
import { Button } from '@/components/ui/button';



// * FIRST ROUND RETRIEVED FROM DATABASE
const bracketWest = [
  {
    team1: 'OKC',
    team2: 'NOP',
    score1: 0,
    score2: 0,
    seed1: 1,
    seed2: 8
  },
  {
    team1: 'LAC',
    team2: 'DAL',
    score1: 0,
    score2: 0,
    seed1: 4,
    seed2: 5
  },
  {
    team1: 'MIN',
    team2: 'PHO',
    score1: 0,
    score2: 0,
    seed1: 3,
    seed2: 6
  },
  {
    team1: 'DEN',
    team2: 'LAL',
    score1: 0,
    score2: 0,
    seed1: 2,
    seed2: 7
  }
]

const bracketEast = [
  {
    team1: 'BOS',
    team2: 'MIA',
    score1: 0,
    score2: 0,
    seed1: 1,
    seed2: 8,
  },
  {
    team1: 'CLE',
    team2: 'ORL',
    score1: 0,
    score2: 0,
    seed1: 5,
    seed2: 4
  },
  {
    team1: 'MIL',
    team2: 'IND',
    score1: 0,
    score2: 0,
    seed1: 3,
    seed2: 6
  },
  {
    team1: 'PHI',
    team2: 'NYK',
    score1: 0,
    score2: 0,
    seed1: 7,
    seed2: 2
  }
]

// * SECOND ROUND RETRIEVED FROM DATABASE
const bracketWest2ND = [
  {
    team1: 'OKC',
    team2: 'DAL',
    score1: 0,
    score2: 0,
    seed1: 1,
    seed2: 5
  },
  {
    team1: 'PHO',
    team2: 'LAL',
    score1: 0,
    score2: 0,
    seed1: 6,
    seed2: 7
  }
]

const bracketEast2ND = [
  {
    team1: 'BOS',
    team2: 'CLE',
    score1: 0,
    score2: 0,
    seed1: 1,
    seed2: 5
  },
  {
    team1: 'IND',
    team2: 'PHI',
    score1: 0,
    score2: 0,
    seed1: 6,
    seed2: 7
  }
]

// * CONFERENCE FINALS RETRIEVED FROM DATABASE
const bracketWCF = [
  {
    team1: 'DAL',
    team2: 'LAL',
    score1: 0,
    score2: 0,
    seed1: 5,
    seed2: 7
  }
]

const bracketECF = [
  {
    team1: 'BOS',
    team2: 'IND',
    score1: 0,
    score2: 0,
    seed1: 1,
    seed2: 6
  }
]

// * FINALS RETRIEVED FROM DATABASE
const bracketTheFinals = [
  {
    team1: 'BOS',
    team2: 'DAL',
    score1: 0,
    score2: 0,
    seed1: 1,
    seed2: 5
  }
]

const PlayoffsBracket = () => {


  const [empty, setEmpty] = useState(true);
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
    <div className="flex flex-col items-center justify-center p-4 h-screen">
      <h1 className='text-3xl sm:text-5xl text-celtics lg:mt-16 mt-4 sm:mt-8 mb-4 lg:mb-8'>PLAYOFFS 2023/24</h1>
      <div className='w-full max-w-full overflow-x-auto overflow-y-hidden'>


        <div className={`min-w-[1024px] border shadow-xl rounded-xl p-4 grid grid-cols-7 gap-4 ${dimensions.width < 640 ? 'text-xs' : 'text-base'} text-white`}>
          {/* First Column - Western Conference */}
          <div className="space-y-4">
            <Box bracket={bracketWest} order={empty} />
          </div>

          {/* Second Column - Western Conference - Next Round */}
          <div className="space-y-36 place-content-center">
            <Box2 bracket={bracketWest2ND} order={false} empty={empty} />
          </div>

          {/* Third Column - Western Conference Finals - Next Round */}
          <div className="space-y-4 place-content-center mt-4">
            <Box2 bracket={bracketWCF} order={false} empty={empty} />
          </div>


          <div className=''>
            <BoxTheFinals bracket={bracketTheFinals} empty={empty} />
          </div>


          {/* Fourth Column - Eastern Conference Finals - Next Round */}
          <div className="space-y-4 place-content-center mt-6 ml-6 2xl:mt-2.5 2xl:ml-0">
            <Box2 bracket={bracketECF} order={true} empty={empty} />
          </div>


          {/* Third Column - Eastern Conference */}
          <div className="space-y-36 place-content-center">
            <Box2 bracket={bracketEast2ND} order={true} empty={empty} />
          </div>

          {/* Fourth Column - Eastern Conference - Next Round */}
          <div className="space-y-4">
            <Box bracket={bracketEast} order={true} />
          </div>


        </div>


      </div>

      {/* Placeholder for Finals */}
      <div className="mt-8 px-4 flex items-center justify-between space-x-4 w-full">
        <div className="p-4 border shadow-lg rounded font-bold text-xs md:text-base">West Conference</div>
        <div className="text-center w-max mt-8 flex flex-col mx-auto">

          <Button className='mb-4 dark:bg-celtics dark:hover:bg-celtics/90 dark:text-black' asChild>
            <a href="/">Back</a>
          </Button>
        </div>
        <div className="p-4 border shadow-lg rounded font-bold text-xs md:text-base">East Conference</div>
      </div>
    </div>
  );
};

export default PlayoffsBracket;





