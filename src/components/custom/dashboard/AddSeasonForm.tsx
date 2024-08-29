/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import LoadingButton from "@/components/reutilizable/LoadingButton"


import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { seasonTypes } from "@/lib/types"
import { createNewSeasonSchema } from "@/zod/validation"
import { lazy, Suspense, useEffect, useRef, useState } from "react"
import { draftToMarkdown } from "markdown-draft-js"
import { Skeleton } from "@/components/ui/skeleton"
import { createNewSeason } from "@/app/dashboard/actions"
import { toast } from "@/components/ui/use-toast"

//import RichTextEditor from "../RichTextEditor"
const RichTextEditor = lazy(() => import("../RichTextEditor"));

type Props = {}

async function onSubmit(values: any) { // ! CHANGE THIS SCHEMA
  //console.log(values)
  try {
    const response = await createNewSeason(values)
    toast({
      title: "A new season was added!",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

const AddSeasonForm = (props: Props) => {
  const [isLoaded, setIsLoaded] = useState(false)

  // * This is a common technique for managing state in functional React components when you need to know if a component is still mounted during an async operation.
  const isMounted = useRef(false)

  const form = useForm<z.infer<typeof createNewSeasonSchema>>({
    resolver: zodResolver(createNewSeasonSchema),
    defaultValues: {
      teamId: "66b4de0f0fa088d80a9b93d1",
      season: undefined,
      total_games: "0",
      players: "",
      standings: "",
      team_record: "",
      playoffs_record: "",
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

  useEffect(() => {
    if (isSubmitted) {
      form.reset({ teamId: "66b4de0f0fa088d80a9b93d1", season: undefined, total_games: "0", players: "" })
      document.getElementsByClassName("DraftEditor-editorContainer")[0].textContent = ""
    }
  }, [isSubmitted])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full border border-slate-200 rounded-lg mb-16 px-4 py-16 lg:p-16 b-16 space-y-8">

        <FormField
          control={form.control}
          name="teamId"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="teamId">Team Id:</FormLabel>
              <FormControl>
                <Input
                  id="teamId"
                  placeholder=""
                  {...field}
                  autoComplete="off"
                  value="66b4de0f0fa088d80a9b93d1"
                />
              </FormControl>
              <FormMessage>{ }</FormMessage>
            </FormItem>
          )}
        />


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
                    <SelectValue placeholder="choose next season" />
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

        {
          isLoaded
            ?
            <FormField
              control={form.control}
              name="players"
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
                    <FormMessage>{form.formState.errors.players?.message}</FormMessage>
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

export default AddSeasonForm