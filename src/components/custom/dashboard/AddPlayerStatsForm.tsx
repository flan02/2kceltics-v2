'use client'
import LoadingButton from '@/components/reutilizable/LoadingButton'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { gameTypes, seasonTypes, spanTypes, stageTypes, statTypes } from '@/lib/types'
import { Suspense, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import RichTextEditor from '../RichTextEditor'
import { Skeleton } from '@/components/ui/skeleton'
import { draftToMarkdown } from 'markdown-draft-js'
import { createPlayerStats } from '@/app/dashboard/actions'
import { toast } from '@/components/ui/use-toast'
import { createNewGameStatSchema } from '@/zod/validation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { $Enums } from '@prisma/client'

export type GameStatProps = {
  season: $Enums.Season
  type: $Enums.Tournament
  stage: $Enums.Stage
  span: string
  statType: $Enums.StatType
  gamestat: string
}

const AddPlayerStatsForm = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  // * This is a common technique for managing state in functional React components when you need to know if a component is still mounted during an async operation.
  const isMounted = useRef(false)

  const form = useForm<z.infer<typeof createNewGameStatSchema>>({
    resolver: zodResolver(createNewGameStatSchema),
    defaultValues: {
      season: "NBA2K24",
      type: undefined,
      stage: undefined,
      span: undefined,
      statType: undefined,
      gamestat: ""
    }
  })
  const { register, handleSubmit, formState, watch, trigger, control, setValue, setFocus, formState: { isSubmitting, isSubmitted } } = form

  useEffect(() => {
    isMounted.current = true
    if (isMounted.current) {
      setIsLoaded(true)
    }

    return () => {
      isMounted.current = false
    }
  }, [])

  const onSubmit = async (data: any) => {

    try {
      const response = await createPlayerStats(data)
      toast({
        title: "A new game stat was added!",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-muted-foreground">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
      return response
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full border border-slate-200 rounded-lg mb-16 px-4 py-16 lg:p-16 b-16 space-y-8">


        <FormField
          control={control}
          name="season"
          render={({ field }) => (
            <FormItem>
              <FormLabel >Select season: </FormLabel>
              <FormControl>
                <Select {...field} defaultValue=""
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value}

                >
                  <SelectTrigger className="border border-slate-200 text-md shadow-md py-1.5 text-left pl-2 min-w-[150px] rounded-md">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup >
                      {seasonTypes.map((type, index) => (
                        <SelectItem key={index} value={type} >{type}</SelectItem>
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
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel >Regular Season / Playoffs: </FormLabel>
              <FormControl>
                <Select {...field} defaultValue=""
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value}

                >
                  <SelectTrigger className="border border-slate-200 text-md shadow-md py-1.5 text-left pl-2 min-w-[150px] rounded-md">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup >
                      {gameTypes.map((type, index) => (
                        <SelectItem key={index} value={type} >{type}</SelectItem>
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
          name="stage"
          render={({ field }) => (
            <FormItem>
              <FormLabel >Stage: </FormLabel>
              <FormControl>
                <Select {...field} defaultValue=""
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value}

                >
                  <SelectTrigger className="border border-slate-200 text-md shadow-md py-1.5 text-left pl-2 min-w-[150px] rounded-md">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup >
                      {stageTypes.map((type, index) => (
                        <SelectItem key={index} value={type} >{type}</SelectItem>
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
          name="span"
          render={({ field }) => (
            <FormItem>
              <FormLabel >Regular Season span: </FormLabel>
              <FormControl>
                <Select {...field} defaultValue=""
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value}

                >
                  <SelectTrigger className="border border-slate-200 text-md shadow-md py-1.5 text-left pl-2 min-w-[150px] rounded-md">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup >
                      {spanTypes.map((type, index) => (
                        <SelectItem key={index} value={type} >{type}</SelectItem>
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
          name="statType"
          render={({ field }) => (
            <FormItem>
              <FormLabel >Stat type: </FormLabel>
              <FormControl>
                <Select {...field} defaultValue=""
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value}

                >
                  <SelectTrigger className="border border-slate-200 text-md shadow-md py-1.5 text-left pl-2 min-w-[150px] rounded-md">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup >
                      {statTypes.map((type, index) => (
                        <SelectItem key={index} value={type} >{type}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {
          isLoaded
            ?
            <FormField
              control={form.control}
              name="gamestat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="players" >{`Markdown Players table `}</FormLabel>


                  <Suspense fallback={<Skeleton className="h-[200px]" />}>
                    <FormControl>
                      <RichTextEditor
                        ref={field.ref}
                        onChange={(draft) => field.onChange(draftToMarkdown(draft))}
                      />
                    </FormControl>
                    <FormMessage>{ /* form.formState.errors.players?.message  CHANGE PLAYERS FOR THIS COMPONENT PROP */} </FormMessage>
                  </Suspense>
                </FormItem>
              )}
            />
            : <Skeleton className="h-[200px]" />
        }



        <div className="text-center">
          <LoadingButton type="submit" loading={isSubmitting}>
            Create
          </LoadingButton>
        </div>
      </form>
    </Form>
  )
}

export default AddPlayerStatsForm