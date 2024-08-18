import Link from "next/link"
import { buttonVariants } from "../../ui/button"

import DropdownCustom from "@/components/reutilizable/DropdownCustom"



type Props = {
  isAdmin: boolean
}

const Upload = ({ isAdmin }: Props) => {
  const options = {
    label: "menu",
    items: [
      {
        label: "Streams",
        href: "/streamed-games"
      },
      {
        label: "Season stats",
        href: "/season-stats",
      },
      {
        label: "Advanced",
        href: "/advanced",
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