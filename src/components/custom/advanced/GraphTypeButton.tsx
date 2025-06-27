import { Button } from "@/components/ui/button"
import { graphTypes } from "@/lib/types"
import Link from "next/link"

export const GraphTypeButton = () => {

  return (
    <>
      {graphTypes.map((type) => (
        <Button key={type.name} asChild className={`${type.disabled ? "bg-gray-600 hover:bg-gray-600 opacity-80 dark:bg-gray-800" : "bg-midnight hover:bg-midnight/95 dark:bg-celtics dark:hover:bg-celtics/95"} px-12 font-bold py-6 w-[300px]`} >
          <Link href={type.disabled ? "/advanced" : `/advanced/${type.href}`} className='text-xs lg:text-2xl dark:text-gray-400'>{type.name}</Link>
        </Button>
      ))}
    </>
  )
}