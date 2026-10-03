import { PeriodFilter } from "@/lib/types";



type Props = {
  selectedPeriod: PeriodFilter;
  setSelectedPeriod: (period: PeriodFilter) => void;
}

const QuarterComponent = ({ selectedPeriod, setSelectedPeriod }: Props) => {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
        Periods
      </label>
      <div className="grid grid-cols-5 gap-1 bg-neutral-950 p-1 rounded-xl border border-neutral-800">
        {[
          { label: "All", value: "ALL" },
          { label: "Q1", value: 1 },
          { label: "Q2", value: 2 },
          { label: "Q3", value: 3 },
          { label: "Q4", value: 4 },
        ].map((tab) => (
          <button
            key={tab.label}
            type="button"
            onClick={() => setSelectedPeriod(tab.value as any)}
            className={`py-1.5 text-xs font-bold rounded-lg transition-all ${selectedPeriod === tab.value
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

export default QuarterComponent