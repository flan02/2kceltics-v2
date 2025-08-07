import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { AggregatedToken, AlchemyToken, current_season, playerImages2K25, SeasonSpans } from "./types";
import { getCurrentSpan } from "@/app/actions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function keysToLowerCase(obj: Record<string, any>): Record<string, any> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key.toLowerCase(), value])
  );
}


export async function normalizeSeasonPlayerInput(raw: Record<string, any>): Promise<Record<string, any>> {

  const nextGamespan = async (): Promise<number> => {
    // This function should retrieve the next gamespan from the database.}
    const span = await getCurrentSpan()

    const index = SeasonSpans.indexOf(span);
    if (index === -1) {
      throw new Error(`Invalid currentGame value: ${span}`);
    }

    return SeasonSpans[index]
  }

  const nextSpan = await nextGamespan();

  console.log("current gamespan", nextSpan);

  return {
    name: raw["Name"],
    pos: raw["POS"],
    season: current_season,
    gamespan: nextSpan, // raw["gamespan"]
    gs: parseInt(raw["GS"]),
    gp: parseInt(raw["GP"]),
    min: parseFloat(raw["MIN"]),
    pts: parseFloat(raw["PTS"]),
    reb: parseFloat(raw["REB"]),
    ast: parseFloat(raw["AST"]),
    stl: parseFloat(raw["STL"]),
    blk: parseFloat(raw["BLK"]),
    to: parseFloat(raw["TO"]),
    fls: parseFloat(raw["FLS"]),
    fgPct: parseFloat(raw["FG%"] ?? "0"),
    fgm: parseFloat(raw["FGM"]),
    fga: parseFloat(raw["FGA"]),
    tpPct: parseFloat(raw["3P%"] ?? "0"),
    tpm: parseFloat(raw["3PM"]),
    tpa: parseFloat(raw["3PA"]),
    ftPct: parseFloat(raw["FT%"] ?? "0"),
    ftm: parseFloat(raw["FTM"]),
    fta: parseFloat(raw["FTA"]),
    pa: parseFloat(raw["PA"]),
    ofgm: parseFloat(raw["oFGM"]),
    ofga: parseFloat(raw["oFGA"]),
    plusMinus: parseFloat(raw["+/-"])
  };
}


export function getImagePath(name: string): string {
  if (!name) return '/default.png';
  return (
    playerImages2K25[name] ||
    '/' + name.replace('.', '').replace(' ', '').toLowerCase() + '.png'
  );
}


export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function mininumAmount(balance: number, token: string, realTimeValue: number): number {
  let min_amount = 1 // * HERE'S WE CHANGE THE MINIMUM AMOUNT
  if (token === 'USDT' || token === 'USDC') return Number(min_amount.toFixed(2));
  min_amount = (min_amount / realTimeValue);
  const correctDecimals = min_amount.toFixed(6)
  return Number(correctDecimals)
}

export function checkFunds(amount: number, minAmount: number, balance: number): { result: boolean, message: string } {
  let result: boolean;
  let message: string = "";

  if (amount > minAmount) {
    result = true;
    message = `The minimum you can send is ${minAmount} tokens`;
  } else {
    result = false;
    message = `The minimum you can send is ${minAmount} tokens`;
  }

  if (balance < amount) {
    result = false;
    message = `Insufficient funds. You have ${balance} tokens`;
  }

  return { result, message };
}


export function convertCryptoToUSD(amount: number, realTimeValue: number): number {
  let result: any
  if (amount <= 0 || realTimeValue <= 0) return 0;
  result = (amount * realTimeValue).toFixed(2);
  return Number(result);
}

export function formatRealTimePrice(price: number, token: string): number {
  if (token === 'USDT' || token === 'USDC') return Number(price.toFixed(5));
  return Number(price.toFixed(6));
}

export function isTokenBalanceGreaterThanZero(hexBalance: number): boolean {
  try {
    return BigInt(hexBalance) > BigInt("0");
  } catch {
    return false;
  }
}

export function formatEther(balance: number): number {
  if (balance >= 1) return Number(balance.toFixed(4));
  if (balance >= 0.000001) return Number(balance.toFixed(8));
  return 0;
};

export function aggregateBalances(tokens: AlchemyToken[]): AggregatedToken[] {
  const tokensFlat = tokens?.flat(); // en tu ejemplo, es un array anidado
  return tokensFlat.reduce((acc, token) => {
    const existing = acc.find((item) => item.tokenSymbol === token.tokenSymbol);

    if (existing) {
      existing.tokenBalance += token.tokenBalance;
      existing.networks.push(token.network);
      existing.isMultichain = existing.networks.length > 1;
    } else {
      acc.push({
        tokenSymbol: token.tokenSymbol,
        tokenLogo: token.tokenLogo,
        tokenBalance: token.tokenBalance,
        networks: [token.network],
        isMultichain: token.isMultichain,
      });
    }

    return acc;
  }, [] as AggregatedToken[]);
}


// import { TransactionResponse } from "ethers";
// export const handleTransaction = async (
//   tx: TransactionResponse,
//   address: string,
//   onUpdate?: () => Promise<void>
// ) => {
//   try {
//     await tx.wait(); // Espera confirmación
//     console.log("✅ Transacción confirmada");

//     if (onUpdate) {
//       await onUpdate(); // Refresca balances u otros datos
//     }
//   } catch (error) {
//     console.error("❌ Error al manejar la transacción:", error);
//   }
// };

// how to use it in a component
// await handleTransaction(tx, address, () => fetchUserTokens(address));
