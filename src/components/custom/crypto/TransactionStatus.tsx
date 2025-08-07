'use client'

import { CheckCircle2, Clock4, XCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useChainId } from 'wagmi'

type Props = {
  txHash: `0x${string}`
  status?: 'pending' | 'success' | 'error'
  onClear?: () => void
}

export const TransactionStatus = ({ txHash, status = 'pending', onClear }: Props) => {

  const chainId = useChainId();
  const explorerMap: Record<number, { name: string; url: string }> = {
    1: { name: 'Etherscan', url: 'https://etherscan.io/tx/' },
    5: { name: 'Goerli Etherscan', url: 'https://goerli.etherscan.io/tx/' },
    11155111: { name: 'Sepolia Etherscan', url: 'https://sepolia.etherscan.io/tx/' },
    42161: { name: 'Arbiscan', url: 'https://arbiscan.io/tx/' },
    421613: { name: 'Arbitrum Goerli', url: 'https://goerli.arbiscan.io/tx/' },
    137: { name: 'Polygonscan', url: 'https://polygonscan.com/tx/' },
    80001: { name: 'Mumbai Polygonscan', url: 'https://mumbai.polygonscan.com/tx/' },
    10: { name: 'Optimism Explorer', url: 'https://optimistic.etherscan.io/tx/' },
    8453: { name: 'Basescan', url: 'https://basescan.org/tx/' },
    84531: { name: 'Base Goerli', url: 'https://goerli.basescan.org/tx/' },
    // Agregá más si necesitás
  }

  const explorer = explorerMap[chainId]

  return (
    <div className="border p-4 h-16 rounded-md shadow-md max-w-xl mx-auto mt-6 bg-white dark:bg-zinc-900">
      <div className="flex items-center space-x-3">
        {status === 'pending' && <Clock4 className="text-yellow-500" />}
        {status === 'success' && <CheckCircle2 className="text-green-600" />}
        {status === 'error' && <XCircle className="text-red-500" />}

        <div>
          <p className="text-sm font-mono">
            {status === 'pending' && 'Transaction is pending...'}
            {status === 'success' && 'Transaction completed successfully!'}
            {status === 'error' && 'Transaction failed. Please try again.'}
          </p>

          <a
            href={`${explorer.url}${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline text-xs font-mono mt-1 inline-block"
          >
            View on {explorer.name} ↗
          </a>
        </div>
      </div>

      {onClear && (
        <div className="text-right mt-2">
          <button onClick={onClear} className="text-xs text-gray-500 underline">
            Clear
          </button>
        </div>
      )}
    </div>
  )
}
