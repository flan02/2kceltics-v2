import React from 'react'
import Upload from './dashboard/Upload'
import { CloverIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ModeToggle } from '../reutilizable/ModeToggle'

import { TextShimmer } from '../core/text-shimmer'


type Props = {}

const Navbar = async (props: Props) => {

  let isAdmin = false

  return (
    <header className='px-4 border-b border-slate-200 flex items-end justify-between h-[50px] bg-emerald-50/50 sticky top-0 z-[10] backdrop-blur-lg transition-all'>
      <div className='flex'>
        <Link href='/' className='flex items-center gap-1 '>
          <Image src="/trebol-navbar.png" alt="trebol logo" width={24} height={24} />
          {/*
          
          <CloverIcon size={24} color='#007A33' className='mr-1 mb-1' />
          */}
          <div className='space-x-2'>
            <TextShimmer className="font-bold text-xl [--base-color:theme(colors.green.600)] [--base-gradient-color:theme(colors.green.200)] dark:[--base-color:theme(colors.green.700)] dark:[--base-gradient-color:theme(colors.green.400)]">2KCELTICS</TextShimmer>
            <TextShimmer className="text-md font-medium [--base-color:theme(colors.green.600)] [--base-gradient-color:theme(colors.green.200)] dark:[--base-color:theme(colors.green.700)] dark:[--base-gradient-color:theme(colors.green.400)]">v2</TextShimmer>
          </div>
        </Link>
      </div>
      <div className='flex items-end'>
        {/* <TextShimmer className="hidden lg:flex text-xl font-medium [--base-color:theme(colors.green.600)] [--base-gradient-color:theme(colors.green.200)] dark:[--base-color:theme(colors.green.700)] dark:[--base-gradient-color:theme(colors.green.400)]">2023/24 WORLD CHAMPIONS</TextShimmer> */}
        <TextShimmer className="hidden lg:flex text-xl font-medium [--base-color:theme(colors.green.600)] [--base-gradient-color:theme(colors.green.200)] dark:[--base-color:theme(colors.green.700)] dark:[--base-gradient-color:theme(colors.green.400)]">MOST NBA WINNING FRANCHISE</TextShimmer>

        <Image className="w-auto h-auto" src='/trophy.png' alt='celtics' width={30} height={30} />
      </div>

      <div className='flex gap-1 z-50'>
        <ModeToggle />
        <Upload isAdmin={isAdmin} />
      </div>

    </header>
  )
}

export default Navbar

