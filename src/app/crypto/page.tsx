'use client'
import { TextShimmer } from '@/components/core/text-shimmer'
import ConnectWallet from '@/components/custom/crypto/ConnectWallet'
import MaxWidthWrapper from '@/components/reutilizable/MaxWidthWrapper'
import Reviews from '@/components/reutilizable/Reviews'
import { Button } from '@/components/ui/button'
import { useWalletStore } from '@/zustand/store'
import { Star } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'



type Props = {}

const text = [
  'Integrate several performance charts each season to monitor and analyze Boston Celtics player stats throughout the year.',
  'Track and store every Boston Celtics box score, and generate advanced stats to thoroughly analyze the team’s production.',
  'Train an AI assistant capable of analyzing Boston Celtics stats to recommend new playbooks and lineups. It will also interact with visitors by sharing insights on real players’ performances.',
  'Keep supporting 2K Celtics seasons — experience real-time game simulations and help spread the legacy of the Boston Celtics online.',
  'Celebrate each 2kCeltics season with a unique NFT collection designed for fans to collect, display in their crypto wallets, and share across social media.'
]

const items = text.map((t) => ({
  text: t,
  icon: <Star className='size-6 text-celtics' fill='#007a33' /> // fill='#007a33'
}))

const CryptoPage = (props: Props) => {
  // const { isConnected } = useAccount()
  // const setIsConnected = useWalletStore(state => state.setIsConnected)

  // useEffect(() => {
  //   setIsConnected(isConnected)
  // }, [isConnected])

  const isConnected = false
  return (
    <MaxWidthWrapper className="relative h-full mt-8 md:mt-12 lg:mt-24 space-y-8">
      <section className='grid grid-cols-[25%_75%] space-x-4'>
        <div className='-mt-12'>
          <Reviews />
        </div>

        {
          isConnected
            ? <section className='relative py-12'>
              <h1 className='uppercase text-celtics text-2xl lg:text-4xl font-bold'>WALLET COMPONENT CONNECTED</h1>
            </section>
            : <div className='relative py-12'>

              <div className='text-center mx-auto space-y-8'>
                <h1 className='uppercase text-celtics text-2xl lg:text-4xl font-bold'>Shape the next gen of 2kCeltics features</h1>
                <p className='text-sm lg:text-base px-6 text-muted-foreground font-mono'>Connect your wallet to support the development of 2kceltics Dapp and future features.
                  Your privacy matters — we use private wallets and guarantee your anonymity.
                </p>
                <article className='border max-w-2xl mx-auto rounded-md py-6'>
                  {
                    items.map((item, index) => (
                      <div key={index} className='px-4 flex text-left space-y-4 justify-start items-center space-x-2'>
                        <span>{item.icon}</span>
                        <TextShimmer className="font-mono text-base [--base-color:theme(colors.green.600)] [--base-gradient-color:theme(colors.green.200)] dark:[--base-color:theme(colors.green.700)] dark:[--base-gradient-color:theme(colors.green.400)]">{item.text}</TextShimmer>

                      </div>
                    ))
                  }

                </article>
                <ConnectWallet /> {/* From 2kceltics */}
              </div>
            </div>
        }
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