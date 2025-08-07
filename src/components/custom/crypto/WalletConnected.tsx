import { useBalance } from "wagmi"
import AlchemyTokenDisplay from "./AlchemyTokenDisplay"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"


type Props = {
  address: string
}


const WalletConnected = ({ address: userAddress }: Props) => {
  // Ensure the address is of type `0x${string}`
  const wagmiAddress = userAddress as `0x${string}`;
  const { data: balanceData, isLoading } = useBalance({ address: wagmiAddress })

  if (isLoading || !balanceData) {
    return <p className='text-muted'>Loading balance...</p>
  }

  return (
    <div className='space-y-4 h-full px-4'> {/* Adjust h-screen to h-full*/}
      {
        balanceData ?
          <Card className="h-28 bg-white/10 dark:bg-black/10">
            <CardContent className="space-y-2 dark:text-muted-foreground ">
              <h2 className="text-sm font-mono uppercase pt-2">We love 💖 this project, and our mission is to make it accessible to everyone.</h2>
              <h2 className="text-sm font-mono uppercase">To achieve that, we’re seeking support and funding to help maintain and grow it.</h2>
              <h2 className="text-sm font-mono uppercase">You can support us with your favorite tokens via crypto, whether you&apos;re using an L1 or L2 network.</h2>
            </CardContent>
          </Card>
          : <Skeleton className="h-24 w-full" />
      }
      <AlchemyTokenDisplay />
    </div>
  )
}

export default WalletConnected

