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
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { seasonTypes } from "@/lib/types"
import { editTeamSchema } from "@/zod/validation"



const RichTextEditor = lazy(() => import("../RichTextEditor"));



function onSubmit(values: z.infer<typeof editTeamSchema>) {
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

type Props = {
  season2k: any

}

export default function EditTeam({ season2k }: Props) {
  //const [textArea, setTextArea] = useState<string>("")
  const [richEditor, setRichEditor] = useState(false)
  const [markdownSelected, setMarkdownSelected] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const form = useForm<z.infer<typeof editTeamSchema>>({
    resolver: zodResolver(editTeamSchema),
    defaultValues: {
      season: "NBA2K24",
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
      form.reset({ players: "", standings: "", team_record: "", playoffs_record: "", total_games: "" }) // * RESET FORM INPUTS
      // setTextArea("")
      // document.getElementsByClassName('DraftEditor-editorContainer')[0].textContent = textArea // * Added manually

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
          control={form.control}
          name="total_games"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="total_games">{`Game to edit markdown content`}</FormLabel>
              <FormControl>
                <Input
                  id="total_games"
                  placeholder="Enter game number"
                  {...field}
                  autoComplete="off"
                  value={field.value ?? ""}
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
            <div className="space-x-2 w-max sm:mx-auto">
              <Button type="button" onClick={() => setMarkdownSelected("players")} >PLAYERS</Button>
              <Button type="button" onClick={() => setMarkdownSelected("standings")} >STANDINGS</Button>
              <Button type="button" onClick={() => setMarkdownSelected("team_record")} >RECORD</Button>
              <Button type="button" onClick={() => setMarkdownSelected("playoffs_record")} >PO RECORD</Button>
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
            Edit
          </LoadingButton>
        </div>
      </form>
    </Form>

  )
}
