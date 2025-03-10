
import React from 'react'
import GoogleWrapButton from './GoogleWrapButton'
import { auth } from '@/auth'



import { getPointsAndTier } from '@/app/actions'

import { TierNames } from '@/lib/types'
import { formatTierName } from '@/lib/utils'

import ClientUserWrapper from '../custom/client-wrapper/ClientUserWrapper'



type Props = {}

const UserPanel = async (props: Props) => {

  const session = await auth()

  let currentTier: TierNames = 'NOT_RANKED'
  let formattedTier: string
  let userId: string

  if (session?.user?.id) {
    const userPointsAndTier = await getPointsAndTier(session?.user?.email!)
    console.log(userPointsAndTier)
    currentTier = userPointsAndTier[0].tier // ! It comes from db, remember when user get a new tier, update it in db
    formattedTier = formatTierName(currentTier)
    userId = userPointsAndTier[0].id
  }

  const UserDashboard = () => {
    return (
      <ClientUserWrapper
        session={session}
        formattedTier={formattedTier}
        userId={userId}
      />
    )
  }

  return (
    <section className='sticky bottom-4 left-2 w-[300px] -mt-44 p-4'>
      {
        session ? <UserDashboard /> : <GoogleWrapButton />
      }
    </section>
  )
}

export default UserPanel


