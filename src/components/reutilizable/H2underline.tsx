import { cn } from "@/lib/utils"
import { Icons } from "@/components/custom/Icons"
import { TextShimmer } from "../core/text-shimmer"


type Props = {
  firstPhrase: string
  secondPhrase?: string
  underlinedPhrase?: string
  className?: string
}

const H2underline = ({ firstPhrase, secondPhrase, underlinedPhrase, className }: Props) => {
  // h2 -> lg:text-[52px]
  return (
    <h2 className="text-grad relative px-2 sm:px-4 md:px-20 lg:px-4 leading-tight lg:leading-tight text-center text-shadow-lg text-3xl lg:text-6xl mb-8 md:mb-0 xl:text-[68px] xl:leading-tight uppercase">
      <span className="whitespace-nowrap">{firstPhrase}</span>
      <span className={cn("relative pl-2 mr-4 lg:mr-1 xl:mr-4", className)}>{underlinedPhrase}
        <Icons.underline className="hidden lg:block pointer-events-none absolute inset-x-0 -bottom-5 xl:-bottom-6 -right-2 text-green-600" />
      </span>
      <span className="flex flex-wrap">{secondPhrase}</span>

    </h2>
  )
}

export default H2underline