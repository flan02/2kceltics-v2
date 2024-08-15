import { Home, Plane } from "lucide-react"
import Image from "next/image"


type Props = {
  currentGame: number
  team_code2: string
  atHome: "HOME" | "AWAY"
  scoreTeam1: number
  scoreTeam2: number
}

export default async function CardSchedule({ currentGame, team_code2, atHome, scoreTeam1, scoreTeam2 }: Props) {
  return (
    <article className={`${scoreTeam1 === 0 ? "bg-slate-200 opacity-40" : ""} border-y shadow-md rounded-xl`}>
      <div className='grid grid-cols-4 min-h-[120px] items-center'>
        <div className='place-content-center col-span-1 uppercase h-full bg-green-100/30'>
          <p className="italic text-center text-xl font-bold text-muted-foreground">GAME # {currentGame}</p>
        </div>
        <aside className="h-full col-span-3">
          <div className="h-[70%] pt-2">
            <div className="flex items-center justify-center">
              <p className="mr-8 font-bold text-xl text-muted-foreground">{atHome === "HOME" ? <Home color="gray" /> : <Plane />}</p>
              <Image src={`/logos/${team_code2}.png`} alt="philadelphia" width={60} height={60} />
            </div>
          </div>

          <hr className="w-[80%] mx-auto" />

          <div className="flex px-4 items-center h-[30%]">
            <p className={`${scoreTeam1 > scoreTeam2 ? "text-celtics" : scoreTeam1 !== 0 || scoreTeam2 !== 0 ? "text-red-600" : "text-slate-600"} mr-4 mb-1 font-bold text-xl`}>{scoreTeam1 > scoreTeam2 ? "W" : scoreTeam1 !== 0 || scoreTeam2 !== 0 ? "L" : "-"}</p>
            <p className="text-muted-foreground font-thin">{scoreTeam1 !== 0 ? scoreTeam1 : "-"} • {scoreTeam2 !== 0 ? scoreTeam2 : "-"} </p>
          </div>
        </aside>

      </div>
    </article>
  )
}

