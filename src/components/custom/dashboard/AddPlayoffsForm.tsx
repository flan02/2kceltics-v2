/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

//import { updateTeam } from "@/app/dashboard/actions"
import { toast } from "@/components/ui/use-toast"

import { useEffect, useState, lazy, useRef } from "react"
import LoadingButton from "@/components/reutilizable/LoadingButton"
//import RichTextEditor from "../RichTextEditor"

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { seasonTypes, teamEastTypes, teamTypes, teamWestTypes } from "@/lib/types"
import { createPlayoffsSchema } from "@/zod/validation"
import SelectSeed from "./SelectSeed"
import { createNewPlayoffs } from "@/app/dashboard/actions"



//const RichTextEditor = lazy(() => import("../RichTextEditor"));

const pos = ["1", "2", "3", "4", "5", "6", "7", "8"]

function onSubmit(values: z.infer<typeof createPlayoffsSchema>) {
  // console.log(values)
  const formData = new FormData()
  Object.entries(values).forEach(([key, value]) => {
    if (value) formData.append(key, value) // It converts the raw object into an array of key-value pairs
  })
  try {

    createNewPlayoffs(formData)
    toast({
      title: "You creating the following playoffs:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-zinc-100 text-zinc-700 dark:text-gray-500 dark:bg-night-80/60 p-4">
          <code className="">{JSON.stringify(values, null, 2)}</code>
        </pre>
      )
    })
  } catch {
    toast({
      title: "Error",
      description: "There was an error creating the playoffs",
    })
  }

}

type Props = {

}

export default function AddPlayoffsForm({ }: Props) {

  const isMounted = useRef(false)
  //const [schema, setSchema] = useState<z.ZodObject<any> | null>(null)
  /*
    useEffect(() => {
      const fetchSchema = async () => {
        const generatedSchema = await generatePlayoffsSchema()
        setSchema(generatedSchema)
      }
  
  
      fetchSchema()
    }, [])
  
  */



  const form = useForm<z.infer<typeof createPlayoffsSchema>>({
    resolver: zodResolver(createPlayoffsSchema),
    defaultValues: {
      season: undefined,
      seed_west_1: undefined,
      seed_west_2: undefined,
      seed_west_3: undefined,
      seed_west_4: undefined,
      seed_west_5: undefined,
      seed_west_6: undefined,
      seed_west_7: undefined,
      seed_west_8: undefined,
      seed_east_1: undefined,
      seed_east_2: undefined,
      seed_east_3: undefined,
      seed_east_4: undefined,
      seed_east_5: undefined,
      seed_east_6: undefined,
      seed_east_7: undefined,
      seed_east_8: undefined,
    }
  })


  const { register, handleSubmit, formState, watch, trigger, control, setValue, setFocus, formState: { isSubmitting, isSubmitted } } = form


  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    let isMounted = true
    if (isSubmitted && isMounted) {
      form.reset({}) // * RESET FORM INPUTS
      // setTextArea("")
      // document.getElementsByClassName('DraftEditor-editorContainer')[0].textContent = textArea // * Added manually

    }
    return () => {
      isMounted = false
    }
  }, [isSubmitted])



  //if (!schema) return <div>loading...</div>

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full border border-slate-200 rounded-lg mb-16 px-4 py-16 lg:p-16 b-16 space-y-8">
        <FormField
          control={control}
          name="season"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="dark:text-celtics font-bold text-lg" >Select playoff to add: </FormLabel>
              <FormControl>
                <Select {...field} defaultValue=""
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value}
                >
                  <SelectTrigger className="border border-slate-200 dark:text-gray-500 text-md shadow-md py-1.5 text-left pl-2 min-w-[150px] rounded-md">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-night-80 dark:text-gray-600 text-muted-foreground">
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
        <aside className="grid grid-cols-2">
          <div className="text-center font-bold dark:text-gray-500 mx-auto">
            <span className="uppercase dark:text-celtics">western conference</span>
            {
              pos.map((p, index) => (
                <SelectSeed control={control} pos={p} key={`${p}-${index}`} conference="west" types={teamWestTypes} />
              ))
            }



          </div>
          <div className="text-center font-bold dark:text-gray-500 mx-auto">
            <span className="uppercase dark:text-celtics">eastern conference</span>
            {
              pos.map((p, index) => (
                <SelectSeed control={control} pos={p} key={`${p}-${index}`} conference="east" types={teamEastTypes} />
              ))
            }
          </div>
        </aside>



        <div className="text-center">
          <LoadingButton type="submit" loading={isSubmitting} className="dark:bg-celtics dark:hover:bg-celtics/80">
            Add New Playoffs
          </LoadingButton>
        </div>
      </form>
    </Form>

  )
}
