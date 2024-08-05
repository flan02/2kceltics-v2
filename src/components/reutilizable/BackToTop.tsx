'use client'
import { ArrowBigUp } from 'lucide-react'
import React from 'react'
import { Link } from 'react-scroll'

type Props = {}

const BackToTop = (props: Props) => {
  return (
    <div className='rounded-full h-max w-max bg-celtics ml-12 mt-28'>
      <Link to='main-menu' smooth="true" duration={1000} >
        <ArrowBigUp fill='white' size={48} color='white' />
        <div className='absolute -mt-8 opacity-0 hover:opacity-100 transition-opacity text-celtics'> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Back to top</div>
      </Link>
    </div>
  )
}

export default BackToTop