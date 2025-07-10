
'use client'
import { useEffect, useState } from 'react';
//import { ConnectButton } from '@rainbow-me/rainbowkit'
import AutoConnectModal from './AutoConnectModal'
import dynamic from 'next/dynamic';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect, useSignMessage } from 'wagmi';
import { KY, Method } from '@/services/api';
import { Star, Wallet2 } from 'lucide-react';
import { useWalletStore } from '@/zustand/store';
import { set } from 'react-hook-form';
import { verify } from 'crypto';
import { TextShimmer } from '@/components/core/text-shimmer';
import { Button } from '@/components/ui/button';



const ConnectButton = dynamic(
  () => import('@rainbow-me/rainbowkit').then(mod => mod.ConnectButton),
  { ssr: false } // para evitar que se cargue en SSR
);



const ConnectWallet = () => { // { onSignedIn }: { onSignedIn: () => void }
  const { openConnectModal } = useConnectModal();
  const [loaded, setLoaded] = useState(false);
  const { address, isConnected, chain, status } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const { disconnect } = useDisconnect()
  // const { status, setStatus } = useWalletStore()

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
          console.log('🔐 Authenticated with SIWE')
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


      } catch (err) {
        console.error('Error during SIWE login:', err)
      }
    }
    signInWithEthereum()
    // setLoaded(true)
  }, [isConnected, status, address, chain, signMessageAsync]) // isConnected, signMessageAsync


  // if (!loaded && !isConnected) {
  //   return <div>...Loading</div>
  // }

  console.log('isConnected value', isConnected);
  console.log('loaded value', loaded);
  console.log('status value', status);

  return (
    <section className=''>

      {/* <AutoConnectModal /> Automatically opens the connect modal on page load */}
      {/* <ConnectButton showBalance={true} />  component from rainbowkit */}

      {
        isConnected
          ?
          <div>
            <p>WALLET CONNECTED</p>
            {/* <Button onClick={() => disconnect()} className='bg-celtics text-yellow-200'>Disconnect Wallet</Button> */}
          </div>
          :
          !isConnected && status === 'disconnected'
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
            <p className='text-4xl'>...Loading</p>

      }

      {loaded && !isConnected
        ? <div className='flex justify-center'>
          <ConnectButton showBalance={true} />
        </div>
        :
        !isConnected && status === 'disconnected'
          ?
          (<button onClick={handleClick} className='flex space-x-2 mx-auto items-end text-yellow-200 bg-celtics hover:bg-celtics/90 px-2.5 py-2.5 rounded-md font-bold'>
            <Wallet2 />
            <span>Connect Wallet</span>
          </button>)
          : null
      }

    </section>
  )
}

export default ConnectWallet




