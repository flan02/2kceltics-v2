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
    <div className="bg-neutral-900/90 border border-neutral-800 p-5 rounded-2xl shadow-xl">
      <label className="block text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
        Select Game
      </label>
      <select
        value={activeGameId}
        onChange={handleGameChange}
        className="w-full bg-neutral-800 border border-neutral-700 text-neutral-200 text-sm rounded-lg p-2.5 focus:ring-emerald-500 focus:border-emerald-500 truncate"
      >
        {availableGames.map((game, index) => {
          const gameNumber = index + 1;
          const dateFormatted = formatShortDate(game.gameDate);
          const result = game.status?.match(/\((.*?)\)/)?.[1] || '';
          const badge = result ? `(${result})` : '';

          return (
            <option key={game.gameId} value={game.gameId}>
              {`#${gameNumber} ${game.matchup} ${badge} · ${dateFormatted}`}
            </option>
          );
        })}
      </select>
    </div>
  )
}

export default GameSelector