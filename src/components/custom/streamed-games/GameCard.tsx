'use client'
import { Button } from '@/components/ui/button';

import Image from 'next/image';
import Link from 'next/link';

import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

type Props = {}

const GameCard = (props: Props) => {
  return (
    <aside className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 w-full px-8 md:px-2 gap-4 md:gap-2'>

      <div className='relative border border-slate-300 rounded-xl hover:bg-slate-200/50 hover:border hover:border-slate-900'>
        <LiteYouTubeEmbed
          id="eRLgoFoYVg8"
          title="RS NBA2K24 #1 Celtics vs Knicks Full Game"
          poster="hqdefault"

          aspectWidth={16}
          aspectHeight={9}
        />
        <h5 className='absolute top-0 left-0 z-10 w-full py-2 pl-1 bg-[rgba(0,0,0,0.3)] text-sm text-zinc-200 truncate'>RS NBA2K24 #1 Celtics vs Knicks Full Game</h5>
        <div className='px-4 pb-4 pt-2 flex justify-between'>
          <div className='flex items-center'>
            <Image src='/logos/BOS.png' width={50} height={50} className='mr-2' alt="celtics-logo" />
            <span className='font-bold'>vs</span>
            <Image src='/logos/NYK.png' width={100} height={100} className={`ml-2 w-16 h-16`} alt="celtics-logo" />
          </div>
          <Button className='text-xs px-1 self-end' asChild>
            <Link href="/game-recap">Game recap</Link>
          </Button>
        </div>
      </div>

      <div className='relative border border-slate-300 rounded-xl hover:bg-slate-200/50 hover:border hover:border-slate-900'>
        <LiteYouTubeEmbed
          id="rk0404dI_g4"
          title="RS NBA2K24 #2 Heat vs Celtics Full Game"
          poster="hqdefault"

          aspectWidth={16}
          aspectHeight={9}
        />
        <h5 className='absolute top-0 left-0 z-10 w-full py-2 pl-1 bg-[rgba(0,0,0,0.3)] text-sm text-zinc-200 truncate'>RS NBA2K24 #2 Heat vs Celtics Full Game</h5>
        <div className='px-4 pb-4 pt-2 flex justify-between'>
          <div className='flex items-center py-1'>
            <Image src='/logos/BOS.png' width={50} height={50} className='mr-2' alt="celtics-logo" />
            <span className='font-bold'>vs</span>
            <Image src='/logos/MIA.png' width={100} height={100} className={`ml-2 w-14 h-14`} alt="celtics-logo" />
          </div>
          <Button className='text-xs px-1 self-end' asChild>
            <Link href="/game-recap">Game recap</Link>
          </Button>
        </div>
      </div>

      <div className='relative border border-slate-300 rounded-xl hover:bg-slate-200/50 hover:border hover:border-slate-900'>

        <LiteYouTubeEmbed
          id="jG3WLtMHiFg"
          title="RS NBA2K24 #3 Celtics vs Wizards Full Game"
          poster="hqdefault"

          aspectWidth={16}
          aspectHeight={9}
        />
        <h5 className='absolute top-0 left-0 z-10 w-full py-2 pl-1 bg-[rgba(0,0,0,0.3)] text-sm text-zinc-200 truncate'>RS NBA2K24 #3 Wizards vs Celtics Full Game</h5>
        <div className='px-4 pb-4 pt-2 flex justify-between'>
          <div className='flex items-center py-1'>
            <Image src='/logos/BOS.png' width={50} height={50} className='mr-2' alt="celtics-logo" />
            <span className='font-bold'>vs</span>
            <Image src='/logos/WAS.png' width={100} height={100} className={`ml-2 w-14 h-14`} alt="celtics-logo" />
          </div>
          <Button className='text-xs px-1 self-end' asChild>
            <Link href="/game-recap">Game recap</Link>
          </Button>
        </div>

      </div>

      <div className='relative border border-slate-300 rounded-xl hover:bg-slate-200/50 hover:border hover:border-slate-900'>
        <LiteYouTubeEmbed
          id="kV7Afy6Y6-w"
          title="RS NBA2K24 #4 Pacers vs Celtics Full Game"
          poster="hqdefault"

          aspectWidth={16}
          aspectHeight={9}
        />
        <h5 className='absolute top-0 left-0 z-10 w-full py-2 pl-1 bg-[rgba(0,0,0,0.3)] text-sm text-zinc-200 truncate'>RS NBA2K24 #4 Pacers vs Celtics Full Game</h5>
        <div className='px-4 pb-4 pt-2 flex justify-between'>
          <div className='flex items-center py-1'>
            <Image src='/logos/BOS.png' width={50} height={50} className='mr-2' alt="celtics-logo" />
            <span className='font-bold'>vs</span>
            <Image src='/logos/IND.png' width={100} height={100} className={`ml-2 w-14 h-14`} alt="celtics-logo" />
          </div>
          <Button className='text-xs px-1 self-end' asChild>
            <Link href="/game-recap">Game recap</Link>
          </Button>
        </div>
      </div>

      <div className='relative border border-slate-300 rounded-xl hover:bg-slate-200/50 hover:border hover:border-slate-900'>
        <LiteYouTubeEmbed
          id="uRQeEBQaucI"
          title="RS NBA2K24 #5 Celtics vs Nets Full Game"
          poster="hqdefault"

          aspectWidth={16}
          aspectHeight={9}
        />
        <h5 className='absolute top-0 left-0 z-10 w-full py-2 pl-1 bg-[rgba(0,0,0,0.3)] text-sm text-zinc-200 truncate'>RS NBA2K24 #5 Celtics vs Nets Full Game</h5>
        <div className='px-4 pb-4 pt-2 flex justify-between'>
          <div className='flex items-center py-1'>
            <Image src='/logos/BOS.png' width={50} height={50} className='mr-2' alt="celtics-logo" />
            <span className='font-bold'>vs</span>
            <Image src='/logos/BRO.png' width={100} height={100} className={`ml-2 w-14 h-14`} alt="celtics-logo" />
          </div>
          <Button className='text-xs px-1 self-end' asChild>
            <Link href="/game-recap">Game recap</Link>
          </Button>
        </div>
      </div>

      <div className='relative border border-slate-300 rounded-xl hover:bg-slate-200/50 hover:border hover:border-slate-900'>
        <LiteYouTubeEmbed
          id="KnkGmszvL1U"
          title="RS NBA2K24 #6 Celtics vs Wolves Full Game"
          poster="hqdefault"

          aspectWidth={16}
          aspectHeight={9}
        />
        <h5 className='absolute top-0 left-0 z-10 w-full py-2 pl-1 bg-[rgba(0,0,0,0.3)] text-sm text-zinc-200 truncate'>RS NBA2K24 #6 Celtics vs Wolves Full Game</h5>
        <div className='px-4 pb-4 pt-2 flex justify-between'>
          <div className='flex items-center py-1'>
            <Image src='/logos/BOS.png' width={50} height={50} className='mr-2' alt="celtics-logo" />
            <span className='font-bold'>vs</span>
            <Image src='/logos/MIN.png' width={100} height={100} className={`ml-2 w-14 h-14`} alt="celtics-logo" />
          </div>
          <Button className='text-xs px-1 self-end' asChild>
            <Link href="/game-recap">Game recap</Link>
          </Button>
        </div>

      </div>
    </aside>
  )
}

export default GameCard