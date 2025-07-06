
'use client'
import { useEffect, useState } from 'react';
//import { ConnectButton } from '@rainbow-me/rainbowkit'
import AutoConnectModal from './AutoConnectModal'
import dynamic from 'next/dynamic';
import { useConnectModal } from '@rainbow-me/rainbowkit';
type Props = {}

const ConnectButton = dynamic(
  () => import('@rainbow-me/rainbowkit').then(mod => mod.ConnectButton),
  { ssr: false } // para evitar que se cargue en SSR
);




const ConnectWallet = (props: Props) => {
  const { openConnectModal } = useConnectModal();
  const [loaded, setLoaded] = useState(false);


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


  return (
    <section className=''>
      <h1 className='text-2xl'>Image here</h1>
      {/* <AutoConnectModal /> Automatically opens the connect modal on page load */}
      {/* <ConnectButton showBalance={true} />  component from rainbowkit */}
      {loaded
        ? <>

          <ConnectButton />
        </>
        : <button onClick={handleClick} className='text-white bg-celtics px-2.5 py-2.5 rounded-md font-bold'>Connect Wallet</button>
      }

    </section>
  )
}

export default ConnectWallet




