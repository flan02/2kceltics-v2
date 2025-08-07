import { ALCHEMY_RPC_URLS, AlchemyToken } from "@/lib/types";
import { formatEther, isTokenBalanceGreaterThanZero } from "@/lib/utils";

export async function EthBalancesFromAllNetworks(address: string) {
  const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
  if (!ALCHEMY_API_KEY) {
    throw new Error("Missing Alchemy API key in .env");
  }

  const results = await Promise.allSettled(
    Object.entries(ALCHEMY_RPC_URLS).map(async ([network, baseUrl]) => {
      const fullUrl = `${baseUrl}${ALCHEMY_API_KEY}`;
      const res = await fetch(fullUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "eth_getBalance",
          params: [address, "latest"]
        })
      });

      const data = await res.json();
      if (data.error) throw new Error(`${network}: ${data.error.message}`);

      const rawBalance = data.result;
      const balanceInEth = Number(BigInt(rawBalance)) / 10 ** 18;

      return {
        network,
        eth_balance: balanceInEth
      };
    })
  );

  return results.map((result, index) => {
    const network = Object.keys(ALCHEMY_RPC_URLS)[index];

    if (result.status === "fulfilled") {
      return result.value;
    } else {
      return {
        network,
        eth_balance: null
      };
    }
  });
}



export async function getAlchemyTokenBalance(address: string) {
  const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
  if (!ALCHEMY_API_KEY) {
    throw new Error("Missing Alchemy API key in .env");
  }

  const results = await Promise.allSettled(
    Object.entries(ALCHEMY_RPC_URLS).map(async ([network, baseUrl]) => {
      const fullUrl = `${baseUrl}${ALCHEMY_API_KEY}`;
      const res = await fetch(fullUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "alchemy_getTokenBalances",
          params: [address, "DEFAULT_TOKENS"] // [] para obtener todos los tokens ERC-20
        })
      });
      const tokenData = await res.json();
      if (tokenData.error) throw new Error(`${network}: ${tokenData.error.message}`);
      const balances = tokenData.result.tokenBalances; // Array of AlchemyToken objects
      return {
        network,
        balances: balances.filter((token: any) => isTokenBalanceGreaterThanZero(token.tokenBalance))
      };
    })
  )

  return results.map((result, index) => {
    const network = Object.keys(ALCHEMY_RPC_URLS)[index];

    if (result.status === "fulfilled") {
      return result.value
    } else {
      return {
        network,
        balances: []
      };
    }
  })
}

interface AlchemyNetwork {
  network: string
  balances: [
    {
      contractAddress: string
      tokenBalance: number
    }
  ]
}

export async function getAlchemyTokenMetadata(allTokensNetworks: AlchemyNetwork[]) {
  const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
  if (!ALCHEMY_API_KEY) {
    throw new Error("Missing Alchemy API key in .env");
  }

  // Solo tokens con balance > 0
  const filtered = allTokensNetworks.flatMap(networkObj =>
    networkObj.balances
      .filter(balance => isTokenBalanceGreaterThanZero(balance.tokenBalance))
      .map(balance => ({
        network: networkObj.network,
        contractAddress: balance.contractAddress,
        tokenBalance: balance.tokenBalance,
      }))
  );

  const results = await Promise.allSettled(
    filtered.map(async (token) => {
      const baseUrl = ALCHEMY_RPC_URLS[token.network as keyof typeof ALCHEMY_RPC_URLS];
      if (!baseUrl) throw new Error(`Unsupported network: ${token.network}`);
      const fullUrl = `${baseUrl}${ALCHEMY_API_KEY}`;

      const res = await fetch(fullUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "alchemy_getTokenMetadata",
          params: [token.contractAddress],
        }),
      });

      const metadata = await res.json();
      if (metadata.error) {
        throw new Error(`${token.network}: ${metadata.error.message}`);
      }

      const decimals = metadata.result.decimals ?? 6; // Usa los decimales reales del token
      return {
        network: token.network,
        contractAddress: token.contractAddress,
        tokenBalance: Number(BigInt(token.tokenBalance)) / 10 ** decimals,
        tokenSymbol: metadata.result.symbol,
        tokenLogo: metadata.result.logo,
      };
    })
  );

  return results.map((result, i) => {
    if (result.status === "fulfilled") {
      return result.value;
    } else {
      const token = filtered[i];
      return {
        network: token.network,
        contractAddress: token.contractAddress,
        tokenBalance: 0,
        tokenSymbol: "Unknown",
        tokenLogo: null,
        error: result.reason?.message || "Unknown error"
      };
    }
  });
}


