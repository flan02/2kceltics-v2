import MaxWidthWrapper from '@/components/reutilizable/MaxWidthWrapper'
import { buttonVariants } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import CelticsTrebol from '../../../public/celtics-trebol.png'

type Props = {}

const page = (props: Props) => {
  return (
    <MaxWidthWrapper className='h-[calc(100vh-100px)]'>
      <article className='flex flex-col space-y-12 items-center justify-center h-full'>
        <Image src={CelticsTrebol} width={300} height={300} alt='Celtics trebol' />
        <Link href="/api/auth/login" className={buttonVariants({
          size: "sm", variant: "default"
        })}>
          Sign up
        </Link>
      </article>

    </MaxWidthWrapper>
  )
}

export default page