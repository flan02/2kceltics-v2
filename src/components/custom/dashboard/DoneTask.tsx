'use client'

import { updateTask } from "@/app/dashboard/actions"
import LoadingButton from "@/components/reutilizable/LoadingButton"
import { toast } from "@/components/ui/use-toast"
import { useForm } from "react-hook-form"

type Props = {
  task: {
    id: string
    task: string
    done: boolean
  }
}

function onSubmit(id: string, task?: string) {
  updateTask(id, true, task)
  toast({
    title: "You have completed the following task:",
    description: (
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(task, null, 2)}</code>
      </pre>
    ),
  })
}


const DoneTask = ({ task }: Props) => {

  // console.log('task done?', task.done);

  const form = useForm()
  const { register, handleSubmit, formState, watch, trigger, control, setValue, setFocus, formState: { isSubmitting, isSubmitted } } = form
  return (
    <form onSubmit={handleSubmit(() => onSubmit(task.id, task.task))}>
      <div className="text-center">
        <LoadingButton className="px-2 lg:text-base text-xs" type="submit" loading={isSubmitting} disabled={task.done ? true : false}>
          <span>Done</span>
        </LoadingButton>

      </div>
    </form>
  )
}

export default DoneTask