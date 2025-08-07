'use client'


import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import TransactionCrypto from "./TransactionCrypto";
import { AlchemyToken, HOME_TOKENS, NETWORK_LOGOS } from "@/lib/types";
import { aggregateBalances, formatRealTimePrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";



const AlchemyTokenDisplay = () => {

  const { address, isConnected } = useAccount();
  const [tokens, setTokens] = useState<{ tokenBalances: any[] } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchUserTokens(address: string) {
    const res = await fetch("/api/v1/tokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address }),
    });

    if (!res.ok) throw new Error("Error al obtener tokens");
    return await res.json();
  }

  useEffect(() => {
    if (isConnected && address) {
      fetchUserTokens(address)
        // .then(setTokens)
        .then((data) => {
          // console.log("Tokens recibidos:", data);
          // TODO: Add Fake tokens to the list
          setTokens(data);
          //setTokens(HOME_TOKENS)
        })
        .catch(console.error);
    }
  }, [address, isConnected]);

  const balancePerToken = aggregateBalances(tokens?.tokenBalances || []);


  const refreshBalance = async () => {
    try {
      setIsLoading(true); // si querés mostrar un spinner
      const data = await fetchUserTokens(address!);
      setTokens(data);
      //setTokens(HOME_TOKENS); 
    } catch (error) {
      console.error("❌ Error al refrescar el balance:", error);
    } finally {
      setIsLoading(false);
    }
  };



  if (!isConnected) return <div>Connect your Wallet</div>;

  return (
    <section>
      {
        tokens
          ? <div className="flex space-x-2 items-center px-4">
            <p className="font-bold text-sm">Wallet Connected: </p>
            <p className="bg-black text-sm px-4 py-2 rounded-sm text-yellow-200 dark:bg-celtics dark:text-white">{address}</p>
          </div>
          : <Skeleton className="h-8 w-80" />
      }
      <br />
      {
        tokens ?
          <TransactionCrypto tokensBalances={tokens?.tokenBalances!} />
          : <Skeleton className="h-[420px] max-w-lg mx-auto" />
      }
      <br />

      <div className="flex justify-between">
        <h3 className="text-muted-foreground mb-1 font-bold">Check your current tokens total balance</h3>
        <Button onClick={refreshBalance} className="text-xs">Refresh Balance</Button>
      </div>
      <br />
      <div className="space-y-2">
        {
          tokens && !isLoading ? balancePerToken.map((token: any, i: number) => (
            <article key={i} className="flex items-center gap-6 border py-4 px-6 rounded-xl shadow-sm">
              <Image src={token.tokenLogo} alt={token.tokenLogo} width={36} height={36} />
              <div className="flex-1">
                <div className="flex-col space-y-1">
                  <div className="space-x-6">
                    <span className="font-bold text-xl">{token.tokenSymbol}</span>
                    <span className="text-[10px] text-purple dark:text-yellow-200">{(token.isMultichain ? "(MULTICHAIN)" : "")}</span>
                  </div>
                  <div className="space-x-1 flex h-[20px]">
                    {
                      tokens && token.networks.map((network: string, id: number) => (
                        <span key={id} className="text-xs text-muted-foreground">
                          {NETWORK_LOGOS[network as keyof typeof NETWORK_LOGOS] ? (
                            <Image src={NETWORK_LOGOS[network as keyof typeof NETWORK_LOGOS]} alt={network} width={16} height={16} className="inline-block mr-1" />
                          ) : null}
                        </span>
                      ))
                    }
                  </div>
                </div>
              </div>
              <p className="text-2xl font-bold font-serif">{String(token.tokenBalance)}</p>
            </article>
          ))

            : <>
              <Skeleton className="h-20 w-full rounded-xl" />
              <Skeleton className="h-20 w-full rounded-xl" />
              <Skeleton className="h-20 w-full rounded-xl" />
            </>
        }

      </div>
    </section>
  )
}

export default AlchemyTokenDisplay



