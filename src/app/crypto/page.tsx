//import WrapperClient from '@/components/reutilizable/WrapperClient'

import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'


const WrapperClient = dynamic(() => import('@/components/reutilizable/WrapperClient'), {
  ssr: false,
  loading: () => <Skeleton className="h-[calc(100vh-200px)] w-full" />
})


type Props = {}

const CryptoPage = (props: Props) => {

  return (
    <WrapperClient />
  )
}

export default CryptoPage