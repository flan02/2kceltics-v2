import MaxWidthWrapper from '@/components/reutilizable/MaxWidthWrapper'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

type Props = {}

// TODO CREATE A REUTILIZABLE COMPONENT! FOR NOTFOUND, IN CONSTRUCTION, ETC

const NotFound = (props: Props) => {
  return (
    <MaxWidthWrapper className='min-h-[calc(100vh-150px)] place-content-center'>
      <section className='grid grid-cols-2 items-center h-max'>
        <aside className='h-full'>
          <h1 className='text-celtics text-7xl text-shadow-md leading-tight'>
            THE PAGE YOU ARE LOOKING FOR DOES NOT EXIST RIGHT NOW.
          </h1>
        </aside>
        <div className='px-2 mx-auto'>

          <Image src='/rajon-rondo-pity.png' priority alt='404' width={250} height={250} className='w-auto h-auto' />
        </div>
      </section>
      <div className='text-center'>
        <Button className=''>
          <a href='/'>BACK</a>
        </Button>
      </div>
    </MaxWidthWrapper>

  )
}

export default NotFound