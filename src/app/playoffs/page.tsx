import PlayoffsBracket from '@/components/custom/playoffs/PlayoffsBracket'
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