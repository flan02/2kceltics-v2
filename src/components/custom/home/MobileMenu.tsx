
import JBprofile from "../../../../public/jb-profile.png"
import JTprofile from "../../../../public/jt-profile.png"
import KPprofile from "../../../../public/kp-profile.png"
import DWprofile from "../../../../public/dw-profile.png"
import Jrueprofile from "../../../../public/jrue-profile.png"

import CardPlayerLink from "@/components/reutilizable/CardPlayerLink"

const players = [{
  title: "STREAMED GAMES",
  photo: JBprofile,
  isTag: false,
  link: "/streamed-games"
},
{
  title: "ADVANCED STATS",
  photo: JTprofile,
  isTag: false,
  link: "/advanced"
},
{
  title: "SEASON STATS",
  photo: KPprofile,
  isTag: false,
  link: "/season-stats"
},
{
  title: "SCHEDULE",
  photo: Jrueprofile,
  isTag: true,
  link: "schedule"
},
{
  title: "ROSTER",
  photo: DWprofile,
  isTag: true,
  link: "roster"
}

]

type Props = {}


const dim = {
  width: "w-48",
  height: "h-[140px]"
}
const MobileMenu = (props: Props) => {
  return (
    <section className="grid grid-cols-1 grid-rows-5 space-y-4 mt-12 lg:mt-0 lg:hidden pb-24 md:pb-0">
      {
        players.map((player, index) => (
          <CardPlayerLink dim={dim} player={player.photo} cardTitle={player.title} key={index} isTag={player.isTag} link={player.link} />

        ))
      }
    </section>
  )
}

export default MobileMenu