import DefaultPage from '@/components/reutilizable/DefaultPage'
import MaxWidthWrapper from '@/components/reutilizable/MaxWidthWrapper'
import React from 'react'



// TODO CREATE A REUTILIZABLE COMPONENT! FOR NOTFOUND, IN CONSTRUCTION, ETC

const NotFound = () => {
  const photo_dimension = {
    width: 250,
    height: 250
  }
  const className = {
    title: 'xl:text-7xl md:text-5xl lg:text-6xl text-5xl text-celtics leading-tight md:leading-tight lg:leading-tight xl:leading-tight'
  }
  return (
    <MaxWidthWrapper className='min-h-[calc(100vh-150px)] place-content-center'>
      <DefaultPage title={'THE PAGE YOU ARE LOOKING FOR DOES NOT EXIST RIGHT NOW'} image_url={'/rajon-rondo-pity.png'} className={className} photo_dimension={photo_dimension} />
    </MaxWidthWrapper>

  )
}

export default NotFound