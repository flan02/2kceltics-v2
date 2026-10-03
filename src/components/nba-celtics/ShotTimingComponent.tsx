import { ShotTimingFilter } from "@/lib/types";



type Props = {
  timingFilter: ShotTimingFilter;
  setTimingFilter: (filter: ShotTimingFilter) => void;
}

const ShotTimingComponent = ({ timingFilter, setTimingFilter }: Props) => {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
        Shot Timing
      </label>
      <div className="grid grid-cols-3 gap-1 bg-neutral-950 p-1 rounded-xl border border-neutral-800">
        {[
          { label: "All", value: "ALL" },
          { label: "Last 5m", value: "LAST_5" },
          { label: "Last 2m", value: "LAST_2" },
        ].map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setTimingFilter(tab.value as ShotTimingFilter)}
            className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${timingFilter === tab.value
              ? "bg-neutral-800 text-violet-400 shadow-sm"
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

export default ShotTimingComponent