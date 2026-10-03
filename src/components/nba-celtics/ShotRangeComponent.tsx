import { ShotTypeFilter } from "@/lib/types";


type Props = {
  shotTypeFilter: ShotTypeFilter;
  setShotTypeFilter: (value: ShotTypeFilter) => void;
}

const ShotRangeComponent = ({ shotTypeFilter, setShotTypeFilter }: Props) => {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
        Shot Range
      </label>
      <div className="grid grid-cols-3 gap-1 bg-neutral-950 p-1 rounded-xl border border-neutral-800">
        {[
          { label: "All", value: "ALL" },
          { label: "2PT", value: "2PT" },
          { label: "3PT", value: "3PT" },
        ].map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setShotTypeFilter(tab.value as "ALL" | "2PT" | "3PT")}
            className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${shotTypeFilter === tab.value
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

export default ShotRangeComponent