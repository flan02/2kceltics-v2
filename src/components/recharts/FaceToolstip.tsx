import { PlayerStatsType } from "@/lib/types";
import { getImagePath } from "@/lib/utils";
import { useMultiplierStore, useStatsStore } from "@/zustand/store";
import Image from "next/image";


type TooltipProps = {
  active?: boolean;
  payload?: any;
  label?: string | number;
}

export const FaceTooltip = ({ active, payload, label }: TooltipProps) => {
  const { selectedKey } = useStatsStore()
  const { multiplier } = useMultiplierStore()
  if (!active || !payload || !payload.length) return null;

  const player = payload[0].payload as PlayerStatsType;
  const value = selectedKey ? player[selectedKey as keyof PlayerStatsType] : undefined;
  let parsedValue
  if (multiplier === "per game") {
    parsedValue = typeof value === 'number' ? value.toFixed(2) : '—'
  }
  if (multiplier === "total") {
    parsedValue = typeof value === 'number' ? (Number(value) * Number(player.gp)).toFixed(0) : '—'
  }



  return (
    <div className="py-1">
      <p className="text-sm text-yellow-300 font-semibold bg-black py-1 pl-2">{label}</p>
      <aside className='px-4 bg-gray-900'>
        <Image src={getImagePath(label as string)} width={100} height={100} alt={label ? label as string : "loading-image"} className="w-auto h-auto" />
      </aside>
      <div className='flex text-sm space-x-2 px-4 py-1 bg-gray-800/90'>
        <div className=" w-[50%] text-center">
          <h6 className="text-gray-400 text-center">{selectedKey?.toUpperCase()}</h6>
          <span className='text-gray-100 font-bold text-center'>  {parsedValue}</span>
        </div>
        <div className="w-[50%] text-center">
          <h6 className="text-center text-gray-400">GP</h6>
          <span className="text-white text-center">{player.gp}</span>
        </div>
      </div>
      <hr className='h-[4px] bg-white' />
    </div>
  )
}