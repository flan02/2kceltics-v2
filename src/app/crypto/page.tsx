
import ConnectWallet from '@/components/custom/crypto/ConnectWallet'
import MaxWidthWrapper from '@/components/reutilizable/MaxWidthWrapper'
import { Button } from '@/components/ui/button'
import Link from 'next/link'


type Props = {}

const CryptoPage = (props: Props) => {

  return (
    <MaxWidthWrapper className="relative h-screen">
      <div className=''>
        <h1 className='text-celtics text-7xl text-center'>
          Features incoming ...
        </h1>
      </div>


      <ConnectWallet /> {/* From 2kceltics */}


      <div className='md:pb-16 lg:pb-24 flex justify-center'>
        <Button asChild className='px-2 py-0 mb-4 dark:bg-celtics dark:hover:bg-celtics/90 dark:text-black '>
          <Link href="/" className='text-xs'>BACK</Link>
        </Button>
      </div>
    </MaxWidthWrapper>
  )
}

export default CryptoPage