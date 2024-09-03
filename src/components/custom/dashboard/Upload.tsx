import Link from "next/link"
import { buttonVariants } from "../../ui/button"

import DropdownCustom from "@/components/reutilizable/DropdownCustom"
import { ChartSpline, Map, MapPinMinusInsideIcon, MonitorPlay, NotebookPen, WholeWord } from "lucide-react"



type Props = {
  isAdmin: boolean
}

const Upload = ({ isAdmin }: Props) => {
  const options = {
    label: "menu",
    items: [
      {
        label: "Streams",
        href: "/streamed-games",
        icon: <MonitorPlay size={16} />
      },
      {
        label: "Season stats",
        href: "/season-stats",
        icon: <NotebookPen size={16} />
      },
      {
        label: "Advanced",
        href: "/advanced",
        icon: <ChartSpline size={16} />
      },
      {
        label: "My website",
        href: "https://www.danchanivet.tech",
        icon: <MapPinMinusInsideIcon size={16} />
      }
    ]
  }

  return (
    <>
      {
        isAdmin
          ?
          <div className="">
            <Link href="/dashboard" className={buttonVariants({ size: "sm", variant: "outline" })}>
              Dashboard
            </Link>
            <Link href="/api/auth/logout" className={buttonVariants({ size: "sm", variant: "outline" })}>
              Sign out
            </Link>
          </div>
          :
          <DropdownCustom label={options.label} items={options.items} />
      }
    </>
  )
}

export default Upload