'use client'
import { FaceTooltip } from '@/components/recharts/FaceToolstip';
import { useYAxisTicks } from '@/components/recharts/useYAxisTicks';

import useGetStats from '@/hooks/useGetStats';
import { fieldsMap, percentageKeys, PlayerStatsType } from '@/lib/types';

import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, LabelList } from 'recharts';
import { BarChart, Bar, ResponsiveContainer } from 'recharts';
import { useTheme } from 'next-themes';
import { Skeleton } from '@/components/ui/skeleton';
import { capitalize } from '@/lib/utils';
import { CustomLabel } from '@/components/recharts/CustomLabel';
import { useMultiplierStore } from '@/zustand/store';
import Image from 'next/image';

const AdvancedLayout = () => {
  const { data, isLoading, error, selectedKey } = useGetStats();
  const { multiplier } = useMultiplierStore();
  const { theme } = useTheme();
  const isDark = theme === 'dark';




  const players = useMemo(() => {
    if (!data?.response || !selectedKey) return [];
    const forcePerGame = percentageKeys.includes(selectedKey);
    return [...data.response]
      .map((player) => ({
        ...player,
        value:
          multiplier === 'total' && !forcePerGame
            ? (player[selectedKey] as number) * player.gp
            : (player[selectedKey] as number)
      }))
      .sort((a, b) => a.value - b.value); // o b.value - a.value si querés de mayor a menor
  }, [data, multiplier, selectedKey]);




  const maxValue = Math.max(
    ...players.map((p) => {
      if (!selectedKey) return 0;
      const base = typeof p[selectedKey] === 'number' ? p[selectedKey] as number : 0;
      const forcePerGame = percentageKeys.includes(selectedKey);
      return multiplier === 'total' && !forcePerGame ? base * p.gp : base;
    })
  )

  const roundedMax = (Math.ceil(maxValue / 2.5) * 2.5) + 2;
  const scale = Math.round(roundedMax / 12)
  const ticks = useYAxisTicks(0, roundedMax * 1.1, scale)

  if (isLoading) return <Skeleton className="h-[672px] max-w-screen-xl" />



  return (
    <>
      {
        !isLoading ? (
          <>
            <div className='grid md:grid-cols-[6%_1%_93%] xl:grid-cols-[5%_3%_92%] grid-rows-1'>
              <aside className='flex justify-center rounded-md my-auto xl:w-[90%] h-[60%] dark:bg-celtics bg-celtics text-white items-center border'>
                {/* must be dynamic */}
                <span className='inline-block rotate-180 [writing-mode:vertical-rl] text-xl'>{data ? capitalize(fieldsMap[selectedKey!]) + ' per game' : ''}</span>
              </aside>
              <div />
              {
                players.length > 0
                  ? <ResponsiveContainer width="100%" height={600}>
                    <BarChart data={players}> {/* data={sortedByPoints} */}
                      <CartesianGrid stroke={isDark ? "#222" : "#ddd"} />
                      <XAxis dataKey="name" angle={-75} tick={{ fontWeight: 'bold', fontSize: 14 }} tickMargin={50} height={100} />
                      <YAxis
                        tick={{ fontWeight: 'bold' }}
                        ticks={ticks}
                        tickFormatter={(value) => (typeof value === 'number' ? value.toFixed(1) : '')}
                      /> {/* [0, 'dataMax'] | domain={[0, 30]} | tickCount={10} */}
                      <Tooltip
                        content={(props) => <FaceTooltip {...props} />}
                        contentStyle={{ backgroundColor: 'white', border: 'none' }}
                        cursor={{ fill: 'transparent' }}
                      />
                      <Bar
                        dataKey="value"
                        // label={<CustomLabel />} {/* doesn't receive {index, payload}. Instead use comp LabelList */}
                        fill={isDark ? "#555" : "#007a33 "}
                        radius={[6, 6, 0, 0]}
                        activeBar={isDark ? { fill: "#666" } : { fill: "#006a33" }}
                      >
                        <LabelList
                          dataKey="value"
                          content={(props) => {
                            const player = data?.response?.[props.index!];
                            return <CustomLabel {...props} player={player} />;
                          }}
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                  : <div className='w-full h-[600px] grid place-content-center border rounded-md'>
                    <Image src="/celtics-logo.png" priority alt="celtics-logo" className='w-auto h-auto' width={150} height={150} />
                  </div>
              }

            </div>
            <section className='w-[40%] rounded-md mx-auto row-span-2 text-center dark:bg-celtics bg-celtics text-white'>
              {/* must be dynamic */}
              <span className='flex justify-center py-2 text-xl'>Player Name</span>
            </section>
          </>
        ) : null
      }

    </>
  )
}

export default AdvancedLayout


{/* <pre>{JSON.stringify(data, null, 2)}</pre> */ }

{/* Acá podrías renderizar <LineChart data={data.response} /> */ }


