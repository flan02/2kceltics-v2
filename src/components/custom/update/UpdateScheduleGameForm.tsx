'use client'

import { Button } from "@/components/ui/button"
import { Schedule } from "@prisma/client"
import Link from "next/link"

interface Props {
  game: Schedule
}

const UpdateScheduleGameForm = ({ game }: Props) => {
  // {JSON.stringify(game, null, 2)}
  return (
    <section>
      <h2>
        UpdateScheduleGameForm client
      </h2>
      <Button asChild>
        <Link href="/dashboard?opt=schedule">BACK</Link>
      </Button>
    </section>
  )
}

export default UpdateScheduleGameForm