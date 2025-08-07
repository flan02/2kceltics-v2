
'use client'
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount, useSignMessage } from 'wagmi';
import { KY, Method } from '@/services/api';
import { Star, Wallet2 } from 'lucide-react';
import { TextShimmer } from '@/components/core/text-shimmer';
import { Skeleton } from '@/components/ui/skeleton';
import WalletConnected from './WalletConnected';
import { Button } from '@/components/ui/button';
import { FaPaypal } from 'react-icons/fa6';




const ConnectButton = dynamic(
  () => import('@rainbow-me/rainbowkit').then(mod => mod.ConnectButton),
  { ssr: false } // para evitar que se cargue en SSR
);

type Props = {
  isMounted: boolean;
}


const ConnectWallet = ({ isMounted }: Props) => {
  const { openConnectModal } = useConnectModal();
  const [loaded, setLoaded] = useState(false);
  const { address, isConnected, chain, status } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const [authenticated, setAuthenticated] = useState(false)

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


  const handleClick = async () => {
    if (!loaded) {
      setLoaded(true);
      // Esperar que ConnectButton se cargue
      // Luego abrir modal automáticamente
      // Lo hacemos en useEffect abajo
    } else {
      openConnectModal?.();
    }
  };

  useEffect(() => {
    if (loaded) {
      openConnectModal?.();
    }
  }, [loaded, openConnectModal]);


  // ? This useEffect is used to remove duplicate wallet options in the connect modal 
  useEffect(() => {
    const interval = setInterval(() => {
      const nodes = document.querySelectorAll('[data-testid="rk-wallet-option-io.rabby"]')
      const nodes2 = document.querySelectorAll('[data-testid="rk-wallet-option-org.uniswap.app"]')
      const nodes3 = document.querySelectorAll('[data-testid="rk-wallet-option-com.okex.wallet"]')


      if (nodes.length > 1) {
        console.log("Removing duplicates for Rabby Wallet")
        nodes.forEach((node, index) => {
          if (index > 0) node.remove()
        })

        clearInterval(interval) // Detenemos el chequeo cuando eliminamos duplicados
      }

      if (nodes2.length > 1) {
        console.log("Removing duplicates for Uniswap Wallet")
        nodes2.forEach((node, index) => {
          if (index > 0) node.remove()
        })

        clearInterval(interval) // Detenemos el chequeo cuando eliminamos duplicados
      }

      if (nodes3.length > 1) {
        console.log("Removing duplicates for OKX Wallet")
        nodes3.forEach((node, index) => {
          if (index > 0) node.remove()
        })

        clearInterval(interval) // Detenemos el chequeo cuando eliminamos duplicados
      }

    }, 300) // chequea cada 300ms

    return () => clearInterval(interval)
  }, [])


  useEffect(() => {
    const signInWithEthereum = async () => {
      if (!isConnected || !address) return
      try {
        const isAuth = await fetch('/api/v1/siwe/session')
        const { authenticated } = await isAuth.json()

        if (authenticated) {
          //console.log('🔐 Authenticated with SIWE')
          setAuthenticated(true)
          return
        }
        const res = await KY(Method.POST, '/api/v1/siwe/message', {
          address,
          chainId: chain?.id
        }) as { message: string };

        const message = res.message
        //console.log("SIWE message", message);
        //console.log(message.length);
        const signature = await signMessageAsync({ message })

        await KY(Method.POST, '/api/v1/siwe/verify', {
          message,
          signature,
        })

        setAuthenticated(true)
      } catch (err) {
        console.error('Error during SIWE login:', err)
      }
    }
    signInWithEthereum()

  }, [isConnected, status, address, chain, signMessageAsync])


  return (
    <section className=''>

      {/* <AutoConnectModal /> Automatically opens the connect modal on page load */}
      {/* <ConnectButton showBalance={true} />  component from rainbowkit */}

      {
        isConnected && authenticated
          ?
          <WalletConnected address={address ?? ''} />
          :
          !isConnected && status === 'disconnected' && isMounted
            ?
            <div className='text-center mx-auto space-y-8 mb-8'>
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
            </div>
            :
            <Skeleton className="h-[calc(100vh-280px)] w-full" />

      }

      {loaded && !isConnected && isMounted
        ? <div className='flex justify-center'>
          <ConnectButton showBalance={true} />
        </div>
        :
        !isConnected && status === 'disconnected' && isMounted
          ?
          <DonateSection handleClick={handleClick} />
          : null
      }

    </section>
  )
}

export default ConnectWallet



type Props1 = {
  handleClick: () => void;
}

const DonateSection = ({ handleClick }: Props1) => {
  return (
    <div className='flex w-full space-x-4 justify-center items-center'>
      <h3 className='font-bold'>BE CRYPTO</h3>
      <Button onClick={handleClick} className='flex space-x-2 items-end text-white bg-celtics hover:bg-celtics/90 font-bold'>
        <Wallet2 />
        <span>Connect Wallet</span>
      </Button>
      <span className='font-bold'>OR</span>
      {/* <h3 className='font-bold'>VIA</h3> */}
      <Button className='bg-blue-500 hover:bg-blue-500/90 text-white font-bold space-x-2'>
        <FaPaypal size={20} />
        <span>Paypal</span>
      </Button>
    </div>
  )
} 