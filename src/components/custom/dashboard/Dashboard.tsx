import Link from 'next/link'
import React from 'react'
import { Button, buttonVariants } from '../../ui/button'
import Image from 'next/image'
import Yo from '../../../../public/yo-unbackground.png'
import AddTeam from './AddTeam'
import Schedule from './Schedule'
import AddStats from './AddStats'
import TaskForm from './TaskForm'
import { getTasks, updateTask } from '@/app/dashboard/actions'
import { CheckSquare } from 'lucide-react'
import { Cross1Icon } from '@radix-ui/react-icons'
import DoneTask from './DoneTask'


type Props = {
  opt: string
  photo: string
  given_name: string
}

const Dashboard = async ({ opt, photo, given_name }: Props) => {

  const tasks = await getTasks() // server function

  //console.log('photo url', photo);
  const addTeam = opt === 'addteam'
  const schedule = opt === 'schedule'
  const addStats = opt === 'addstats'

  //console.log(tasks);


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
            <div className='flex flex-col justify-start items-center mt-12 space-y-8'>
              <div className='space-y-4'>
                <Image src={Yo} className='size-16 mx-auto rounded-full' width={100} height={100} alt="yo" />
                <h1 className='text-center text-3xl text-celtics'>Welcome back admin {given_name} (flan02)!</h1>
              </div>

              <article className='border border-slate-200 p-2'>

                {
                  (tasks as any).map((task: any) => (
                    <div key={task.id} className='flex justify-between space-y-2 items-center'>
                      <div className='flex space-x-2 items-center'>
                        <span>
                          {
                            task.done
                              ? <CheckSquare size={24} fill='white' color='black' />
                              : <Cross1Icon fill='red' color='red' className='size-6' />
                          }
                        </span>
                        <span className={`${task.done ? "line-through" : "text-primary"} text-muted-foreground lg:text-base text-xs`}>{task.task}</span>
                      </div>


                      <DoneTask task={task} />


                    </div>
                  ))
                }
              </article>
              <TaskForm />
            </div>
            : null
        }
        {
          addTeam ? <AddTeam /> : null
        }
        {
          schedule ? <Schedule /> : null
        }
        {
          addStats ? <AddStats /> : null
        }
      </section>

    </div>
  )
}

export default Dashboard

{/* 
  <Image src={photo} alt="admin image" className='' width={100} height={100} />
  */}