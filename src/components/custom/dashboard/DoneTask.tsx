'use client'

import { deleteTask, updateTask } from "@/app/dashboard/actions"
import LoadingButton from "@/components/reutilizable/LoadingButton"
import { toast } from "@/components/ui/use-toast"
import { Trash2 } from "lucide-react"
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


function removeTask(id: string) {
  // Logic to remove the task
  console.log('Removing task:', id);
  deleteTask(id)
  toast({
    title: "Task removed",
    description: (
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="">{JSON.stringify(id, null, 2)}</code>
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
      <div className="text-center flex space-x-2 items-center">
        <LoadingButton className="px-2 lg:text-base text-xs" type="submit" loading={isSubmitting} disabled={task.done ? true : false}>
          <span>Done</span>
        </LoadingButton>
        <Trash2 className="text-red-500 hover:text-red-600" onClick={() => removeTask(task.id)} />
      </div>
    </form>
  )
}

export default DoneTask