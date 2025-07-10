

import ConnectWallet from '@/components/custom/crypto/ConnectWallet'
import MaxWidthWrapper from '@/components/reutilizable/MaxWidthWrapper'
import Reviews from '@/components/reutilizable/Reviews'
import { Button } from '@/components/ui/button'
import Link from 'next/link'





type Props = {}



const CryptoPage = (props: Props) => {

  return (
    <MaxWidthWrapper className="relative h-full mt-8 md:mt-12 lg:mt-24 space-y-8">
      <section className='grid grid-cols-[25%_75%] space-x-4'>
        <div className='-mt-12'>
          <Reviews />
        </div>
        <article className='relative py-12'>
          <ConnectWallet /> {/* From 2kceltics */}
        </article>
      </section>

      <div className='md:pb-16 lg:pb-24 flex justify-center'>
        <Button asChild className='px-2 py-0 mb-4 dark:bg-celtics dark:hover:bg-celtics/90 dark:text-black '>
          <Link href="/" className='text-xs'>BACK</Link>
        </Button>
      </div>
    </MaxWidthWrapper>
  )
}

export default CryptoPage