import React from 'react'

type Props = {
  stats: any
}

const BannerAttributes = ({ stats }: Props) => {
  return (
    <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-3 grid grid-cols-4 gap-1 text-center font-mono">
      <div>
        <span className="text-[9px] text-neutral-400 uppercase block font-sans">Att</span>
        <strong className="text-lg text-white font-bold">{stats?.totalCount ?? 0}</strong>
      </div>
      <div className="border-l border-neutral-800">
        <span className="text-[9px] text-neutral-400 uppercase block font-sans">Made</span>
        <strong className="text-lg text-amber-400 font-bold">{stats?.madeCount ?? 0}</strong>
      </div>
      <div className="border-l border-neutral-800">
        <span className="text-[9px] text-neutral-400 uppercase block font-sans">Miss</span>
        <strong className="text-lg text-rose-500 font-bold">{stats?.missedCount ?? 0}</strong>
      </div>
      <div className="border-l border-neutral-800">
        <span className="text-[9px] text-neutral-400 uppercase block font-sans">Acc</span>
        <strong className="text-lg text-blue-400 font-bold">{stats?.pct ?? "0.0"}%</strong>
      </div>
    </div>
  )
}

export default BannerAttributes