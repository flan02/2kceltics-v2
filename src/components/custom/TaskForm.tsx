/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { ArrowBigRightDashIcon } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from '../ui/form'
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import LoadingButton from '../reutilizable/LoadingButton'
import { createTask } from '@/app/dashboard/actions'
import { toast } from '../ui/use-toast'


type Props = {}

async function onSubmit(values: { task: string }) {
  //console.log(values.task);
  await createTask(values.task)
  toast({
    title: "New Task Added:",
    description: (
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(values.task, null, 2)}</code>
      </pre>
    ),
  })
}


const TaskForm = (props: Props) => {
  const [isTaskOpen, setIsTaskOpen] = React.useState(false)
  const form = useForm({
    defaultValues: { task: "" }
  })
  const { register, handleSubmit, formState, watch, trigger, control, setValue, setFocus, formState: { isSubmitting, isSubmitted } } = form

  useEffect(() => {
    if (isSubmitted) {
      form.reset({ task: "" })
    }
  }, [isSubmitted])

  return (
    <article className='space-y-8 w-full'>


      <div className='flex items-center justify-center'>
        <span className='text-celtics shadow-sm font-bold mr-1'>TODO LIST</span>
        <ArrowBigRightDashIcon size={24} fill='green' color='green' className='mr-2' />
        <Button
          onClick={() => setIsTaskOpen(!isTaskOpen)}
          disabled={isTaskOpen}
          variant='default' className='text-sm px-2'>NEW TASK</Button>

      </div>

      {
        isTaskOpen
          ?
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 pb-24'>
              <FormField
                control={form.control}
                name="task"
                render={({ field }) => (
                  <FormItem >
                    <FormLabel></FormLabel>
                    <FormControl>
                      <Input placeholder="Add your new Task" {...field}
                        type='text'
                      />
                    </FormControl>
                    <FormMessage>{form.formState.errors.task?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <div className="text-center">
                <LoadingButton type="submit" loading={isSubmitting}>
                  Add Task
                </LoadingButton>

              </div>
            </form>
          </Form>
          : null
      }


    </article>
  )
}

export default TaskForm


/* 
<ul>
        <li> ✔ Create a logic that allow add +1 visit to our website each time that we got a new visit. CLIENT COMPONENT WITH API</li>
        <li> ✔ Create a form to upload data with server components</li>
        <li> ✔ Create a logic that wont send empty keys-value to mongodb... middleware prisma</li>
        <li> 🎀 Create addteam component, server logic and send teams to database</li>
        <li> 👀 Create a markdown function to add in mongodb our table with player in markdown format</li>
        <li> 👀 Personalizar pagina 404 not found. Foto de rondo enojado ?</li>
      </ul>
*/