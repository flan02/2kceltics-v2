import { ExportCardButton } from "./ExportCardButton"
import ShareCardButton from "./ShareCardButton"


type Props = {
  stats: any;
  matchupText: string;
  exportCardRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

const SocialMediaSection = ({ stats, matchupText, exportCardRef, className }: Props) => {


  return (
    <section className={`w-full space-x-1 justify-center items-center ${className || ""}`}>
      <div>
        <ShareCardButton
          gameMatchup={matchupText}
          courtRef={exportCardRef}
        />
      </div>
      <div className="flex justify-end xl:justify-center">
        <ExportCardButton
          stats={stats}
          gameMatchup={matchupText}
          courtRef={exportCardRef}
        />
      </div>
    </section>
  )
}

export default SocialMediaSection