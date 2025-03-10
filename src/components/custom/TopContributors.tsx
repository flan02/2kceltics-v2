
import { getTopTierUsers } from '@/app/actions'
import { UserSession } from '@/lib/types'
import ClientRankingWrapper from './client-wrapper/ClientRankingWrapper'

type Props = {}

const TopContributors = async (props: Props) => {

  const { countUsers, top5 } = await getTopTierUsers()

  const RankingUsers = () => {
    return (
      <ClientRankingWrapper countUsers={countUsers} top5={top5 as UserSession[]} />
    )
  }

  return (
    <section className='absolute top-32 right-1 w-[300px] h-[300px] p-4'>
      <RankingUsers />
    </section>
  )
}

export default TopContributors


