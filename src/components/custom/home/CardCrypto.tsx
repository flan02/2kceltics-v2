import Link from "next/link";
import { SiBitcoin, SiEthereum, SiSolana, SiTether } from "react-icons/si";


type Props = {}
// usdc: '#2775CA'
const CardCrypto = (props: Props) => {
  return (
    <div className='fixed space-y-4 left-4 top-[120px] w-[260px] p-4 rounded-lg dark:text-muted-foreground dark:bg-stone-900 bg-zinc-100/90 shadow-xl z-40 border border-gray-200 dark:border dark:border-gray-800'>
      <h1 className='text-center text-base font-mono font-bold underline'>SUPPORT US!!!</h1>
      <section className="flex justify-center items-center space-x-2">
        <SiBitcoin className='text-4xl text-[#f7931a]' />
        <SiEthereum className='text-4xl text-[#62688F]' />
        <SiTether className='text-[40px] mt-1 text-[#26a17b]' />
        <div className="bg-gradient-to-r from-[#9945FF] via-[#AA80FF] to-[#00FFA3] px-2 py-1.5 rounded-md shadow-md">
          <SiSolana className="text-white text-[25px]" />
        </div>

      </section>
      <p className='text-xs font-mono'>We want to offer the better experience as possible. To do that we are looking for some funds.</p>
      <div className="text-center">
        <Link href='/crypto' className="text-blue-500 text-xs hover:underline">Learn more</Link>
      </div>
    </div>
  )
}

export default CardCrypto