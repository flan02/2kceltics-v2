import MaxWidthWrapper from '@/components/reutilizable/MaxWidthWrapper'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent } from '@/components/ui/card'

import { formatDateShort, formatTierName } from '@/lib/utils'
import { Pencil, Tickets, TrophyIcon, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { FaHashtag } from "react-icons/fa6";
import { countUsers, getUser, getUserRanking } from './action'
import { auth } from '@/auth'
import SocialSubscriptionChecker from '@/components/custom/user/SocialSubscriptionChecker'
import { UserSession } from '@/lib/types'


type UserProps = {
  params: {
    userId: string // ? its name must be the same as the folder name between brackets []
  }

}

export default async function UserPage({ params: { userId } }: UserProps) {

  const session = await auth()
  const user = await getUser(userId) as UserSession
  const totalUsers = await countUsers()
  const userPosition = await getUserRanking(userId)
  let formattedTier: string = formatTierName(user?.tier || 'NOT_RANKED')
  const trophyColor = userPosition.rank === 1 ? 'gold' : userPosition.rank === 2 ? 'silver' : userPosition.rank === 3 ? 'bronze' : ''
  const currentSeason = process.env.CURRENT_SEASON

  if (!session) return notFound()

  type UserProps = {
    user: UserSession
  }

  const UserStats = ({ user }: UserProps) => {

    return (
      <Card className='col-span-1 h-[600px] flex flex-col space-y-8 shadow-gray-200 shadow-xl dark:shadow-black/50 dark:bg-night-80/60 bg-white/20'>
        <CardHeader className='flex space-y-4 p-0'>
          <div className='mx-auto w-full pt-8'>
            <Image src={user.image || ""} className='rounded-full mx-auto dark:border-4 dark:border-bubble-gum border-4 border-orange-400' width={100} height={100} alt="User Avatar" />
          </div>
          <div className='pl-2'>
            <p className='text-celtics text-center text-xl'>{user.name}</p>
            <p className='text-base text-center font-mono text-muted-foreground'>@{user.nickname}</p>
          </div>
          <hr className='w-[90%] mx-auto' />
        </CardHeader>
        <CardContent className='flex flex-col space-y-6 p-0'>
          <div className='pl-2 flex space-x-2'>
            <p className='text-muted-foreground'>Tier: </p>
            <Badge variant={'default'} className='bg-celtics hover:bg-celtics/80'>{formattedTier}</Badge>
          </div>
          <div className='flex pl-2 space-x-2'>
            <p className='text-muted-foreground'>Ranking: </p>
            <div className='flex text-orange-400 dark:text-bubble-gum'>
              <FaHashtag className='mr-1 mt-1' size={16} />
              <span className='text-lg font-bold -mt-0.5'>{userPosition.rank} / </span>
              <span className='text-lg ml-1.5 -mt-0.5 text-muted-foreground'>{totalUsers + 500}</span>
              {
                userPosition.rank > 3 && userPosition.rank < 11
                  ? <Badge className='bg-gray-500 ml-2 px-1'>TOP 10</Badge>
                  : <TrophyIcon className='ml-1 mt-0.5' color={trophyColor} size={18}></TrophyIcon>
              }

            </div>
          </div>
          <div className='flex pl-2 space-x-2'>
            <p className='text-muted-foreground'>Total points: </p>
            <p className='text-orange-400 dark:text-bubble-gum font-bold'>{user.totalPoints}</p>
            <span className='text-2xl -mt-1 text-celtics'>☘</span>
          </div>
          <div className='flex pl-2 space-x-2'>
            <p className='text-muted-foreground'>Tenure: </p>
            <p className='fbo text-celtics'>{formatDateShort(user.createdAt)}</p>
          </div>
          <div className='flex pl-2 space-x-2'>
            <p className='text-muted-foreground'>Premium pass: </p>
            {
              user?.premium
                ? (<Badge className='text-lg -mt-1.5 bg-purple/80 hover:bg-purple/80 text-teal-500 font-mono'>{currentSeason}</Badge>)
                : (<Button className="dark:bg-celtics dark:hover:bg-celtics/80 dark:text-white hover:bg-primary/90 px-2 -mt-1.5"><Tickets className='mr-1.5 -mt-1' size={20} /> <span>GET</span></Button>)
            }
          </div>
          <div>
            <p className='text-muted-foreground pl-2'>Email: </p>
            <p className='text-orange-400 dark:text-bubble-gum pl-2 text-sm'>{user.email}</p>
          </div>
          <div className='flex justify-end mr-4'>
            <Pencil className='text-orange-500 hover:text-orange-400 dark:text-bubble-gum dark:hover:text-bubble-gum/70' size={20} />
          </div>
        </CardContent>
      </Card>

    )
  }


  return (
    <MaxWidthWrapper className='min-h-[calc(100vh-60px)] max-w-6xl'>
      {
        session && session.user &&
        <section className='mt-16 space-y-4 text-muted-foreground'>
          <h1 className='text-celtics text-3xl text-center uppercase'>User&apos;s Locker Room</h1>
          {
            user && <div className='grid grid-cols-3 space-x-2 px-2'>

              <Card className='h-[600px] grid grid-rows-[15%_73%_12%] grid-cols-2 col-span-2 space-y-1 py-1 shadow-gray-200 shadow-xl dark:shadow-black/50 dark:bg-night-80/60 bg-white/20'>
                <div className='col-span-2 border rounded-lg mx-1'>up</div>

                <div className='flex col-span-2 space-x-1 px-1 '>
                  <CardContent className='basis-[65%] border rounded-lg'>left middle</CardContent>

                  <div className='basis-[35%]'>
                    <Image src="/the-jays-duo.jpg"
                      className='size-full object-cover border rounded-lg'
                      width={400} height={400} alt="locker room banner" />
                  </div>
                </div>
                <SocialSubscriptionChecker userId={session && session?.user.email!} />
              </Card>
              <UserStats user={user as UserSession} />
            </div>
          }
          <br /><br /><br />
          <div className="text-center pb-24">
            <Button asChild className="dark:bg-celtics dark:text-white">
              <Link href="/">BACK</Link>
            </Button>
          </div>
        </section>
      }
    </MaxWidthWrapper>
  )
}

