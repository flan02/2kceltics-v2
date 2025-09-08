export const dynamic = "force-dynamic";
import PlayoffsBracket from '@/components/custom/playoffs/PlayoffsBracket'
import MarqueePO from '@/components/reutilizable/MarqueePO'

import React from 'react'
import { getSeeds } from '../dashboard/actions'


type Props = {}

const PlayoffsPage = async (props: Props) => {
  const CURRENT_SEASON = process.env.CURRENT_SEASON!
  const response: any = await getSeeds(CURRENT_SEASON)


  return (
    <>
      <MarqueePO />
      <PlayoffsBracket seeds={response} />

    </>
  )
}

export default PlayoffsPage