import { percentageKeys, PlayerStatsType } from "@/lib/types";
import { useMultiplierStore, useStatsStore } from "@/zustand/store";
import { useTheme } from "next-themes";

export const CustomLabel = ({ x, y, value, player }: any) => {
  const { multiplier } = useMultiplierStore()
  const { selectedKey } = useStatsStore()
  //const gamesPlayed = player as PlayerStatsType;
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const forcePerGame = percentageKeys.includes(selectedKey as keyof PlayerStatsType);
  const display = typeof value === 'number'
    ? multiplier === 'total' && !forcePerGame
      ? value.toFixed(0)
      : value.toFixed(2)
    : '—';

  return (<text
    x={x + 5}
    y={y - 10}
    fill={isDark ? '#007a33' : '#aaa'}
    fontSize={12}
    fontWeight="bold"
    textAnchor="middle"
  >
    {display}
  </text>
  )
}