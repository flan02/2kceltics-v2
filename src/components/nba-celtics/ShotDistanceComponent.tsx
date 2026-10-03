import { DistanceRange } from '@/lib/types'


type Props = {
  distanceFilter: DistanceRange
  setDistanceFilter: (value: DistanceRange) => void
}

const ShotDistanceComponent = ({ distanceFilter, setDistanceFilter }: Props) => {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
        Distance
      </label>
      <div className="grid grid-cols-4 gap-1 bg-neutral-950 p-1 rounded-xl border border-neutral-800">
        {[
          { id: "ALL", label: "All" },
          { id: "RIM", label: "<8ft" },
          { id: "MID", label: "8-22ft" },
          { id: "THREE", label: "22ft+" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setDistanceFilter(item.id as DistanceRange)}
            className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${distanceFilter === item.id
              ? "bg-neutral-800 text-violet-400 shadow-sm"
              : "text-neutral-400 hover:text-white"
              }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ShotDistanceComponent