import React from 'react'
import Upload from '../reutilizable/Upload'
import { CloverIcon } from 'lucide-react'
import Link from 'next/link'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <header className='px-4 border-b border-slate-200 flex items-center justify-between h-[50px] bg-emerald-50/50 sticky top-0 z-[10] backdrop-blur-lg transition-all'>
      <div className='flex items-center'>
        <Link href='/' className='flex items-center'>
          <CloverIcon size={24} color='#007A33' className='mr-1 mb-1' />
          <p className="text-celtics text-2xl">2KCELTICS <span className='text-base'>V2</span></p>
        </Link>
      </div>
      <h1 className="text-celtics text-2xl">2023/24 WORLD CHAMPIONS</h1>
      <Upload />
    </header>
  )
}

export default Navbar