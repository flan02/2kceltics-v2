import PlayoffsBracket from '@/components/custom/playoffs/PlayoffsBracket'
import MarqueePO from '@/components/reutilizable/MarqueePO'

import React from 'react'
import { getSeeds } from '../dashboard/actions'


type Props = {}

const PlayoffsPage = async (props: Props) => {
  const response: any = await getSeeds("NBA2K24")

  //console.log(response);
  return (
    <>
      <MarqueePO />
      <PlayoffsBracket seeds={response} />

    </>
  )
}

export default PlayoffsPage