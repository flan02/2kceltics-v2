import { useState, useEffect } from 'react';

export interface WalletProvider {
  isMetaMask?: boolean;
  isRabby?: boolean;
  isOkxWallet?: boolean;
  isUniswap?: boolean;
  // Agregá más flags según wallets que quieras detectar
  [key: string]: any;
}

export function useUniqueWallets() {
  const [wallets, setWallets] = useState<WalletProvider[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const providers = Array.isArray(window.ethereum.providers)
        ? window.ethereum.providers
        : [window.ethereum];

      // Filtramos providers válidos (que tengan algún flag conocido)
      const filtered = providers.filter(
        (p: WalletProvider, i: number, self: WalletProvider[]) => {
          // Eliminar entradas sin id o flags esperados
          if (
            !(
              p.isMetaMask ||
              p.isRabby ||
              p.isOkxWallet ||
              p.isUniswap
              // Agregá más detecciones acá
            )
          ) {
            return false;
          }

          // Evitar duplicados basados en una propiedad única (por ej: isMetaMask + isRabby)
          // Podrías usar p.constructor.name o algún identificador si existe
          return (
            self.findIndex(
              (w: WalletProvider) =>
                (w.isMetaMask && p.isMetaMask) ||
                (w.isRabby && p.isRabby) ||
                (w.isOkxWallet && p.isOkxWallet) ||
                (w.isUniswap && p.isUniswap)
            ) === i
          );
        }
      );

      setWallets(filtered);
    }
  }, []);

  return wallets;
}
