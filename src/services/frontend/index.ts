import { ethers } from "ethers";

export type SendTokenProps = {
  provider: ethers.BrowserProvider,
  recipientAddress: string,
  amount: string,
  tokenAddress: string
}

// This fc works whether the token is native (ETH, MATIC, etc.) or ERC-20
export async function sendToken({ provider, recipientAddress, amount, tokenAddress }: SendTokenProps): Promise<ethers.TransactionResponse> {
  if (!ethers.isAddress(recipientAddress)) {
    throw new Error("Invalid recipient address");
  }
  if (!amount || isNaN(Number(+amount)) || +amount <= 0 || +amount < 1e-12) {
    throw new Error("Invalid amount");
  }

  const NATIVE_TOKEN_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"

  // minimum ABI for tokens ERC-20 (Application Binary Interface. Describe how to interact with the smart contract)
  // we only are using transfer & decimals
  const ERC20_ABI = [
    "function transfer(address to, uint amount) returns (bool)",
    "function decimals() view returns (uint8)",
    // "function balanceOf(address) view returns (uint)",
    // "function symbol() view returns (string)",
    // "function name() view returns (string)",
    // "function approve(address spender, uint amount) returns (bool)",
    // "function allowance(address owner, address spender) view returns (uint)"
  ];


  const signer = await provider.getSigner();

  if (!signer) throw new Error("No signer detected");

  if (tokenAddress.toLocaleLowerCase() === NATIVE_TOKEN_ADDRESS) {
    // Send native token (ETH, MATIC, etc.)
    const tx = await signer.sendTransaction({
      to: recipientAddress,
      value: ethers.parseEther(amount),
    });
    await tx.wait();
    return tx;
  } else {
    // Send token ERC-20
    const token = new ethers.Contract(tokenAddress, ERC20_ABI, signer); // * contract constructor
    const decimals = await token.decimals();
    const parsedAmount = ethers.parseUnits(amount, decimals);
    const tx = await token.transfer(recipientAddress, parsedAmount);
    await tx.wait();
    return tx;
  }
}
