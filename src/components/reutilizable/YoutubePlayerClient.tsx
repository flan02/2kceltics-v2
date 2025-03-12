'use client'

import LiteYouTubeEmbed from 'react-lite-youtube-embed';

type Props = {
  video_url: string
}

const YoutubePlayerClient = ({ video_url }: Props) => {
  return (

    <div className='w-[320px] md:w-[480px] lg:w-[560px]'>
      <LiteYouTubeEmbed
        cookie={false}
        id={video_url!}
        title='YouTube video player'
        poster="hqdefault"
        aspectWidth={16}
        aspectHeight={9}

      />
    </div>
  )
}

export default YoutubePlayerClient