import { getCurrentGame } from "@/app/dashboard/actions"
import CreateScheduleGame from "./CreateScheduleGame"
import UpdateScheduleGame from "./UpdateScheduleGame"
import ShareOnX from "./ShareOnX"

// w-full border rounded-lg border-slate-200 mb-16 p-16 space-y-8
type Props = {}

export async function Schedule() {
  const game = await getCurrentGame()
  // console.log(currentGame);
  return (
    <section className='flex flex-col space-y-6 justify-start items-center mt-16 min-h-[calc(100vh-50px)]'>
      <h1 className=' text-center text-4xl text-celtics'>Program Schedule</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 w-full border-collapse">
        <article className="p-16 border border-slate-200 border-r-0 w-full rounded-lg space-y-4">
          <UpdateScheduleGame />
        </article>
        <article className="p-16 border border-slate-200 border-l-0 w-full rounded-lg space-y-8">
          {
            game
              ?
              <div className="bg-black text-gray-300 dark:text-muted-foreground text-sm pl-4 py-2 rounded-lg">
                <h3 className="text-slate-200 text-sm">{`Last game added: ${game.currentGame}`}</h3>
                <h3 className="text-slate-200 text-sm">Stage: {game.stage}</h3>
                <h3 className="text-slate-200 text-sm">Rival: {game.team2}</h3>
                <h3>{`${game.type == "PO" ? `Game: ${game.playoffGame}` : ''}`}</h3>
              </div>
              : <h3 className="text-slate-200 text-sm pl-4 py-2">There are no game to display.</h3>
          }
          <CreateScheduleGame />
        </article>
      </div>
      <article className="p-16 border border-slate-200 w-full rounded-lg space-y-4">
        <ShareOnX /> {/* Client side component */}

      </article>
    </section>
  )
}

export default Schedule