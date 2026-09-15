'use client'
import { ShotItem } from './ShotChart';
import { GameOption } from './MainStatsMenu';
import { formatShortDate } from '@/lib/utils';
import { useRouter } from 'next/navigation';
type Props = {
  availableGames: GameOption[];
  activeGameId: string;
  shots: ShotItem[];
}

const GameSelector = ({ availableGames, activeGameId, shots }: Props) => {
  const router = useRouter();
  const handleGameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(`?gameId=${e.target.value}`);
  };


  return (
    <div className="bg-white/50 dark:bg-neutral-900/90 border border-gray-300 dark:border dark:border-neutral-800 -mt-4 lg:mt-0 p-1 lg:p-5 rounded-sm lg:rounded-2xl shadow-xl flex items-start lg:block md:w-[70%] lg:w-auto">
      <label className="block text-[11px] px-1 font-bold uppercase tracking-wider text-celtics dark:text-gray-200 mb-2">
        Select Game
      </label>
      <select
        value={activeGameId}
        onChange={handleGameChange}
        className="w-full bg-white dark:bg-neutral-800 pb-2 border border-gray-300 dark:border dark:border-neutral-700 text-orange-400 dark:text-orange-200 text-sm lg:text-base rounded-lg py-1.5 px-2.5 lg:p-2.5 focus:ring-orange-300 focus:border-orange-500 truncate"
      >
        {availableGames.map((game, index) => {
          const gameNumber = availableGames.length - index;
          const dateFormatted = formatShortDate(game.gameDate);
          const result = game.status?.match(/\((.*?)\)/)?.[1] || '';
          const badge = result ? `(${result})` : '';

          return (
            <option key={game.gameId} value={game.gameId} className="text-celtics dark:text-orange-200 text-sm lg:text-base">
              {`#${gameNumber} ${game.matchup} ${badge} · ${dateFormatted}`}
            </option>
          );
        })}
      </select>
    </div>
  )
}

export default GameSelector