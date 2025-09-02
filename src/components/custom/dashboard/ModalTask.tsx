'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Task } from "@/lib/types"
import { truncateWords } from "@/lib/utils"
import { useState } from "react"





type Props = {
  task: Task
  taskTitle: string
}

const ModalTask = ({ task, taskTitle }: Props) => {
  const [open, setOpen] = useState(false)


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* El trigger es el botón que abre el modal */}
      <DialogTrigger asChild>
        <button
          onClick={() => setOpen(true)}
          className={`${task.done ? "line-through hover:underline" : "text-primary"
            } text-muted-foreground lg:text-base text-xs hover:underline line-clamp-1`}
        >
          {task.task}
        </button>
      </DialogTrigger>

      {/* Contenido del modal */}
      <DialogContent className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -mt-[80vh] py-16 px-6 w-[80ch]">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">
            {taskTitle}
          </DialogTitle>
          <DialogDescription>
            {task.description ?? "No description provided."}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-2">
          <p>
            <span className="font-semibold">Status:</span>{" "}
            {task.done ? "✅ Completed" : "❌ Pending"}
          </p>

          <p>
            <span className="font-semibold">created at:</span>{" "}
            {task.createdAt ? new Date(task.createdAt).toLocaleDateString() : "No due date"}
          </p>
          <p>
            <span className="font-semibold">updated at:</span>{" "}
            {task.updatedAt ? new Date(task.updatedAt).toLocaleDateString() : "No due date"}
          </p>
          <p>
            <span className="font-semibold">Task ID:</span> {task.id}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ModalTask

// return (
//   <button className={`${task.done ? "line-through hover:underline" : "text-primary"} text-muted-foreground lg:text-base text-xs hover:underline`} onClick={modalTask}>
//     {task.task}
//   </button>
// )