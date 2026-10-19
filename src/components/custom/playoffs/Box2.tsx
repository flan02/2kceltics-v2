import { memo } from 'react'
import BracketSpace from './BracketSpace'
import Image from 'next/image'
import { getRoundWins } from '@/lib/utils';

interface teamProps {
  conference: "WEST" | "EAST";
  eliminated: boolean;
  losses: number;
  position: string;
  round: string;
  team_code: string;
  wins: number;
}

type PlayoffsBracketProps = {
  bracket: teamProps[],
  order: boolean
  empty?: boolean
  conferenceFinals?: boolean
}

const Box2 = ({ bracket, order, empty = true, conferenceFinals = false }: PlayoffsBracketProps) => {

  // Definición fija de slots para que nunca se desplace la llave
  const slots: (teamProps | null)[] = conferenceFinals
    ? [
      // Finales de Conferencia: Ganador de la mitad alta vs Ganador de la mitad baja
      bracket.find(b => [1, 8, 4, 5].includes(Number(b.position)) && b.wins >= 8) || null,
      bracket.find(b => [3, 6, 2, 7].includes(Number(b.position)) && b.wins >= 8) || null,
    ]
    : [
      // Semifinales de Conferencia: 4 slots fijos
      bracket.find(b => [1, 8].includes(Number(b.position)) && b.wins >= 4) || null,
      bracket.find(b => [4, 5].includes(Number(b.position)) && b.wins >= 4) || null,
      bracket.find(b => [3, 6].includes(Number(b.position)) && b.wins >= 4) || null,
      bracket.find(b => [2, 7].includes(Number(b.position)) && b.wins >= 4) || null,
    ];



  return (
    <div className={`${order && conferenceFinals ? "-mt-6" : ""}`}>
      {slots.map((b, index) => (
        <div key={index} className="2xl:text-xl xl:text-lg 2xl:w-full w-max">
          <div className="flex space-x-2 w-full">
            <div className="space-y-1 w-full">
              <div
                className={`${order && conferenceFinals ? "xl:mr-0 -ml-4" : ""
                  } flex items-center space-x-2 p-2 min-w-[120px] min-h-10 bg-gray-100/40 dark:bg-night-80/50 dark:text-zinc-700 text-muted-foreground rounded-lg border shadow-md ${b?.team_code === "BOS" && empty ? "border-celtics" : ""
                  }`}
              >
                {empty && b ? (
                  <>
                    <Image
                      src={`/logos/${b.team_code}.png`}
                      className="w-auto h-auto"
                      width={24}
                      height={24}
                      alt={b.team_code}
                    />
                    <p className="flex justify-between w-full pr-1">
                      <span>{b.team_code} ({b.position})</span>
                      <span className="font-bold text-black dark:text-white ml-3">
                        {getRoundWins(b.wins, conferenceFinals)}
                      </span>
                    </p>
                  </>
                ) : (
                  // Placeholder cuando la serie previa aún no se definió
                  <div className="text-xs text-zinc-400 italic py-1 px-2">TBD</div>
                )}
              </div>

              {/* Conector vertical entre los equipos de una misma serie */}
              {(index === 0 || (!conferenceFinals && index === 2)) && (
                <div className="text-center dark:text-zinc-700 text-gray-300 py-2 flex justify-center">
                  <div className="w-[1px] h-[30px] border border-gray-200 dark:border dark:border-zinc-700" />
                </div>
              )}

              {/* Separador entre la serie superior y la inferior en Semifinales */}
              {index === 1 && !conferenceFinals && <BracketSpace />}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};



export default memo(Box2)