'use client'

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa6';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';

type Props = {
  video_url: string
  video_title: string
}

//const IFrameVideo = dynamic(() => import('react-lite-youtube-embed'), { ssr: false });

const YoutubePlayerClient = ({ video_url, video_title }: Props) => {

  return (
    <LiteYouTubeEmbed
      wrapperClass={`w-full max-w-[480px] min-w-[315px] aspect-[16/9] md:mx-auto sm:mx-auto xs:mx-auto mb-4 -ml-5`}
      iframeClass={`w-full max-w-[480px] min-w-[315px] aspect-[16/9] h-auto mx-auto -mt-6`}
      cookie={false}
      id={video_url!}
      title={video_title}
      aspectWidth={16}
      aspectHeight={9}
    />
  )
}

export default YoutubePlayerClient