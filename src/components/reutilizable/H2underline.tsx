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
    <h2 className="text-celtics px-2 sm:px-4 md:px-20 lg:px-4 leading-tight lg:leading-tight text-shadow-lg text-4xl lg:text-5xl mb-8 md:mb-0 lg:text-[52px] xl:text-[68px] xl:leading-tight text-center uppercase ">
      {firstPhrase}
      <span className={cn("relative pl-2 mr-4 lg:mr-1 xl:mr-4", className)}> {underlinedPhrase}
        <Icons.underline className="hidden sm:block pointer-events-none absolute inset-x-0 -bottom-5 xl:-bottom-8 -right-8 text-celtics" />
      </span>
      {secondPhrase}
    </h2>
  )
}

export default H2underline