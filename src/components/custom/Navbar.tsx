import React from 'react'
import Upload from './dashboard/Upload'
import { CloverIcon } from 'lucide-react'
import Link from 'next/link'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import Image from 'next/image'

type Props = {}

const Navbar = async (props: Props) => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  //console.log(user);
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL
  let isAdmin = false
  if (user?.email === ADMIN_EMAIL) isAdmin = true
  return (
    <header className='px-4 border-b border-slate-200 flex items-center justify-between h-[50px] bg-emerald-50/50 sticky top-0 z-[10] backdrop-blur-lg transition-all'>
      <div className='flex items-center'>
        <Link href='/' className='flex items-center'>
          <CloverIcon size={24} color='#007A33' className='mr-1 mb-1' />
          <p className="text-celtics text-2xl">2KCELTICS <span className='text-base'>V2</span></p>
        </Link>
      </div>
      <div className='flex items-end'>
        <h1 className="text-celtics text-2xl lg:block hidden">2023/24 WORLD CHAMPIONS</h1>
        <Image className="w-auto h-auto" src='/trophy.png' alt='celtics' width={30} height={30} />
      </div>
      <Upload isAdmin={isAdmin} />
    </header>
  )
}

export default Navbar