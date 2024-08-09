import { cn } from "@/lib/utils"
import { Icons } from "@/components/custom/Icons"


type Props = {
  firstPhrase: string
  secondPhrase?: string
  underlinedPhrase?: string
  className?: string
}

const H2underline = ({ firstPhrase, secondPhrase, underlinedPhrase, className }: Props) => {
  return (
    <h2 className="text-celtics text-shadow-lg text-5xl mb-8 md:mb-0 lg:text-6xl xl:text-7xl text-center uppercase xl:leading-tight">
      {firstPhrase}
      <span className={cn("relative pl-2 mr-1", className)}> {underlinedPhrase}
        <Icons.underline className="hidden sm:block pointer-events-none absolute inset-x-0 -bottom-8 -right-8 text-celtics" />
      </span>
      {secondPhrase}
    </h2>
  )
}

export default H2underline