import PlayoffsBracket from '@/components/custom/playoffs/PlayoffsBracket'
import Marquee from '@/components/reutilizable/Marquee'
import MarqueePO from '@/components/reutilizable/MarqueePO'
import React from 'react'

type Props = {}

const PlayoffsPage = (props: Props) => {
  return (
    <>
      <MarqueePO />
      <PlayoffsBracket />
    </>
  )
}

export default PlayoffsPage