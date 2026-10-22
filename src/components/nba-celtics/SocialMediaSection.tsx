import { CourtFilters } from "@/lib/types";
import { ExportCardButton } from "./ExportCardButton"
import ShareCardButton from "./ShareCardButton"

type Props = {
  playerName: string;
  stats: any;
  matchupText: string;
  exportCardRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
  filters?: CourtFilters;
}

const SocialMediaSection = ({ playerName, stats, matchupText, exportCardRef, className, filters }: Props) => {

  return (
    <section className={`w-full space-x-1 justify-center items-center ${className || ""}`}>
      <div>
        <ShareCardButton
          gameMatchup={matchupText}
          courtRef={exportCardRef}
          filters={filters}
        />
      </div>
      <div className="flex justify-end xl:justify-center">
        <ExportCardButton
          playerName={playerName}
          gameMatchup={matchupText}
          courtRef={exportCardRef}
        />
      </div>
    </section>
  )
}

export default SocialMediaSection