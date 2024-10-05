
import JBprofile from "../../../../public/jb-profile.png"
import JTprofile from "../../../../public/jt-profile.png"
import KPprofile from "../../../../public/kp-profile.png"
import DWprofile from "../../../../public/dw-profile.png"
import Jrueprofile from "../../../../public/jrue-profile.png"

import CardPlayerLink from "@/components/reutilizable/CardPlayerLink"
import { CalendarDays, ChartSpline, MonitorPlay, NotebookPen, Trophy, User } from "lucide-react"

const labels = [{
  title: "STREAMED GAMES",
  photo: JBprofile,
  isTag: false,
  link: "/streamed-games",
  icon: <MonitorPlay color="#444" />
},
{
  title: "ADVANCED STATS",
  photo: JTprofile,
  isTag: false,
  link: "/advanced",
  icon: <ChartSpline color="#444" />
},
{
  title: "SEASON STATS",
  photo: KPprofile,
  isTag: false,
  link: "/season-stats",
  icon: <NotebookPen color="#444" />
},
{
  title: "SCHEDULE",
  photo: Jrueprofile,
  isTag: true,
  link: "schedule",
  icon: <CalendarDays color="#444" />
},
{
  title: "ROSTER",
  photo: DWprofile,
  isTag: true,
  link: "roster",
  icon: <User color="#444" />
}
]

type Props = {
  playoffs: boolean
}


const dim = {
  width: "w-48",
  height: "h-[140px]"
}
const MobileMenu = ({ playoffs }: Props) => {
  return (
    <section className="grid grid-cols-1 grid-rows-5 space-y-4 mt-12 lg:mt-0 lg:hidden pb-24 md:pb-0">
      {
        labels.map((player, index) => (
          <CardPlayerLink cardTitle={player.title} key={index} isTag={player.isTag} link={player.link} icon={player.icon} />
        ))
      }
      {playoffs && <CardPlayerLink cardTitle="PLAYOFFS" isTag={false} link="/playoffs" icon={<Trophy color="#444" />} />}
    </section>
  )
}

export default MobileMenu