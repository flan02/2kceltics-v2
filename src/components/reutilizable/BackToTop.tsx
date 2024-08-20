'use client'
import { cn } from '@/lib/utils'
import { ArrowBigUp } from 'lucide-react'
import React from 'react'
import { Link } from 'react-scroll'

type Props = {
  className?: string
}

const BackToTop = ({ className }: Props) => {
  return (
    <div className={cn("hidden lg:block rounded-full h-max w-max bg-celtics mt-24 ml-4 md:ml-12 lg:mt-28", className)}>
      <Link to='main-menu' smooth="true" duration={1000} className='' >
        <ArrowBigUp fill='white' size={48} color='white' />
        <div className='absolute -mt-8 opacity-0 hover:opacity-100 transition-opacity text-celtics'> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Back to top</div>
      </Link>
    </div>
  )
}

export default BackToTop