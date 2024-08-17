'use client'

import { Button } from "@/components/ui/button"
import { useState } from "react"
import NewGameForm from "./NewGameForm"
import { Newspaper } from "lucide-react"

type Props = {}



const CreateScheduleGame = (props: Props) => {
  const [open, setIsOpen] = useState(false)
  return (
    <article className="w-full px-2 space-y-8">
      <div className="flex items-center space-x-4">
        <h2 className="text-sm text-celtics font-bold uppercase flex"><Newspaper size={16} className="mr-2" /> CREATE A NEW GAME</h2>
        <Button onClick={() => setIsOpen(!open)} className="w-[80px]"> {open ? "CLOSE" : "OK"}</Button>
      </div>
      {
        open
          ? <NewGameForm />
          : null
      }
    </article>
  )
}

export default CreateScheduleGame