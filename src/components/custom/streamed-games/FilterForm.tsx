/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { atHomeTypes, gameTypes, resultTypes, seasonTypes, stageTypes } from '@/lib/types';
import { Search } from 'lucide-react';
import LoadingButton from '@/components/reutilizable/LoadingButton';
import { useForm } from 'react-hook-form';
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
  console.log(values)
  try {
    const queriedGames = await getStreamedGames(values)
    return queriedGames
  } catch (error) {
    console.error(error)
  }
}



const FilterForm = ({ filteredGames }: Props) => {
  const [queriedGames, setQueriedGames] = useState<any[]>([])
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
    setQueriedGames(games!)
    setIsLoaded(true)
  }

  useEffect(() => {

    if (filteredGames) {
      setQueriedGames(filteredGames)
      setIsLoaded(true)
    }
  }, [])

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
      <aside className='border border-slate-200 space-y-4 rounded-lg p-4 w-[calc(100%-20px)]'>
        <div className='flex w-max'>

          <h2 className='font-bold text-midnight text-lg'>SEARCH FILTERS</h2>
        </div>

        <Form {...form} >
          <form noValidate onSubmit={form.handleSubmit(handleFormSubmit)} className='flex justify-between gap-2' >
            <div className='flex gap-4'>
              <div className='block lg:flex lg:gap-2'>

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
                          <SelectTrigger className="border border-slate-200 text-md shadow-md py-1.5 text-left pl-2 w-[150px] rounded-md">
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
                          <SelectTrigger className="border border-slate-200 text-md shadow-md py-1.5 text-left pl-2 w-[150px] rounded-md">
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
                          <SelectTrigger className="border border-slate-200 text-md shadow-md py-1.5 text-left pl-2 w-[150px] rounded-md">
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
                          <SelectTrigger className="border border-slate-200 text-md shadow-md py-1.5 text-left pl-2 w-[150px] rounded-md">
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

              <div className='block lg:flex w-max space-y-8 lg:gap-2'>
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
                          <SelectTrigger className="border border-slate-200 text-md shadow-md py-1.5 text-left pl-2 w-[90px] md:w-[150px] rounded-md">
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


                <div className="self-end ">
                  <LoadingButton type="submit" loading={isSubmitting} className='w-[90px] md:w-fit'>
                    <Search size={18} /> <span className='mt-1'>Search</span>
                  </LoadingButton>
                </div>
              </div>
            </div>

          </form>
        </Form>
        <article>
          <h6 className='text-midnight text-sm font-bold'>Filtering by...
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
          ? <GameCard filteredGames={!queriedGames ? filteredGames : queriedGames} isSubmitted={isSubmitted} />
          : <aside className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 w-full px-8 md:px-2 gap-4 md:gap-2'>
            <SkeletonGameCard />
          </aside>
      }
    </>
  )
}

export default FilterForm
