'use client'
import NotFound from '@/app/not-found'
import AdvancedLayout from '@/components/custom/advanced/AdvancedLayout'
import MenuStats from '@/components/custom/advanced/MenuStats'
import MaxWidthWrapper from '@/components/reutilizable/MaxWidthWrapper'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import useGetStats from '@/hooks/useGetStats'
import { fieldsMap, fieldsToExclude, GameSpan, gamespanMap, PlayerStatsType } from '@/lib/types'
import { parsedSeasonTitle } from '@/lib/utils'
import { useFilterStore, useMenuStore, useMultiplierStore, useStatsStore } from '@/zustand/store'
import { ArrowBigRightDash, Search, SquareX } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'



interface PageProps {
  params: {
    type: string // ? its name must be the same as the folder name between brackets []
  }
}

const TypeGraphPage = ({ params: { type } }: PageProps) => {
  const { data, isLoading, error, selectedKey, getStats } = useGetStats();
  const { setData, setIsLoading, setError, setSelectedKey } = useStatsStore.getState()
  const { isOpen, setIsOpen } = useMenuStore()
  const { multiplier, setMultiplier } = useMultiplierStore()
  // const { gamespan } = useFilterStore()
  const { filters, setFilters } = useFilterStore()
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false);
  const [showFilters, setShowFilters] = useState(false)
  //const [switcher, setSwitcher] = useState<any>()


  useEffect(() => {
    if (data != null && data.response.length > 0) {
      setShowFilters(true);
    }
  }, [data]);

  useEffect(() => setMounted(true), []);
  const isDark = resolvedTheme === 'dark'


  const openSearchHandler = () => {
    filters.isActivated = !filters.isActivated
    if (setIsOpen) {
      setIsOpen(!isOpen);
    }
  }

  const statKeys = data && data.response && data.response.length > 0
    ? Object.keys(data.response[0]).filter(key => !fieldsToExclude.includes(key))
    : [];




  if (!mounted) return <MaxWidthWrapper className='min-h-screen mt-8 md:mt-12 lg:mt-24 space-y-8'><Skeleton className="h-[672px] max-w-screen-xl" /></MaxWidthWrapper>

  return (
    <MaxWidthWrapper className='min-h-screen mt-8 md:mt-12 lg:mt-24 space-y-8'>
      {
        type === 'stats'
          ? <>
            <div className=''>
              <aside className='flex items-start md:items-end space-x-2 rounded-md text-white'>
                <section className='w-[335px] pl-2 md:pl-0 md:flex md:w-[90%] xl:w-[80%] bg-black px-0 md:px-2 py-2 rounded-md space-x-4 lg:text-2xl'>
                  {
                    !showFilters ? <h2 className='dark:text-muted-foreground py-1 md:py-0 pl-2'>GRAPHIC STATS</h2> : null
                  }
                  {
                    showFilters
                      ? <div className='flex space-x-0 md:space-x-2 items-center'>
                        <ArrowBigRightDash color='#aaa' size={32} className='hidden md:block' />
                        <div className='flex w-full space-y-2 md:space-y-0 flex-col md:flex-row space-x-0 md:space-x-2 text-sm xl:text-lg'>
                          <div className='flex items-center space-x-1'>
                            <h3 className='dark:text-muted-foreground text-xs md:text-base'> ORDER BY: </h3>
                            <select
                              className='rounded-md text-xs md:text-md text-center px-1 bg-gray-800 h-min py-1'
                              defaultValue={selectedKey || 'pts'}
                              onChange={(e) => {
                                const value = e.target.value as Exclude<keyof PlayerStatsType, typeof fieldsToExclude[number]>;
                                if (setSelectedKey) {
                                  setSelectedKey(value);
                                }

                                if (data && data.response) {
                                  const sorted = [...data.response].sort((a, b) => {
                                    const aValue = a[value]
                                    const bValue = b[value]
                                    if (typeof aValue === 'number' && typeof bValue === 'number') {
                                      return aValue - bValue; // Sort in descending order
                                    }
                                    return 0; // If not a number, do not sort
                                  });
                                  setData({ ...data, response: sorted });
                                }
                              }}
                            >
                              {
                                statKeys.map((key) => (
                                  <option
                                    key={key}
                                    value={key}
                                  >
                                    {fieldsMap[key!]} {/* || 'Points' */}
                                  </option>
                                ))
                              }
                            </select>
                          </div>


                          <div className='flex items-center space-x-2'>
                            <p className='text-white pl-0 md:pl-4 dark:text-muted-foreground text-xs md:text-base'>{filters.stage == 'RS' ? gamespanMap[filters.gamespan] : gamespanMap[filters.roundspan]}</p>
                            <p>|</p>
                            <select
                              className='rounded-md text-xs md:text-md text-center px-1 bg-gray-800 h-min py-1'
                              value={multiplier}
                              onChange={(e) => {
                                const value = e.target.value
                                setMultiplier(value as "per game" | "total")
                              }}
                            >
                              <option value="per game">PER GAME</option>
                              <option value="total">TOTAL</option>

                            </select>
                          </div>
                          <p className='hidden md:block md:mt-1'>|</p>
                          <h4 className='bg-gray-300 text-midnight font-bold dark:text-yellow-400 rounded-md dark:bg-celtics px-2 h-min py-1 md:py-0 w-max md:w-auto'>
                            {filters.season}
                          </h4>
                          <p className='hidden md:block md:mt-1'>|</p>
                          <h4 className='pt-12 border border-yellow-300 font-bold text-yellow-400 rounded-md px-2 h-min py-1 md:py-0 w-max md:w-auto'>
                            {parsedSeasonTitle(filters.stage)}
                          </h4>


                        </div>
                      </div>
                      : null
                  }
                </section>

                <div onClick={openSearchHandler} className={`cursor-pointer hover:bg-celtics/90 dark:hover:bg-celtics/90 px-2 py-2 rounded-md ${isDark ? 'bg-celtics' : 'bg-celtics'}`}>
                  <Search size={32} color='#ddd' />
                </div>
              </aside>
            </div>

            <AdvancedLayout />
          </>
          : NotFound()
      }

      {
        isOpen ?
          <MenuStats />
          : null
      }

      <div className='flex justify-center'>
        <Button asChild className='px-2 py-0 dark:bg-[#666] dark:hover:bg-[#777] dark:text-black hover:bg-black/80'>
          <Link href="/advanced" className='text-xs'>BACK</Link>
        </Button>
      </div>
      <br /><br /><br />
    </MaxWidthWrapper>
  )
}

export default TypeGraphPage

