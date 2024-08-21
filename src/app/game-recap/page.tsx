import DefaultPage from "@/components/reutilizable/DefaultPage"
import MaxWidthWrapper from "@/components/reutilizable/MaxWidthWrapper"


type Props = {}

export default async function GameRecapPage() {
  const photo_dimension = {
    width: 400,
    height: 400
  }
  const className = {
    title: 'xl:text-7xl md:text-5xl lg:text-6xl text-5xl text-celtics leading-tight md:leading-tight lg:leading-tight xl:leading-tight'
  }
  return (
    <MaxWidthWrapper className='min-w-[350px] lg:max-w-5xl lg:px-0 mb-16'>

      <DefaultPage title="THIS SITE IS BEING DEVELOPED AT THIS MOMENT" image_url="/marcus-smart23.png" photo_dimension={photo_dimension} className={className} />
    </MaxWidthWrapper>
  )
}

