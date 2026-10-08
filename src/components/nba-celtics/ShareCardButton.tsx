import { useState } from "react";


type Props = {}

const ShareCardButton = (props: Props) => {
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  return (
    <button
      type="button"
      // onClick={handleShare}
      // disabled={isGenerating}
      className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold px-3.5 py-2 rounded-xl border border-neutral-700 shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
    >
      <svg
        className={`size-4 text-emerald-400 ${isGenerating ? "animate-spin" : ""}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        {isGenerating ? (
          <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="10" />
        ) : (
          <>
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </>
        )}
      </svg>
      <span>{isGenerating ? "Sharing..." : "Share"}</span>

    </button>
  )
}

export default ShareCardButton