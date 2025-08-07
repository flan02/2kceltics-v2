// * This provider will configure the web3 context for the application
// red mainnet and compatible wallets
'use client'

import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider, darkTheme, getDefaultConfig } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { arbitrum, base, mainnet, optimism, polygon, zkSync, sepolia } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

const queryClient = new QueryClient() // wagmi v2 needs a react-query client

const config = getDefaultConfig({
  appName: '2kceltics-Dapp',
  projectId: process.env.NEXT_PUBLIC_REOWN_PROJECT_ID!, // your project id from https://reown.network/
  chains: [mainnet, polygon, arbitrum, optimism, base, zkSync],
  ssr: true
})


interface Props {
  children: ReactNode
}


//console.log("Current chain connected", config.chains.map(chain => `${chain.name} (${chain.id})`).join(', '));

const Web3Provider = ({ children }: Props) => {

  const customTheme = darkTheme({
    accentColor: '#007a33',
    accentColorForeground: 'white',
    borderRadius: 'medium',
    fontStack: 'system',
    overlayBlur: 'small',
  })

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider initialChain={mainnet} theme={customTheme}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default Web3Provider