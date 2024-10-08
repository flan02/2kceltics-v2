/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { atHomeTypes, gameTypes, resultTypes, seasonTypes, stageTypes } from '@/lib/types';
import { Search } from 'lucide-react';
import LoadingButton from '@/components/reutilizable/LoadingButton';
import { set, useForm } from 'react-hook-form';
import { z } from 'zod';
import { filterGamesSchema } from '@/zod/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { getStreamedGames } from '@/app/streamed-games/action';
import GameCard from './GameCard';
import { useEffect, useState } from 'react';
import SkeletonGameCard from '@/components/reutilizable/SkeletonGameCard';



type Props = {
  filteredGames: any
}

// * OnSubmit Server Function
async function onSubmit(values: z.infer<typeof filterGamesSchema>) {
  // console.log(values)
  try {
    const queriedGames = await getStreamedGames(values)
    return queriedGames
  } catch (error) {
    console.error(error)
  }
}



const FilterForm = ({ filteredGames }: Props) => {
  let limit = 12
  let total_pages = filteredGames.length
  const [page, setPage] = useState<number>(1)
  const [isFormQuery, setIsFormQuery] = useState<boolean>(false)
  const [queriedGames, setQueriedGames] = useState<any[]>([])
  //console.log("QUERIED GAMES", queriedGames)
  //console.log("FILTERED GAMES", filteredGames)
  const [isLoaded, setIsLoaded] = useState(false)

  const [filterValues, setFilterValues] = useState([{
    season: undefined as "NBA2K22" | "NBA2K23" | "NBA2K24" | undefined,
    type: undefined as "RS" | "PO" | undefined,
    stage: undefined as "RS" | "CUP_GP" | "CUP_QF" | "CUP_SF" | "CUP_THEFINAL" | "FIRST_ROUND" | "ESCF" | "ECF" | "FINALS" | undefined,
    atHome: undefined as "HOME" | "AWAY" | undefined,
    result: undefined as "WIN" | "LOSS" | undefined
  }])

  const form = useForm<z.infer<typeof filterGamesSchema>>({
    resolver: zodResolver(filterGamesSchema),
    defaultValues: {
      season: undefined,
      type: undefined,
      stage: undefined,
      atHome: undefined,
      result: undefined
    }
  })
  const { register, handleSubmit, formState, watch, trigger, control, setValue, setFocus, formState: { isSubmitting, isSubmitted } } = form

  const handleFormSubmit = async (values: z.infer<typeof filterGamesSchema>) => {
    // console.log("VALUES TO FILTER", values)
    setFilterValues([{
      season: values.season,
      type: values.type,
      stage: values.stage,
      atHome: values.atHome,
      result: values.result
    }])


    setIsLoaded(false)
    // await new Promise(resolve => setTimeout(resolve, 1500)) // ! Simulating a delay intentionally
    const games = await onSubmit(values) // * Calling onSubmit function
    setIsFormQuery(true)
    setPage(1)
    // console.log("PAGE AFTER SUBMIT", page)
    // console.log(games)
    setQueriedGames(games!)  // $ POINT OF INTEREST
    setIsLoaded(true)
  }


  // ! BECAUSE OF THIS USEEFFECT IT WOULD BE BETTER TO USE A CLIENT SIDE PAGINATION
  useEffect(() => {
    //  console.log("current page", page);
    if (filteredGames && !isFormQuery) {
      // if (queriedGames.length === 0) {
      // setQueriedGames(filteredGames.slice(0, limit))

      setQueriedGames(filteredGames.slice((page - 1) * limit, page * limit))
      setIsLoaded(true)
    }
  }, [page])

  useEffect(() => {
    if (isSubmitted) {
      form.reset({
        season: 'NBA2K24',
        type: 'RS',
        stage: undefined,
        atHome: undefined,
        result: undefined
      })
    }
  }, [isSubmitted])

  return (
    <>
      <aside className='border border-slate-200 space-y-4 rounded-lg p-4 w-[calc(100%-10px)]'>
        <div className='flex w-max'>

          <h2 className='font-bold text-midnight dark:text-zinc-700 text-lg'>SEARCH FILTERS</h2>
        </div>

        <Form {...form} >
          <form noValidate onSubmit={form.handleSubmit(handleFormSubmit)} className='flex justify-center sm:justify-between gap-2' >
            <div className='flex flex-col md:flex-row gap-4 space-y-4 md:space-y-0'>
              <div className='block lg:flex lg:gap-2 space-y-4 md:space-y-0 '>

                <FormField

                  control={control}
                  name="season"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="season">Season: </FormLabel>
                      <FormControl>
                        <Select {...field} defaultValue=""
                          onValueChange={(value) => field.onChange(value)}
                          value={field.value}
                        >
                          <SelectTrigger className="border border-slate-200 text-md shadow-md py-1.5 text-left pl-2 min-w-[300px] sm:min-w-full md:min-w-[150px] rounded-md">
                            <SelectValue placeholder="Select Season" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup >
                              {seasonTypes.map((athome, index) => (
                                <SelectItem key={index} value={athome}>{athome}</SelectItem>
                              ))
                              }
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor='type'>Game type: </FormLabel>
                      <FormControl>
                        <Select {...field} defaultValue=""
                          onValueChange={(value) => field.onChange(value)}
                          value={field.value}
                        >
                          <SelectTrigger className="border border-slate-200 text-md shadow-md py-1.5 text-left pl-2 min-w-[300px] md:min-w-[150px] rounded-md">
                            <SelectValue placeholder="Select RS/PO" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup >
                              {gameTypes.map((type, index) => (
                                <SelectItem key={index} value={type}>{type}</SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='block lg:flex lg:gap-2'>

                <FormField
                  control={control}
                  name="stage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor='stage' >Stage: </FormLabel>
                      <FormControl>
                        <Select {...field} defaultValue=""
                          onValueChange={(value) => field.onChange(value)}
                          value={field.value}
                        >
                          <SelectTrigger className="border border-slate-200 text-md shadow-md py-1.5 text-left pl-2 min-w-[300px] md:min-w-[150px] rounded-md">
                            <SelectValue placeholder="Select stage" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup >
                              {stageTypes.map((stage, index) => (
                                <SelectItem key={index} value={stage}>{stage}</SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="atHome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="atHome">Place: </FormLabel>
                      <FormControl>
                        <Select {...field} defaultValue=""
                          onValueChange={(value) => field.onChange(value)}
                          value={field.value}
                        >
                          <SelectTrigger className="border border-slate-200 text-md shadow-md py-1.5 text-left pl-2 min-w-[300px] md:min-w-[150px] rounded-md">
                            <SelectValue placeholder="HOME or AWAY" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup >
                              {atHomeTypes.map((athome, index) => (
                                <SelectItem key={index} value={athome}>{athome}</SelectItem>
                              ))
                              }
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='h-[200px] md:h-auto flex flex-col justify-between lg:flex lg:flex-row w-max space-y-8 lg:gap-2'>
                <FormField
                  control={control}
                  name="result"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="result">Result: </FormLabel>
                      <FormControl>
                        <Select {...field} defaultValue=""
                          onValueChange={(value) => field.onChange(value)}
                          value={field.value}
                        >
                          <SelectTrigger className="border border-slate-200 text-md shadow-md py-1.5 text-left pl-2 min-w-[300px] md:min-w-[150px] rounded-md">
                            <SelectValue placeholder="WIN or LOSS" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup >
                              {resultTypes.map((athome, index) => (
                                <SelectItem key={index} value={athome}>{athome}</SelectItem>
                              ))
                              }
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />


                <div className="self-end">
                  <LoadingButton type="submit" loading={isSubmitting} className='min-w-[300px] md:min-w-fit dark:bg-celtics dark:text-green-50'>
                    <Search size={18} /> <span className='mt-1'>Search</span>
                  </LoadingButton>
                </div>
              </div>
            </div>

          </form>
        </Form>
        <article>
          <h6 className='text-midnight dark:text-zinc-700 text-sm font-bold'>Filtering by...
            {
              filterValues.map((value, index) => (
                <p key={index} className='inline'>
                  {value.season ? <span className='ml-2 px-2 py-1 bg-[#f9a826] text-slate-200 rounded-xl'> {value.season} </span> : null}
                  {value.type ? <span className='ml-2 px-2 py-1 bg-[#f9a826] text-slate-200 rounded-xl'> {value.type} </span> : null}
                  {value.stage ? <span className='ml-2 px-2 py-1 bg-[#f9a826] text-slate-200 rounded-xl'> {value.stage} </span> : null}
                  {value.atHome ? <span className='ml-2 px-2 py-1 bg-[#f9a826] text-slate-200 rounded-xl'> {value.atHome} </span> : null}
                  {value.result ? <span className='ml-2 px-2 py-1 bg-[#f9a826] text-slate-200 rounded-xl'> {value.result} </span> : null}
                </p>
              ))
            }
          </h6>
        </article>
      </aside>
      {
        isLoaded
          ? <>
            <GameCard filteredGames={!queriedGames ? filteredGames : queriedGames} isSubmitted={isSubmitted} />
            <div className='mt-16'>
              {
                total_pages > limit
                  ? <div className='flex justify-center gap-4'>
                    <button onClick={() => setPage(page - 1)} disabled={page === 1} className={`${page === 1 ? "bg-gray-200 dark:bg-night-90 text-slate-500" : "bg-slate-200 dark:bg-night-50 text-slate-200"} border border-slate-200  text-sm p-2 rounded-md`}>PREV</button>
                    <button onClick={() => setPage(page + 1)} disabled={page === Math.ceil(total_pages / limit)} className={`${page === Math.ceil(total_pages / limit) ? "bg-gray-200 dark:bg-night-90 text-slate-500" : "bg-slate-600 dark:bg-night-50 text-slate-200"} border border-slate-200  text-sm p-2 rounded-md`}>NEXT</button>
                  </div>
                  : null
              }
            </div>
          </>
          : <aside className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 w-full px-8 md:px-2 gap-4 md:gap-2'>
            <SkeletonGameCard />
          </aside>
      }
    </>
  )
}

export default FilterForm
