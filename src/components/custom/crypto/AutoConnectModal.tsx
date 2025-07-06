'use client'

import { useEffect } from 'react'
import { useConnectModal } from '@rainbow-me/rainbowkit'

type Props = {}

const AutoConnectModal = (props: Props) => {
  const { openConnectModal } = useConnectModal()

  useEffect(() => {
    // Mostramos el modal automáticamente al cargar la página
    if (openConnectModal) {
      openConnectModal()
    }
  }, [openConnectModal])

  return null // No necesitamos renderizar nada
}

export default AutoConnectModal