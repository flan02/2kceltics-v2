import { Button } from '@/components/ui/button';
import { useAvailableSpans } from '@/hooks/useAvailableSpans';
import useGetStats from '@/hooks/useGetStats';
import { graphicSeasons, graphTypes } from '@/lib/types';
//import { span } from '@/lib/types';
import { useFilterStore, useMenuStore, useMultiplierStore } from '@/zustand/store';

import { SquareX } from 'lucide-react';



type Props = {}

const MenuStats = (props: Props) => {
  const { isOpen, setIsOpen } = useMenuStore()
  const { multiplier, setMultiplier } = useMultiplierStore()
  const { getStats } = useGetStats();
  const { filters, setFilters } = useFilterStore()
  const { spans, isLoading } = useAvailableSpans(filters.season)

  //console.log('Available spans:', spans);

  const handleGenerate = () => {

    //console.log('Generating stats with filter:', filter);
    getStats(filters.gamespan, filters.season)
    if (setIsOpen) {
      setIsOpen(!isOpen)
    }
  }

  const openSearchHandler = () => {
    if (setIsOpen) {
      setIsOpen(!isOpen);
    }
  }



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300">
      <div className='absolute -mt-12 md:mt-0 w-[340px] md:w-[600px] h-[500px] border top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-100/90 dark:bg-black/50 p-6 rounded-xl'>
        <div className='flex flex-col'>
          <SquareX onClick={openSearchHandler} color='red' className='self-end' />
          <h2 className='text-md lg:text-2xl text-center font-bold dark:text-muted-foreground'>Select your preferred filters</h2>
          <section className='px-0 md:px-12 mx-auto mt-12 space-y-8 text-midnight dark:text-muted-foreground'>
            <div className='flex space-x-2 border px-8 py-2 rounded-md justify-between'>
              <h3 className=''>SEASON:</h3>
              <select
                className='px-2 rounded-md'
                value={filters.season}
                onChange={e => setFilters({
                  season: e.target.value,
                })} // setSeason(e.target.value)
              >
                {
                  graphicSeasons.map((season, i) => (
                    <option key={i} value={season}>
                      {season}
                    </option>
                  ))
                }
              </select>
            </div>
            <div className='flex space-x-2 px-8 py-2 rounded-md border justify-between'>
              <h3>GAMESPAN:</h3>
              {isLoading && <div className="text-sm bg-white dark:bg-zinc-700 pt-0.5"><span className='text-xs px-2'>Loading...</span></div>}
              {
                !isLoading && spans.length > 0
                  ? <select
                    className='px-2 rounded-md'
                    onChange={(e) => setFilters({ gamespan: Number(e.target.value) })}
                  >
                    {
                      spans.map((span: any) => (
                        <option key={span} value={span} >
                          FIRST {span}
                        </option>
                      ))
                    }
                  </select>
                  : null
              }
            </div>
            <div className='flex space-x-4 px-6 py-2 rounded-md border justify-between'>
              <label>
                <input
                  type="radio"
                  name="multiplier"
                  value="per game"
                  checked={multiplier === 'per game'}
                  onChange={() => setMultiplier('per game')}
                />
                &nbsp;PER GAME
              </label>
              <label>
                <input
                  type="radio"
                  name="multiplier"
                  value="total"
                  checked={multiplier === 'total'}
                  onChange={() => setMultiplier('total')}
                />
                &nbsp;TOTAL
              </label>
            </div>
            <br />
            <div className='flex justify-center'>
              <Button onClick={handleGenerate} className='bg-midnight dark:bg-celtics dark:hover:bg-celtics/90 dark:text-gray-300'>GENERATE</Button>
            </div>
          </section>
        </div>

      </div>
    </div>
  )
}

export default MenuStats