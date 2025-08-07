import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import Image from "next/image";
import { checkFunds, convertCryptoToUSD, mininumAmount } from "@/lib/utils";
import { AlchemyToken, NETWORK_LOGOS, tokenSymbolToId } from "@/lib/types";
import { useAccount } from 'wagmi';
import { useWriteContract } from 'wagmi'
import { erc20Abi, parseUnits } from 'viem';
import { KY, Method } from "@/services/api";
import { set } from "react-hook-form";
import { TransactionStatus } from "./TransactionStatus";


type Props = {
  tokensBalances: AlchemyToken[],
}

type WalletResponse = {
  wallet_address: '0x${string}',
}

const TransactionCrypto = ({ tokensBalances }: Props) => {

  //console.log("Tokens balances:", tokensBalances);
  const tokens = tokensBalances.map((token: AlchemyToken) => ({
    network: token.network,
    contractAddress: token.contractAddress, // Assuming tokenLogo is the contract address
    tokenBalance: token.tokenBalance,
    tokenSymbol: token.tokenSymbol,
    tokenLogo: token.tokenLogo,
    isMultichain: token.isMultichain || false, // Default to false if not provided
  }));

  const [selectedToken, setSelectedToken] = useState(tokensBalances[0] || {});
  const [amount, setAmount] = useState("");
  const [selectedTokenSymbol, setSelectedTokenSymbol] = useState(selectedToken.tokenSymbol || "");
  const [realTimeTokenPrice, setRealTimeTokenPrice] = useState<number | null>(null);
  const [insufficientFunds, setInsufficientFunds] = useState(true);
  const [insufficientMessage, setInsufficientMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(false);
  const { address } = useAccount();
  const [txHash, setTxHash] = useState<`0x${string}` | null>(null);
  const { writeContractAsync } = useWriteContract()

  // TODO: Create a custom hook for cleaning up the code
  async function fetchEthereumPrice(symbol: string): Promise<number | null> {
    const coingeckoId = tokenSymbolToId[symbol.toUpperCase()];
    console.log(`Fetching price for ${symbol} with Coingecko ID:`, coingeckoId);
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoId}&vs_currencies=usd`);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      const tokenPrice = data[coingeckoId]?.usd ?? null;

      return tokenPrice;
    } catch (error) {
      console.error(`Failed to fetch ${symbol} price:`, error);
      return null;
    }
  }


  useEffect(() => {
    const getPrice = async () => {
      const price = await fetchEthereumPrice(selectedTokenSymbol);
      setRealTimeTokenPrice(price);
    };

    getPrice();
    const interval = setInterval(() => {
      getPrice();
    }, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, [selectedTokenSymbol])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])



  const handleSelectChange = (value: any) => {
    const [contract, network] = value.split("_");
    //const token = tokens.find((t: AlchemyToken) => t.contractAddress === value);
    const token = tokens.find(
      (t) => t.contractAddress === contract && t.network === network
    );
    if (!token) return;
    setSelectedToken(token);
    setAmount("");
    setSelectedTokenSymbol(token.tokenSymbol);
  };

  const handleAmountChange = (e: any) => {
    const val = e.target.value;
    setAmount(val);
    const isFunds = checkFunds(val, mininumAmount(selectedToken.tokenBalance, selectedToken.tokenSymbol, realTimeTokenPrice!), selectedToken.tokenBalance);
    setInsufficientFunds(!isFunds.result);
    setInsufficientMessage(isFunds.message);
  };



  const handleConfirm = async () => {
    if (insufficientFunds || !amount || +amount <= 0) return;
    setIsLoading(true);
    try {
      //const YOUR_RECEIVING_WALLET_ADDRESS = 'fetch from backend' as `0x${string}`
      const res = await KY(Method.GET, '/api/v1/recipient-wallet') as WalletResponse

      //console.log("Response from recipient wallet API:", res.wallet_address);

      let value: bigint;
      if (selectedToken.tokenSymbol === 'USDT' || selectedToken.tokenSymbol === 'USDC') value = parseUnits(amount.toString(), 6) // USDT and USDC have 6 decimals
      else value = parseUnits(amount.toString(), 18)

      // const txHash = await writeContractAsync({
      //   account: address,
      //   address: selectedToken.contractAddress as `0x${string}`,
      //   abi: erc20Abi,
      //   functionName: 'transfer',
      //   args: [res.wallet_address, value]
      // }
      // );
      // console.log("Transaction successful:", txHash);

      //setTxHash(txHash);
      setTxHash('0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'); // Mock txHash for testing

    } catch (error) {
      console.error("Transaction failed:", error);
    } finally {
      setIsLoading(false);
      setAmount("");
      setSelectedTokenSymbol("");
      setSelectedToken(tokens[0]);
      inputRef.current?.focus();
    }
  };

  return (
    <Card className="max-w-lg w-full h-[420px] py-6 px-4 bg-white/10 dark:bg-black/10 rounded-2xl shadow-xl mx-auto">
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 justify-center">
          {
            selectedToken ? <Image src={selectedToken.tokenLogo!} alt={selectedToken.tokenSymbol} width={24} height={24} /> : null
          }
          <h2 className="text-xl font-bold">Send {selectedTokenSymbol}</h2>
        </div>

        <Select onValueChange={handleSelectChange} value={selectedToken ? `${selectedToken.contractAddress}_${selectedToken.network}` : undefined}>
          <SelectTrigger>
            <SelectValue placeholder="Select token" />
          </SelectTrigger>
          <SelectContent>
            {tokens.sort((a, b) => b.tokenBalance - a.tokenBalance).map((t: AlchemyToken, i: number) => (
              <SelectItem key={`${t.contractAddress}_${t.network}`} value={`${t.contractAddress}_${t.network}`}>
                <div className="flex justify-between items-center pr-4 gap-2 min-w-[200px]">
                  <div className="flex  items-center gap-2 min-w-[200px]">
                    <div className="">
                      <Image src={t.tokenLogo || ''} alt={t.tokenSymbol || ''} width={28} height={28} />
                    </div>
                    <div className="mt-4 -ml-4">
                      {NETWORK_LOGOS[t.network as keyof typeof NETWORK_LOGOS] ? (
                        <Image src={NETWORK_LOGOS[t.network as keyof typeof NETWORK_LOGOS]} alt={t.network + i} width={16} height={16} className="inline-block mr-1" />
                      ) : null}
                    </div>
                    <span className="text-lg font-bold">
                      {t.tokenSymbol}
                    </span>
                  </div>
                  <div>
                    <span className="text-base font-bold">
                      {t.tokenBalance}
                    </span>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="number"
          placeholder={`Min: ${mininumAmount(selectedToken.tokenBalance, selectedToken.tokenSymbol, realTimeTokenPrice!)} ${selectedToken.tokenSymbol}`}
          value={amount}
          onChange={handleAmountChange}
          className="text-lg font-mono font-bold text-black dark:text-white"
          ref={inputRef}
        />

        <div className="text-sm text-muted-foreground space-y-2">
          {
            insufficientFunds && amount != '' ?
              <p className="text-xs text-red-600 h-[20px]">{insufficientMessage}</p>
              : <p className="text-xs h-[20px]">{''}</p>
          }
          <p className="text-xs h-[20px]">1 {selectedToken.tokenSymbol} = ${realTimeTokenPrice!} USDT</p>
          <p className="uppercase text-xs font-bold h-[20px]">total amount: ${convertCryptoToUSD(Number(amount), realTimeTokenPrice!)} USDT</p>
        </div>
        {
          txHash ? <TransactionStatus txHash={txHash} status="success" onClear={() => setTxHash(null)} />
            : <div className="h-16"></div>
        }
        <Button onClick={handleConfirm} className="w-full text-base font-bold dark:bg-celtics dark:text-white disabled:dark:bg-gray-400" disabled={insufficientFunds || isLoading}>
          {isLoading ? 'Sending...' : 'Confirm'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default TransactionCrypto;

/* 

Si estás fuera de React (archivo utilitario o backend):

import { writeContract, getClient } from '@wagmi/core'

await writeContract(getClient(), {
  account: address,
  address: selectedToken.contractAddress as `0x${string}`,
  abi: erc20Abi,
  functionName: 'transfer',
  args: [YOUR_RECEIVING_WALLET_ADDRESS, value],
})

*/