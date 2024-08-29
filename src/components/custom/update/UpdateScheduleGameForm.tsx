/* eslint-disable react-hooks/exhaustive-deps */
'use client'


import { Schedule } from "@prisma/client"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import LoadingButton from "@/components/reutilizable/LoadingButton"
import { z } from "zod"
import { updateGameSchema } from "@/zod/validation"
import { toast } from "@/components/ui/use-toast"
import { lazy, Suspense, useEffect, useRef, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { atHomeTypes, gameTypes, resultTypes, stageTypes } from "@/lib/types"
import { draftToMarkdown } from "markdown-draft-js"
import { updateScheduleGame } from "@/app/dashboard/[gameId]/action"
import { Skeleton } from "@/components/ui/skeleton"

//import RichTextEditor from "../RichTextEditor"
const RichTextEditor = lazy(() => import("../RichTextEditor"));

interface Props {
  game: Schedule
}

async function onSubmit(values: z.infer<typeof updateGameSchema>) {

  //console.log("VALUES ON FORM", values)
  const update = await updateScheduleGame(values)



  toast({
    title: `Game id: ${values.id} updated successfully`,
    description: (
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(values, null, 2)}</code>
      </pre>
    ),
  })
}



const UpdateScheduleGameForm = ({ game }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false)
  // This is a common technique for managing state in functional React components when you need to know if a component is still mounted during an async operation.
  const isMounted = useRef(false)

  // {JSON.stringify(game, null, 2)}
  const form = useForm<z.infer<typeof updateGameSchema>>({
    resolver: zodResolver(updateGameSchema),
    defaultValues: {
      id: game.id,
      type: game.type,
      stage: game.stage,
      result: game.result || undefined,
      video_url: game.video_url || undefined,
      currentGame: game.currentGame,
      atHome: game.atHome,
      team2: game.team2,
      team_code2: game.team_code2,
      scoreTeam1: game.scoreTeam1!,
      scoreTeam2: game.scoreTeam2!,
      boxscoreTeam1: "",
      boxscoreTeam2: "",
      gameStats: ""
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


  return (
    <Form {...form} >
      <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 border rounded-lg p-8 lg:p-16">

        <div className="flex w-full space-x-8">
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="id">Game id:</FormLabel>
                <FormControl>
                  <Input
                    id="id"
                    placeholder="" {...field}
                    autoComplete="off"
                    value={game.id}
                    required={true}

                  />
                </FormControl>
                <FormMessage>{form.formState.errors.id?.message}</FormMessage>
              </FormItem>
            )}
          />

          <div className="w-full flex gap-4">
            <FormField
              control={control}
              name="currentGame"
              render={({ field }) => (
                <FormItem className="w-[90px] md:w-max">
                  <FormLabel htmlFor="currentGame" className="truncate">Current Game:</FormLabel>
                  <FormControl>
                    <Input id="currentGame" type="number" className="dark:text-blue-500" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="result"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="truncate" >Win or Loss: </FormLabel>
                  <FormControl>
                    <Select {...field}
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <SelectTrigger className="border border-slate-200 text-md shadow-md py-1.5 text-left pl-2 w-full rounded-md">
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup >
                          {resultTypes.map((type, index) => (
                            <SelectItem key={index} value={type}>{type}</SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>{form.formState.errors.type?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex w-full space-x-8">
          <FormField
            control={control}
            name="type"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel >Game type: </FormLabel>
                <FormControl>
                  <Select {...field}
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}

                  >
                    <SelectTrigger className="border border-slate-200 text-md shadow-md py-1.5 text-left pl-2 w-full rounded-md">
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
                <FormMessage>{form.formState.errors.type?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="stage"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel >Stage: </FormLabel>
                <FormControl>
                  <Select {...field}
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                  >
                    <SelectTrigger className="border border-slate-200 text-md shadow-md py-1.5 text-left pl-2 w-full rounded-md">
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
                <FormMessage>{form.formState.errors.stage?.message}</FormMessage>
              </FormItem>
            )}
          />
        </div>

        <div className="flex w-full space-x-8">

          <FormField
            control={form.control}
            name="video_url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="video_url">Video Youtube url:</FormLabel>
                <FormControl>
                  <Input
                    id="video_url"
                    placeholder="youtube link"
                    {...field}
                    autoComplete="off"
                    required={true}
                  />
                </FormControl>
                <FormMessage>{form.formState.errors.video_url?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="atHome"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Place:</FormLabel>
                <FormControl>
                  <Select {...field}
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                  >
                    <SelectTrigger className="border border-slate-200 text-md shadow-md py-1.5 text-left pl-2 w-full rounded-md">
                      <SelectValue placeholder="Select HOME or AWAY" />
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



        <div className="flex w-full space-x-8">
          <FormField
            control={form.control}
            name="team2"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="team2">Rival Team:</FormLabel>
                <FormControl>
                  <Input
                    id="team2"
                    placeholder="" {...field}
                    autoComplete="off"
                    required={true}
                  />
                </FormControl>
                <FormMessage>{form.formState.errors.team2?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="team_code2"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="team_code2">Rival Code:</FormLabel>
                <FormControl>
                  <Input
                    id="team_code2"
                    placeholder="" {...field}
                    autoComplete="off"
                    required={true}
                  />
                </FormControl>
                <FormMessage>{form.formState.errors.team_code2?.message}</FormMessage>
              </FormItem>
            )}
          />
        </div>

        <div className="flex w-full space-x-8">
          <FormField
            control={control}
            name="scoreTeam1"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="scoreTeam1">Boston Celtics score:</FormLabel>
                <FormControl>
                  <Input id="scoreTeam1" type="number" className="dark:text-blue-500" {...field} />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.scoreTeam1?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="scoreTeam2"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="scoreTeam2">{`${game.team2} score:`}</FormLabel>
                <FormControl>
                  <Input id="scoreTeam2" type="number" className="dark:text-blue-500" {...field} />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.scoreTeam2?.message}
                </FormMessage>
              </FormItem>
            )}
          />
        </div>
        {
          isLoaded
            ?
            <FormField
              control={form.control}
              name="boxscoreTeam1"
              render={({ field }) => (
                <Suspense fallback={<Skeleton className="h-[200px]" />}>
                  <FormItem>
                    <FormLabel>Boxscore Boston Celtics: </FormLabel>
                    <FormControl>
                      <RichTextEditor
                        ref={field.ref}
                        onChange={(draft) => field.onChange(draftToMarkdown(draft))}
                      />
                    </FormControl>
                    <FormMessage>{form.formState.errors.boxscoreTeam1?.message}</FormMessage>
                  </FormItem>
                </Suspense>
              )}
            />
            : <Skeleton className="h-[200px]" />
        }

        {
          isLoaded
            ?
            <FormField
              control={form.control}
              name="boxscoreTeam2"
              render={({ field }) => (
                <Suspense fallback={<Skeleton className="h-[200px]" />}>
                  <FormItem>
                    <FormLabel>{`Boxscore ${game.team2}: (optional)`}</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        ref={field.ref}
                        onChange={(draft) => field.onChange(draftToMarkdown(draft))}
                      />
                    </FormControl>
                    <FormMessage>{form.formState.errors.boxscoreTeam1?.message}</FormMessage>
                  </FormItem>
                </Suspense>
              )}
            />
            : <Skeleton className="h-[200px]" />
        }

        {
          isLoaded
            ?
            <FormField
              control={form.control}
              name="gameStats"
              render={({ field }) => (
                <Suspense fallback={<Skeleton className="h-[200px]" />}>
                  <FormItem>
                    <FormLabel>{`Game stats:`}</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        ref={field.ref}
                        onChange={(draft) => field.onChange(draftToMarkdown(draft))}
                      />
                    </FormControl>
                    <FormMessage>{form.formState.errors.boxscoreTeam1?.message}</FormMessage>
                  </FormItem>
                </Suspense>
              )}
            />
            : <Skeleton className="h-[200px]" />
        }

        <div className="text-center">
          <LoadingButton className="" type="submit" loading={isSubmitting}>
            Update
          </LoadingButton>
        </div>

      </form>
    </Form>
  )
}

export default UpdateScheduleGameForm