import Link from 'next/link'
import React from 'react'
import { Button, buttonVariants } from '../../ui/button'
import Image from 'next/image'
import Yo from '../../../../public/yo-unbackground.png'
import AddTeam from './AddTeam'
import Schedule from './Schedule'
import AddStats from './AddStats'
import TaskForm from './TaskForm'
import { getTasks } from '@/app/dashboard/actions'
import { CheckSquare } from 'lucide-react'
import { Cross1Icon } from '@radix-ui/react-icons'
import DoneTask from './DoneTask'
import AddSeason from './AddSeason'
import AddPlayoffs from './AddPlayoffs'
import { auth } from '@/auth'
import SignOut from '@/components/reutilizable/sign-out'
import ShareOnX from './ShareOnX'
import ModalTask from './ModalTask'
import { Task } from '@/lib/types'
import { truncateWords } from '@/lib/utils'


type Props = {
  opt: string
  photo: string
  given_name: string
}

const Dashboard = async ({ opt, photo, given_name }: Props) => {
  const session = await auth()
  const tasks = await getTasks() // server function


  const addTeam = opt === 'addteam'
  const schedule = opt === 'schedule'
  const addStats = opt === 'addstats'
  const addSeason = opt === 'addseason'
  const addPlayoffs = opt === 'addplayoffs'

  const OPTIONS = [
    'addteam',
    'schedule',
    'addstats',
    'addseason',
    'addplayoffs'
  ]



  return (
    <div className='mt-4 max-w-4xl mx-auto'>
      <div>
        <nav className='flex flex-col md:flex-row justify-center md:space-x-1'>
          {
            session && session.user && <div className='flex justify-start items-end my-1 md:my-0'><SignOut /></div>
          }

          {
            OPTIONS.map((option) => (
              <Link key={option} href={`/dashboard?opt=${option}`} className={buttonVariants({
                variant: `${(opt === option) ? 'default' : 'outline'}`,
                className: `transition-all duration-500 ease-in-out ${opt !== option ? " hover:bg-zinc-200/60 dark:hover:bg-zinc-800/20" : ""}`
              })}>
                {option.toUpperCase()}
              </Link>
            ))
          }



          <Link href="/dashboard" className={buttonVariants({
            size: "sm", variant: `${(opt === '/') ? 'default' : 'outline'}`,
            className: `transition-all duration-500 ease-in-out ${opt !== '/' ? " hover:bg-zinc-200/60 dark:hover:bg-zinc-800/20" : ""}`
          })}>
            /
          </Link>
        </nav>
      </div>

      <section className='min-h-[calc(100vh-100px)] mt-4 border-t border-slate-200'>
        {
          !opt
            ?
            <div className='flex flex-col justify-start items-center mt-12 space-y-8'>
              <div className='space-y-4'>
                <div className='flex'>
                  <Image src={Yo} className='size-16 mx-auto rounded-full' width={100} height={100} alt="yo" />
                </div>
                <h1 className='text-center text-lg md:text-3xl text-celtics'>Welcome back admin {given_name} (flan02)!</h1>
              </div>
              <article className='border border-slate-200 py-2 px-6'>
                {
                  (tasks as Task[]).map((task: Task) => (
                    <div key={task.id} className='flex justify-between space-y-2 items-center'>
                      <div className='flex space-x-2 items-center'>
                        <span>
                          {
                            task.done
                              ? <CheckSquare size={24} fill='white' color='black' />
                              : <Cross1Icon fill='red' color='red' className='size-6' />
                          }
                        </span>
                        <ModalTask taskTitle={task.task} task={{ ...task, task: truncateWords(task.task, 15) }} />
                      </div>
                      <DoneTask task={task} />
                    </div>
                  ))
                }
              </article>
              <TaskForm />
              <article className="p-16 border border-slate-200 w-full rounded-lg space-y-4">
                <ShareOnX /> {/* Client side component */}
              </article>
            </div>
            : null
        }
        {addTeam ? <AddTeam /> : null}
        {schedule ? <Schedule /> : null}
        {addStats ? <AddStats /> : null}
        {addSeason ? <AddSeason /> : null}
        {addPlayoffs ? <AddPlayoffs /> : null}
      </section>
    </div>
  )
}

export default Dashboard




