'use client'

import { Button } from "@/components/ui/button"



const UpdateScheduleGame = () => {
  return (
    <article className="w-full space-y-2 px-2">
      <h2 className="italic text-celtics text-lg">Search game to update</h2>
      <form action="">
        <div className="flex sm:flex-row flex-col space-y-4 sm:space-y-0 sm:space-x-2">
          <input type="number" placeholder="currentGame" required={true} className="rounded-lg border shadow-md pl-2 py-2 sm:py-0" />
          <input type="text" placeholder="currentSeason" required={true} className="rounded-lg border shadow-md pl-2 py-2 sm:py-0" />
          <Button type="submit" className="py-4">Search</Button>
        </div>
      </form>
    </article>
  )
}

export default UpdateScheduleGame