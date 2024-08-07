import Link from 'next/link'
import React from 'react'
import { buttonVariants } from '../ui/button'
import Image from 'next/image'

type Props = {
  opt: string
  photo: string
  given_name: string
}

const Dashboard = async ({ opt, photo, given_name }: Props) => {

  //console.log('photo url', photo);
  const addTeam = opt === 'addteam'
  const schedule = opt === 'schedule'
  const addStats = opt === 'addstats'

  return (
    <div className='mt-4 max-w-4xl mx-auto'>
      <nav className='flex justify-center'>
        <Link href="/dashboard?opt=addteam" className={buttonVariants({
          variant: `${(opt === 'addteam') ? 'default' : 'outline'}`,
          className: 'transition-all duration-500 ease-in-out'
        })}>ADD TEAM</Link>
        <Link href="/dashboard?opt=schedule" className={buttonVariants({
          variant: `${(opt === 'schedule') ? 'default' : 'outline'}`,
          className: 'transition-all duration-500 ease-in-out'
        })}>SCHEDULE</Link>
        <Link href="/dashboard?opt=addstats" className={buttonVariants({
          variant: `${(opt === 'addstats') ? 'default' : 'outline'}`,
          className: 'transition-all duration-500 ease-in-out'
        })}>ADD STATS</Link>

      </nav>
      <section className='min-h-[calc(100vh-100px)] mt-4 border-t border-slate-200'>
        {
          !opt
            ?
            <div className='flex flex-col justify-center items-center min-h-[calc(100vh-150px)]'>
              <h1 className='text-center text-4xl text-celtics'>Welcome back admin {given_name} (flan02)!</h1>
              <p>NEXT STEPS</p>
              <ul>
                <li>Create a logic that allow add +1 visit to our website each time that we got a new visit. CLIENT COMPONENT WITH API</li>
                <li>Create addteam component, server logic and send teams to database</li>
                <li>Create a logic that wont send empty keys-value to mongodb... middleware prisma</li>
                <li>Create a markdown function to add in mongodb our table with player in markdown format</li>
              </ul>
            </div>
            : null
        }
        {
          addTeam
            ?
            <div className='flex justify-center items-center min-h-[calc(100vh-150px)]'>
              <h1 className='text-center text-4xl text-celtics'>Add a team</h1>
            </div>
            : null
        }
        {
          schedule
            ?
            <div className='flex justify-center items-center min-h-[calc(100vh-150px)]'>
              <h1 className='text-center text-4xl text-celtics'>Modify Schedule</h1>
            </div>
            : null
        }
        {
          addStats
            ?
            <div className='flex justify-center items-center min-h-[calc(100vh-150px)]'>
              <h1 className='text-center text-4xl text-celtics'>Add Stats</h1>
            </div>
            : null
        }
      </section>

    </div>
  )
}

export default Dashboard

{/* 
  <Image src={photo} alt="admin image" className='' width={100} height={100} />
  */}