import React from 'react'

type Props = {
  stats: any
}

const ShotLabels = ({ stats }: Props) => {
  return (
    <div className="w-full sm:w-auto grid grid-cols-4 gap-2 !bg-black/85 px-3 lg:px-6 py-2 rounded-xl border border-neutral-800 font-mono text-center shrink-0">
      <div>
        <span className="text-[9px] tracking-wider lg:text-sm !text-neutral-400 uppercase block font-sans">
          Attempt
        </span>
        <strong className="text-sm sm:text-base !text-white">
          {stats?.totalCount ?? 0}
        </strong>
      </div>
      <div className="border-l border-neutral-800 pl-2 sm:pl-3">
        <span className="text-[9px] tracking-wider lg:text-sm !text-neutral-400 uppercase block font-sans">
          Made
        </span>
        <strong className="text-sm sm:text-base !text-amber-400">
          {stats?.madeCount ?? 0}
        </strong>
      </div>
      <div className="border-l border-neutral-800 pl-2 sm:pl-3">
        <span className="text-[9px] tracking-wider lg:text-sm !text-neutral-400 uppercase block font-sans">
          Missed
        </span>
        <strong className="text-sm sm:text-base !text-rose-500">
          {stats?.missedCount ?? 0}
        </strong>
      </div>
      <div className="border-l border-neutral-800 pl-2 sm:pl-3">
        <span className="text-[9px] tracking-wider lg:text-sm !text-neutral-400 uppercase block font-sans">
          Perc.
        </span>
        <strong className="text-sm sm:text-base !text-blue-400">
          {stats?.pct ?? "0.0"}%
        </strong>
      </div>
    </div>
  )
}

export default ShotLabels