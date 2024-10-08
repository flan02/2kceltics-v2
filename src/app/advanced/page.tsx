import DefaultPage from '@/components/reutilizable/DefaultPage'
import MaxWidthWrapper from '@/components/reutilizable/MaxWidthWrapper'
import React from 'react'

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
    <MaxWidthWrapper className='min-h-[calc(100vh-150px)] place-content-center mt-4 pb-16'>
      <DefaultPage title={'THIS SITE IS BEING DEVELOPED AT THIS MOMENT'} image_url={'/marcus-smart23.png'} className={className} photo_dimension={photo_dimension} />
    </MaxWidthWrapper>
  )
}

export default AdvancedPage