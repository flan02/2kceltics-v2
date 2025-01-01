import { db } from '@/db';


type Props = {}

const PlayersTable = async (props: Props) => {
  const table = await db.season2k.findMany({
    where: {
      teamId: '66b4de0f0fa088d80a9b93d1',
    },
    select: {
      players: true,
    },
  });
  return table.map((player) => player.players)
}

export default PlayersTable