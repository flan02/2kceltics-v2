import Image from "next/image"

// $ Requires shadcn-ui Button component
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"


type Props = {
  title: string
  image_url: string
  className?: {
    title?: string
  }
  photo_dimension?: { width: number, height: number }
}

const DefaultPage = ({ title, image_url, className, photo_dimension }: Props) => {
  return (
    <div className="space-y-12">
      <div className="md:hidden flex justify-center">
        <Image src="/celtics-title.png" alt="celtics-title" width={300} height={300} />
      </div>
      <section className='grid grid-cols-1 md:grid-cols-2 items-center h-max'>
        <aside className='h-full flex items-center'>
          <h1 className={cn("text-center md:text-shadow-lg md:text-left", className?.title)}>
            {title}
          </h1>
        </aside>
        <div className='hidden md:flex md:justify-center md:items-center md:h-full px-2'>
          <Image src={image_url} priority alt='404' width={photo_dimension?.width} height={photo_dimension?.height} className='w-auto h-auto' />
        </div>
      </section>
      <div className='text-center'>
        <Button className=''>
          <a href='/'>BACK</a>
        </Button>
      </div>
    </div>
  )
}

export default DefaultPage