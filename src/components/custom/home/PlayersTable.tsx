import { db } from '@/db';
import React from 'react'

type Props = {}

const PlayersTable = async (props: Props) => {
  const table = await db.team.findMany({
    where: {
      name: 'Boston Celtics',
    },
    select: {
      players: true,
    },
  });
  return table.map((player) => player.players)
}

export default PlayersTable