/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
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
import { createTeam } from "@/app/dashboard/actions"
import { toast } from "@/components/ui/use-toast"

import { useEffect } from "react"
import LoadingButton from "@/components/reutilizable/LoadingButton"
import RichTextEditor from "../RichTextEditor"
import { draftToMarkdown } from "markdown-draft-js"


const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  team_code: z.string().length(3, {
    message: "Team code must be 3 characters.",
  }),
  logo_url: z.string().url({
    message: "Logo URL must be a valid URL.",
  }),
  players: z.string().optional(),
  standings: z.string().optional(),
  team_record: z.string().optional(),
})

function onSubmit(values: z.infer<typeof formSchema>) {
  //console.log(values)

  createTeam({
    ...values,
    players: values.players || "",
    standings: values.standings || "",
    team_record: values.team_record || ""
  })

  toast({
    title: "You submitted the following values:",
    description: (
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(values, null, 2)}</code>
      </pre>
    ),
  })

}

export function AddTeamForm() {


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      team_code: "",
      logo_url: "",
      players: "",
      standings: "",
      team_record: "",
    }
  })

  const { register, handleSubmit, formState, watch, trigger, control, setValue, setFocus, formState: { isSubmitting, isSubmitted } } = form

  //console.log(isSubmitting)

  useEffect(() => {
    if (isSubmitted) {
      form.reset({ name: "", team_code: "", logo_url: "", players: "", standings: "", team_record: "" })

    }
  }, [isSubmitted])


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField

          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field}
                  onSubmit={(e) => {
                    form.reset({ name: "" })
                  }}
                />
              </FormControl>
              <FormMessage>{form.formState.errors.name?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="team_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team code</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage>{form.formState.errors.team_code?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="logo_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo url</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage>{form.formState.errors.logo_url?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="players"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Markdown Players Table</FormLabel>
              <FormControl>
                <RichTextEditor
                  ref={field.ref}
                  onChange={(draft) => field.onChange(draftToMarkdown(draft))}
                />
              </FormControl>
              <FormMessage>{form.formState.errors.players?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="standings"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Standings Table</FormLabel>
              <FormControl>
                <Input placeholder="optional" {...field} />
              </FormControl>
              <FormMessage>{form.formState.errors.standings?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="team_record"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Record Table</FormLabel>
              <FormControl>
                <Input placeholder="optional" {...field} />
              </FormControl>
              <FormMessage>{form.formState.errors.team_record?.message}</FormMessage>
            </FormItem>
          )}
        />

        <div className="text-center">
          <LoadingButton type="submit" loading={isSubmitting}>
            Submit
          </LoadingButton>

        </div>

      </form>
    </Form>
  )
}
