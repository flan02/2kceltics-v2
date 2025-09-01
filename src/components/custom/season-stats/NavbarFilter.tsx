import { buttonVariants } from "@/components/ui/button"
import type { $Enums } from "@prisma/client"
import Link from "next/link"


type Props = {
  opt: $Enums.Stage
}

const NavbarFilter = ({ opt }: Props) => {


  return (
    <nav className='flex flex-wrap justify-start lg:justify-center space-x-1 space-y-1'>
      <Link href="/season-stats/playoffs?opt=FIRST_ROUND" className={buttonVariants({
        variant: `${(opt === 'FIRST_ROUND') ? 'default' : 'outline'}`,
        className: `transition-all duration-500 ease-in-out mt-1 ${opt !== 'FIRST_ROUND' ? " hover:bg-zinc-200/60 dark:hover:bg-zinc-800/20" : ""}`
      })}>FIRST ROUND</Link>
      <Link href="/season-stats/playoffs?opt=ESCF" className={buttonVariants({
        variant: `${(opt === 'ESCF') ? 'default' : 'outline'}`,
        className: `transition-all duration-500 ease-in-out ${opt !== 'ESCF' ? " hover:bg-zinc-200/60 dark:hover:bg-zinc-800/20" : ""}`
      })}>SEMI FINALS</Link>
      <Link href="/season-stats/playoffs?opt=ECF" className={buttonVariants({
        variant: `${(opt === 'ECF') ? 'default' : 'outline'}`,
        className: `transition-all duration-500 ease-in-out ${opt !== 'ECF' ? " hover:bg-zinc-200/60 dark:hover:bg-zinc-800/20" : ""}`
      })}>EAST FINALS</Link>
      <Link href="/season-stats/playoffs?opt=FINALS" className={buttonVariants({
        variant: `${(opt === 'FINALS') ? 'default' : 'outline'}`,
        className: `transition-all duration-500 ease-in-out ${opt !== 'FINALS' ? " hover:bg-zinc-200/60 dark:hover:bg-zinc-800/20" : ""}`
      })}>THE FINALS</Link>
      <Link href="/season-stats/playoffs" className={buttonVariants({
        variant: `${(!opt) ? 'default' : 'outline'}`,
        className: `transition-all duration-500 ease-in-out ${opt ? " hover:bg-zinc-200/60 dark:hover:bg-zinc-800/20" : ""}`
      })}>
        TOTAL
      </Link>

    </nav>
  )
}

export default NavbarFilter