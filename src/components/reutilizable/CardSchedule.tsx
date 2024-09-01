import { $Enums } from "@prisma/client"
import { Home, Plane } from "lucide-react"
import Image from "next/image"


type Props = {
  currentGame: number
  team_code2: string
  atHome: "HOME" | "AWAY"
  scoreTeam1: number
  scoreTeam2: number
  stage: $Enums.Stage

}

export default async function CardSchedule({ currentGame, team_code2, atHome, scoreTeam1, scoreTeam2, stage }: Props) {
  return (
    <article className={`${scoreTeam1 === 0 ? "bg-slate-200 opacity-40" : ""} min-w-[330px] xl:min-w-[500px] lg:min-w-[400px] hover:bg-zinc-200/50  hover:border-midnight border shadow-md rounded-xl`}>
      <div className='grid grid-cols-4 min-h-[120px] items-center'>
        <div className='place-content-center col-span-1 uppercase h-full bg-green-100/30'>
          <p className="italic text-center text-xl font-bold text-muted-foreground">GAME #</p>
          <p className="italic text-center text-3xl font-bold text-muted-foreground">{currentGame}</p>
        </div>
        <aside className="h-full col-span-3">
          <div className="h-[70%] pt-2">
            <div className="flex items-center justify-center">
              <p className="mr-8 font-bold text-xl text-muted-foreground">{atHome === "HOME" ? <Home color="green" /> : <Plane color="green" />}</p>
              <Image src={`/logos/${team_code2}.png`} alt={`${team_code2}`} width={60} height={60} className="w-auto h-auto" />
            </div>
          </div>

          <hr className="w-[80%] mx-auto" />

          <div className="flex items-center justify-between h-[30%]">
            <div className="flex px-4 items-center ">
              <p className={`${scoreTeam1 > scoreTeam2 ? "text-celtics" : scoreTeam1 !== 0 || scoreTeam2 !== 0 ? "text-red-600" : "text-slate-600"} mr-4 mb-1 font-bold text-xl`}>{scoreTeam1 > scoreTeam2 ? "W" : scoreTeam1 !== 0 || scoreTeam2 !== 0 ? "L" : "-"}</p>
              <p className="text-muted-foreground font-thin">{scoreTeam1 !== 0 ? scoreTeam1 : "-"} • {scoreTeam2 !== 0 ? scoreTeam2 : "-"} </p>
            </div>

            {
              stage !== "RS"
                ?
                <div className="bg-orange-100 h-full flex items-center mr-2 mb-1 rounded-xl px-2">
                  <p className="text-xs text-muted-foreground uppercase">tournament</p>
                </div>

                : null
            }

          </div>
        </aside>

      </div>
    </article>
  )
}

