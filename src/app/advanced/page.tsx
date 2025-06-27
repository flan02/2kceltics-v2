
//import DefaultPage from '@/components/reutilizable/DefaultPage'
import MaxWidthWrapper from '@/components/reutilizable/MaxWidthWrapper'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ChartSpline } from 'lucide-react'
import { GraphTypeButton } from '@/components/custom/advanced/GraphTypeButton'


type Props = {}


const AdvancedPage = (props: Props) => {
  const photo_dimension = {
    width: 400,
    height: 400
  }
  const className = {
    title: 'text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-celtics leading-tight md:leading-tight lg:leading-tight xl:leading-tight'
  }
  return (
    <MaxWidthWrapper className='min-h-screen mt-8 md:mt-12 lg:mt-24 space-y-8'>
      <h1 className='uppercase text-celtics text-2xl lg:text-4xl font-bold'>Analytics Tool</h1>
      <p className='dark:text-muted-foreground'>You can interact with our graph system and analize in real-time the performance of our players.</p>

      <section className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-1'>
        <Card className='bg-[rgba(255,255,255,0.015)] backdrop-blur-md text-gray-700 dark:text-muted-foreground border border-black/10'>
          <CardHeader>
            <CardTitle className='flex items-center space-x-2'>
              <ChartSpline size={20} />
              <h2 className='text-xl dark:text-muted-foreground/80'>SELECT GRAPHIC BY TYPE</h2>
            </CardTitle>
          </CardHeader>
          <CardContent className='h-[calc(100%-70px)] grid place-content-center space-y-10'>
            <GraphTypeButton />
          </CardContent>
        </Card>
        <aside className='px-8 h-full hidden lg:block'>
          <Image src='/brad-stevens.jpg' alt='brad-stevens' width={400} height={400} className='w-auto h-full rounded-lg shadow-lg' />
        </aside>
      </section>
      <div className='flex justify-center'>
        <Button asChild className='px-2 py-0 dark:bg-celtics dark:hover:bg-celtics/90 dark:text-black'>
          <Link href="/" className='text-xs dark:text-white'>BACK</Link>
        </Button>
      </div>
      <div className='block xl:hidden'>
        <br /><br />
      </div>
    </MaxWidthWrapper>
  )
}

export default AdvancedPage

{/* <DefaultPage title={'THIS SITE IS BEING DEVELOPED AT THIS MOMENT'} image_url={'/marcus-smart23.png'} className={className} photo_dimension={photo_dimension} /> */ }
// min-h-[calc(100vh-150px)] place-content-center 