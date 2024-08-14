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
import { Input } from "@/components/ui/input"
import { updateTeam } from "@/app/dashboard/actions"
import { toast } from "@/components/ui/use-toast"

import { useEffect, useState, Suspense, lazy, useRef } from "react"
import LoadingButton from "@/components/reutilizable/LoadingButton"
//import RichTextEditor from "../RichTextEditor"
import { draftToMarkdown } from "markdown-draft-js"
import { Button } from "@/components/ui/button"
import { parse } from "path"

enum EditorType {
  PlayersList = "players",
  StandingsTable = "standings",
  TeamRecordTable = "team_record",
}

const RichTextEditor = lazy(() => import("../RichTextEditor"));

const formSchema = z.object({
  total_games: z.string().min(1).max(3),
  players: z.string({ message: "Markdown table format" }).nullable(),
  standings: z.string().nullable(),
  team_record: z.string().nullable(),
  playoffs_record: z.string().nullable(),
})

function onSubmit(values: z.infer<typeof formSchema>) {
  console.log(values)

  updateTeam({ ...values })

  toast({
    title: "You updated the following values:",
    description: (
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(values, null, 2)}</code>
      </pre>
    ),
  })

}




export default function EditTeam() {

  const [richEditor, setRichEditor] = useState(false)
  const [markdownSelected, setMarkdownSelected] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      total_games: "",
      players: "",
      standings: "",
      team_record: "",
      playoffs_record: "",
    }
  })

  const { register, handleSubmit, formState, watch, trigger, control, setValue, setFocus, formState: { isSubmitting, isSubmitted } } = form

  //console.log(isSubmitting)
  useEffect(() => {
    let isMounted = true
    if (isSubmitted && isMounted) {
      form.reset({}) // * RESET FORM INPUTS

      document.getElementsByClassName('DraftEditor-editorContainer')[0].textContent = "" // * Added manually

    }
    return () => {
      isMounted = false
    }
  }, [isSubmitted])


  useEffect(() => {
    const uploadComponent = async () => {
      await import("../RichTextEditor")
      setRichEditor(true)
    }

    uploadComponent()
  }, [])


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full border rounded-lg border-slate-200 mb-16 p-16 b-16 space-y-8">
        <FormField
          control={form.control}
          name="total_games"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="total_games">Total Games Played</FormLabel>
              <FormControl>
                <Input

                  id="total_games"
                  placeholder="number of games played" {...field}

                  autoComplete="off"
                  required={true}
                />
              </FormControl>
              <FormMessage>{form.formState.errors.total_games?.message}</FormMessage>
            </FormItem>
          )}
        />
        {
          !isOpen
            ? <div className="text-right">
              <Button onClick={() => setIsOpen(true)}>Add markdown data</Button>
            </div>
            :
            <div className="space-x-2 w-max mx-auto">
              <Button type="button" onClick={() => setMarkdownSelected("players")} >PLAYERS</Button>
              <Button type="button" onClick={() => setMarkdownSelected("standings")} >STANDINGS</Button>
              <Button type="button" onClick={() => setMarkdownSelected("team_record")} >RECORD</Button>
            </div>
        }
        {
          markdownSelected
            ?
            <FormField
              control={form.control}
              name={markdownSelected as any}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={markdownSelected as any} >{`Markdown ${markdownSelected} selected `}</FormLabel>
                  <Suspense fallback={<div>Loading RichEditor...</div>}>
                    <FormControl>
                      <RichTextEditor
                        ref={field.ref}
                        onChange={(draft) => field.onChange(draftToMarkdown(draft))}
                      />
                    </FormControl>
                    <FormMessage>{(form.formState.errors as any)[markdownSelected]?.message}</FormMessage>
                  </Suspense>
                </FormItem>
              )}
            />
            : null
        }
        <div className="text-center">
          <LoadingButton type="submit" loading={isSubmitting}>
            Submit
          </LoadingButton>
        </div>
      </form>
    </Form>

  )
}
