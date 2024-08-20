'use client'
import { useEffect, useState } from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

type Props = {}

const YoutubeComponent = (props: Props) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {
        isClient && (
          <aside className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full px-8 md:px-2 gap-4 md:gap-2'>

            <div className='relative'>
              <LiteYouTubeEmbed
                id="eRLgoFoYVg8"
                title="RS NBA2K24 #1 Celtics vs Knicks Full Game"
                poster="hqdefault"

                aspectWidth={16}
                aspectHeight={9}
              />
              <h6 className='absolute top-0 left-0 z-10 w-full py-2 pl-1 bg-[rgba(0,0,0,0.3)] text-sm text-zinc-200 truncate'>RS NBA2K24 #1 Celtics vs Knicks Full Game</h6>
            </div>
            <div className='relative'>
              <LiteYouTubeEmbed
                id="rk0404dI_g4"
                title="RS NBA2K24 #2 Heat vs Celtics Full Game"
                poster="hqdefault"

                aspectWidth={16}
                aspectHeight={9}
              />
              <h6 className='absolute top-0 left-0 z-10 w-full py-2 pl-1 bg-[rgba(0,0,0,0.3)] text-sm text-zinc-200 truncate'>RS NBA2K24 #1 Heat vs Celtics Full Game</h6>
            </div>
            <div className='relative'>

              <LiteYouTubeEmbed
                id="jG3WLtMHiFg"
                title="RS NBA2K24 #3 Celtics vs Wizards Full Game"
                poster="hqdefault"

                aspectWidth={16}
                aspectHeight={9}
              />
              <h6 className='absolute top-0 left-0 z-10 w-full py-2 pl-1 bg-[rgba(0,0,0,0.3)] text-sm text-zinc-200 truncate'>RS NBA2K24 #1 Wizards vs Celtics Full Game</h6>

            </div>
          </aside>
        )
      }
    </>
  )
}

export default YoutubeComponent


