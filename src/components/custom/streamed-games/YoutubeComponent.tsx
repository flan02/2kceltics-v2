'use client'
import Loading from '@/components/reutilizable/Loading';
import LoadingButton from '@/components/reutilizable/LoadingButton';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { atHomeTypes, gameTypes, resultTypes, seasonTypes, stageTypes } from '@/lib/types';
import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

type Props = {}

const YoutubeComponent = (props: Props) => {
  const [isClient, setIsClient] = useState(false);
  const form = useForm()
  const { register, handleSubmit, formState, watch, trigger, control, setValue, setFocus, formState: { isSubmitting, isSubmitted } } = form
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <aside className='border border-slate-200 rounded-lg p-4 w-[calc(100%-20px)]'>
        <div className='flex w-max'>

          <h2 className='font-bold text-black text-lg'>FILTER</h2>
        </div>

        <Form {...form} >
          <form className='flex justify-between gap-2' >
            <div className='flex gap-4'>
              <div className='block lg:flex lg:gap-2'>

                <FormField
                  control={control}
                  name="season"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="atHome">Season: </FormLabel>
                      <FormControl>
                        <Select {...field} defaultValue=""
                          onValueChange={(value) => field.onChange(value)}
                          value={field.value}
                        >
                          <SelectTrigger className="border border-slate-200 text-md shadow-md py-1.5 text-left pl-2 min-w-[120px] rounded-md">
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
                      <FormLabel >Game type: </FormLabel>
                      <FormControl>
                        <Select {...field} defaultValue=""
                          onValueChange={(value) => field.onChange(value)}
                          value={field.value}
                        >
                          <SelectTrigger className="border border-slate-200 text-md shadow-md py-1.5 text-left pl-2 min-w-[120px] rounded-md">
                            <SelectValue placeholder="Select RS or PO" />
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
                      <FormLabel >Stage: </FormLabel>
                      <FormControl>
                        <Select {...field} defaultValue=""
                          onValueChange={(value) => field.onChange(value)}
                          value={field.value}
                        >
                          <SelectTrigger className="border border-slate-200 text-md shadow-md py-1.5 text-left pl-2 min-w-[120px] rounded-md">
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
                          <SelectTrigger className="border border-slate-200 text-md shadow-md py-1.5 text-left pl-2 min-w-[120px] rounded-md">
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
                      <FormLabel htmlFor="atHome">Result: </FormLabel>
                      <FormControl>
                        <Select {...field} defaultValue=""
                          onValueChange={(value) => field.onChange(value)}
                          value={field.value}
                        >
                          <SelectTrigger className="border border-slate-200 text-md shadow-md py-1.5 text-left pl-2 min-w-[120px] rounded-md">
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
                  <LoadingButton type="submit" loading={isSubmitting}>
                    <Search size={18} /> <span className='mt-1'>Search</span>
                  </LoadingButton>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </aside>
      {
        isClient
          ? (
            <aside className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 w-full px-8 md:px-2 gap-4 md:gap-2'>

              <div className='relative border border-slate-300 rounded-xl hover:bg-slate-200/50 hover:border hover:border-slate-900'>
                <LiteYouTubeEmbed
                  id="eRLgoFoYVg8"
                  title="RS NBA2K24 #1 Celtics vs Knicks Full Game"
                  poster="hqdefault"

                  aspectWidth={16}
                  aspectHeight={9}
                />
                <h5 className='absolute top-0 left-0 z-10 w-full py-2 pl-1 bg-[rgba(0,0,0,0.3)] text-sm text-zinc-200 truncate'>RS NBA2K24 #1 Celtics vs Knicks Full Game</h5>
                <div className='px-4 pb-4 pt-2 flex justify-between'>
                  <div className='flex items-center'>
                    <Image src='/logos/BOS.png' width={50} height={50} className='mr-2' alt="celtics-logo" />
                    <span className='font-bold'>vs</span>
                    <Image src='/logos/NYK.png' width={100} height={100} className={`ml-2 w-16 h-16`} alt="celtics-logo" />
                  </div>
                  <Button className='text-xs px-1 self-end' asChild>
                    <Link href="/game-recap">Game recap</Link>
                  </Button>
                </div>
              </div>

              <div className='relative border border-slate-300 rounded-xl hover:bg-slate-200/50 hover:border hover:border-slate-900'>
                <LiteYouTubeEmbed
                  id="rk0404dI_g4"
                  title="RS NBA2K24 #2 Heat vs Celtics Full Game"
                  poster="hqdefault"

                  aspectWidth={16}
                  aspectHeight={9}
                />
                <h5 className='absolute top-0 left-0 z-10 w-full py-2 pl-1 bg-[rgba(0,0,0,0.3)] text-sm text-zinc-200 truncate'>RS NBA2K24 #2 Heat vs Celtics Full Game</h5>
                <div className='px-4 pb-4 pt-2 flex justify-between'>
                  <div className='flex items-center py-1'>
                    <Image src='/logos/BOS.png' width={50} height={50} className='mr-2' alt="celtics-logo" />
                    <span className='font-bold'>vs</span>
                    <Image src='/logos/MIA.png' width={100} height={100} className={`ml-2 w-14 h-14`} alt="celtics-logo" />
                  </div>
                  <Button className='text-xs px-1 self-end' asChild>
                    <Link href="/game-recap">Game recap</Link>
                  </Button>
                </div>
              </div>

              <div className='relative border border-slate-300 rounded-xl hover:bg-slate-200/50 hover:border hover:border-slate-900'>

                <LiteYouTubeEmbed
                  id="jG3WLtMHiFg"
                  title="RS NBA2K24 #3 Celtics vs Wizards Full Game"
                  poster="hqdefault"

                  aspectWidth={16}
                  aspectHeight={9}
                />
                <h5 className='absolute top-0 left-0 z-10 w-full py-2 pl-1 bg-[rgba(0,0,0,0.3)] text-sm text-zinc-200 truncate'>RS NBA2K24 #3 Wizards vs Celtics Full Game</h5>
                <div className='px-4 pb-4 pt-2 flex justify-between'>
                  <div className='flex items-center py-1'>
                    <Image src='/logos/BOS.png' width={50} height={50} className='mr-2' alt="celtics-logo" />
                    <span className='font-bold'>vs</span>
                    <Image src='/logos/WAS.png' width={100} height={100} className={`ml-2 w-14 h-14`} alt="celtics-logo" />
                  </div>
                  <Button className='text-xs px-1 self-end' asChild>
                    <Link href="/game-recap">Game recap</Link>
                  </Button>
                </div>

              </div>

              <div className='relative border border-slate-300 rounded-xl hover:bg-slate-200/50 hover:border hover:border-slate-900'>
                <LiteYouTubeEmbed
                  id="kV7Afy6Y6-w"
                  title="RS NBA2K24 #4 Pacers vs Celtics Full Game"
                  poster="hqdefault"

                  aspectWidth={16}
                  aspectHeight={9}
                />
                <h5 className='absolute top-0 left-0 z-10 w-full py-2 pl-1 bg-[rgba(0,0,0,0.3)] text-sm text-zinc-200 truncate'>RS NBA2K24 #4 Pacers vs Celtics Full Game</h5>
                <div className='px-4 pb-4 pt-2 flex justify-between'>
                  <div className='flex items-center py-1'>
                    <Image src='/logos/BOS.png' width={50} height={50} className='mr-2' alt="celtics-logo" />
                    <span className='font-bold'>vs</span>
                    <Image src='/logos/IND.png' width={100} height={100} className={`ml-2 w-14 h-14`} alt="celtics-logo" />
                  </div>
                  <Button className='text-xs px-1 self-end' asChild>
                    <Link href="/game-recap">Game recap</Link>
                  </Button>
                </div>
              </div>

              <div className='relative border border-slate-300 rounded-xl hover:bg-slate-200/50 hover:border hover:border-slate-900'>
                <LiteYouTubeEmbed
                  id="uRQeEBQaucI"
                  title="RS NBA2K24 #5 Celtics vs Nets Full Game"
                  poster="hqdefault"

                  aspectWidth={16}
                  aspectHeight={9}
                />
                <h5 className='absolute top-0 left-0 z-10 w-full py-2 pl-1 bg-[rgba(0,0,0,0.3)] text-sm text-zinc-200 truncate'>RS NBA2K24 #5 Celtics vs Nets Full Game</h5>
                <div className='px-4 pb-4 pt-2 flex justify-between'>
                  <div className='flex items-center py-1'>
                    <Image src='/logos/BOS.png' width={50} height={50} className='mr-2' alt="celtics-logo" />
                    <span className='font-bold'>vs</span>
                    <Image src='/logos/BRO.png' width={100} height={100} className={`ml-2 w-14 h-14`} alt="celtics-logo" />
                  </div>
                  <Button className='text-xs px-1 self-end' asChild>
                    <Link href="/game-recap">Game recap</Link>
                  </Button>
                </div>
              </div>

              <div className='relative border border-slate-300 rounded-xl hover:bg-slate-200/50 hover:border hover:border-slate-900'>
                <LiteYouTubeEmbed
                  id="KnkGmszvL1U"
                  title="RS NBA2K24 #6 Celtics vs Wolves Full Game"
                  poster="hqdefault"

                  aspectWidth={16}
                  aspectHeight={9}
                />
                <h5 className='absolute top-0 left-0 z-10 w-full py-2 pl-1 bg-[rgba(0,0,0,0.3)] text-sm text-zinc-200 truncate'>RS NBA2K24 #6 Celtics vs Wolves Full Game</h5>
                <div className='px-4 pb-4 pt-2 flex justify-between'>
                  <div className='flex items-center py-1'>
                    <Image src='/logos/BOS.png' width={50} height={50} className='mr-2' alt="celtics-logo" />
                    <span className='font-bold'>vs</span>
                    <Image src='/logos/MIN.png' width={100} height={100} className={`ml-2 w-14 h-14`} alt="celtics-logo" />
                  </div>
                  <Button className='text-xs px-1 self-end' asChild>
                    <Link href="/game-recap">Game recap</Link>
                  </Button>
                </div>

              </div>
            </aside>
          )
          :
          <Loading />
      }
    </>
  )
}

export default YoutubeComponent


/* 

posibles filtros

home/away
rs/po
win/loss 
season 2k24/2k25, etc

upload component when any was founded <NoResultsFound />

*/