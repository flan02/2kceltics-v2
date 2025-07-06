import { Metadata } from 'next';
import dynamic from 'next/dynamic'
import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: "2kceltics | Dapp",
  description: "2kceltics v2",
  metadataBase: new URL("https://www.2kceltics.xyz"),
  authors: {
    name: "Dan Chanivet",
    url: "https://danchanivet.tech",
  },
  publisher: "Vercel",
  openGraph: {
    images: [
      {
        url: "./opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "2kceltics banner",
      },

    ]
  }
};

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