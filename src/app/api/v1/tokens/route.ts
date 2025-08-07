
// chains and id
// Ethereum (1), Polygon (137), Arbitrum One (42161), OP Mainnet (10), Base (8453), ZKsync Era (324)
import { formatEther } from "@/lib/utils";
import { EthBalancesFromAllNetworks, getAlchemyTokenBalance, getAlchemyTokenMetadata } from "@/services/backend";


export async function POST(request: Request) {

  try {
    const body = await request.json();
    const { address } = body;

    if (!address || typeof address !== "string") {
      return new Response(JSON.stringify({ error: "Invalid address" }), { status: 400 });
    }

    const ethBalanceAllNetworks = await EthBalancesFromAllNetworks(address); // * Fetch ETH balances from all networks
    //console.dir(ethBalanceAllNetworks, { depth: null });

    const total_eth_balance = ethBalanceAllNetworks.map((network) => {
      return network.eth_balance;
    }).reduce((acc, balance) => acc! + balance!, 0); // * Calculate total ETH balance across all networks */

    //console.log("ethBalance per network", ethBalanceArray);
    //console.log("ethBalance total", total_eth_balance);
    const eth_contractAddress = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"


    const allTokensNetwork = await getAlchemyTokenBalance(address);

    allTokensNetwork.map((net, i) => {
      net.balances.push({
        contractAddress: eth_contractAddress,
        tokenBalance: ethBalanceAllNetworks[i].eth_balance!,
      });
    })

    //   console.dir(allTokensNetwork, { depth: null });





    const enrichedTokensNetwork = await getAlchemyTokenMetadata(allTokensNetwork);

    ethBalanceAllNetworks.map((ethBalance, index) => {
      if (!ethBalance || ethBalance.eth_balance === null) return;
      const formattedBalance = formatEther(ethBalance.eth_balance!);

      if (ethBalance.eth_balance > 0) {
        enrichedTokensNetwork.unshift({
          network: ethBalance.network,
          contractAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", // conventional address for ETH
          tokenBalance: formattedBalance,
          tokenSymbol: "ETH",
          tokenLogo: "/crypto/eth-logo.png"
        });
      }
    })


    //console.dir(enrichedTokensNetwork, { depth: null });

    const symbolToNetworks = new Map<string, Set<string>>();

    enrichedTokensNetwork.forEach(token => {
      const symbol = token.tokenSymbol.toUpperCase();
      if (!symbolToNetworks.has(symbol)) {
        symbolToNetworks.set(symbol, new Set());
      }
      symbolToNetworks.get(symbol)!.add(token.network);
    });

    // Obtener símbolos multichain
    const multichainSymbols = new Set(
      Array.from(symbolToNetworks.entries())
        .filter(([_, networks]) => networks.size > 1)
        .map(([symbol]) => symbol)
    );

    // Agregar la propiedad isMultichain a cada token
    const tokensWithMultichainFlag = enrichedTokensNetwork.map(token => ({
      ...token,
      isMultichain: multichainSymbols.has(token.tokenSymbol.toUpperCase())
    }));

    //console.dir(tokensWithMultichainFlag, { depth: null });

    return new Response(JSON.stringify({ tokenBalances: tokensWithMultichainFlag }), { status: 200 });
  } catch (error) {
    console.error("Server error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}


/* 
{
    "address": "0x0eac91beFC5f1eBbf344AFe180Ffa466db50e0af"
}
*/
