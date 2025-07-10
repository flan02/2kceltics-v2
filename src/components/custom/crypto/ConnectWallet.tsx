
'use client'
import { useEffect, useState } from 'react';
//import { ConnectButton } from '@rainbow-me/rainbowkit'
import AutoConnectModal from './AutoConnectModal'
import dynamic from 'next/dynamic';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount, useSignMessage } from 'wagmi';
import { KY, Method } from '@/services/api';
import { Wallet2 } from 'lucide-react';
import { useWalletStore } from '@/zustand/store';
type Props = {}

const ConnectButton = dynamic(
  () => import('@rainbow-me/rainbowkit').then(mod => mod.ConnectButton),
  { ssr: false } // para evitar que se cargue en SSR
);

const ConnectWallet = (props: Props) => {
  const { openConnectModal } = useConnectModal();
  const [loaded, setLoaded] = useState(false);
  const { setIsConnected } = useWalletStore()
  const { address, isConnected, chain } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const [hasSignedIn, setHasSignedIn] = useState(false)
  const [readyToSign, setReadyToSign] = useState(false)
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
      if (!isConnected || !address || hasSignedIn) return

      try {

        const res = await KY(Method.POST, '/api/v1/siwe/message', {
          address,
          chainId: chain?.id
        }) as { message: string };

        const message = res.message

        //console.log(message);
        //console.log(message.length);

        const signature = await signMessageAsync({ message })

        await KY(Method.POST, '/api/v1/siwe/verify', {
          message,
          signature
        })

        setHasSignedIn(true)
      } catch (err) {
        console.error('Error during SIWE login:', err)
      }
    }
    // setIsConnected(isConnected)
    if (isConnected) {
      signInWithEthereum()
    }

  }, [isConnected, address, chain, hasSignedIn, signMessageAsync])


  return (
    <section className=''>

      {/* <AutoConnectModal /> Automatically opens the connect modal on page load */}
      {/* <ConnectButton showBalance={true} />  component from rainbowkit */}
      {loaded && !isConnected
        ? <div className='flex justify-center'>
          <ConnectButton showBalance={true} />
        </div>
        : <button onClick={handleClick} className='flex space-x-2 mx-auto items-end text-yellow-200 bg-celtics hover:bg-celtics/90 px-2.5 py-2.5 rounded-md font-bold'>
          <Wallet2 />
          <span>Connect Wallet</span>
        </button>
      }
      {/* {
        isConnected ? <p>WALLET CONNECTED</p> : <p>WALLET NOT CONNECTED</p>
      } */}

    </section>
  )
}

export default ConnectWallet




