import { cn } from "@/lib/utils"
import { ReactNode } from "react"


type Props = {}
// ? Receives a className drilled prop and this component needs to wrap childrens (automatically passes as a prop)
const MaxWidthWrapper = ({ className, children }: { className?: string, children: ReactNode }) => {
  return (
    <main className={cn("h-full mx-auto w-full max-w-screen-xl px-2.5 md:px-20", className)}>
      {children}
    </main>
  )
}

export default MaxWidthWrapper