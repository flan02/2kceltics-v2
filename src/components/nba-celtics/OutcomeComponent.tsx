import React from 'react'

type Props = {
  outcomeFilter: "ALL" | "MADE" | "MISSED"
  setOutcomeFilter: (value: "ALL" | "MADE" | "MISSED") => void
}

const OutcomeComponent = ({ outcomeFilter, setOutcomeFilter }: Props) => {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
        Outcome
      </label>
      <div className="grid grid-cols-3 gap-1 bg-neutral-950 p-1 rounded-xl border border-neutral-800">
        {[
          { label: "All", value: "ALL", activeColor: "bg-neutral-800 text-violet-400" },
          { label: "Made", value: "MADE", activeColor: "bg-amber-500 text-neutral-950 font-bold" },
          { label: "Missed", value: "MISSED", activeColor: "bg-rose-600 text-white font-bold" },
        ].map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setOutcomeFilter(tab.value as "ALL" | "MADE" | "MISSED")}
            className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${outcomeFilter === tab.value
              ? `${tab.activeColor} shadow-sm`
              : "text-neutral-400 hover:text-white"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default OutcomeComponent