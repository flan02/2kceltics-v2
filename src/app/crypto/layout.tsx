import dynamic from 'next/dynamic'
import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const Web3Provider = dynamic(() => import('@/components/reutilizable/Web3Provider'), { ssr: false })

export default function Layout({ children }: LayoutProps) {

  return (
    <div className='min-h-screen'>

      <Web3Provider>
        {children}
      </Web3Provider>
    </div>
  )
}