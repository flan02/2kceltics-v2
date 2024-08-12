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
import { createTeam } from "@/app/dashboard/actions"
import { toast } from "@/components/ui/use-toast"

import { useEffect, useState, Suspense, lazy, useRef } from "react"
import LoadingButton from "@/components/reutilizable/LoadingButton"
//import RichTextEditor from "../RichTextEditor"
import { draftToMarkdown } from "markdown-draft-js"
import { Button } from "@/components/ui/button"


const RichTextEditor = lazy(() => import("../RichTextEditor"));

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  team_code: z.string().max(3, {
    message: "Team code must be 3 characters.",
  }),
  logo_url: z.string({ message: "Current path is /public/logos/[team_code].png" }),
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

enum EditorType {
  PlayersList = "players",
  StandingsTable = "standings",
  TeamRecordTable = "team_record",
}
export default function AddTeamForm() {

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
    let isMounted = true
    if (isSubmitted && isMounted) {
      form.reset({ name: "", team_code: "", logo_url: "", players: "", standings: "", team_record: "" })

    }
    return () => {
      isMounted = false
    }
  }, [isSubmitted])


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full border rounded-lg border-slate-200 mb-16 p-16 b-16 space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Team name</FormLabel>
              <FormControl>
                <Input

                  id="name"
                  placeholder="" {...field}
                  autoComplete="off"
                  required={true}
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
              <FormLabel htmlFor="team_code">Team code</FormLabel>
              <FormControl>
                <Input
                  id="team_code"
                  autoComplete="off"
                  required={true}
                  placeholder="3 letters code" {...field} />
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
              <FormLabel htmlFor="logo_url">Logo url</FormLabel>
              <FormControl>
                <Input
                  id="logo_url"
                  autoComplete="off"
                  required={true}
                  placeholder="" {...field} />
              </FormControl>
              <FormMessage>{form.formState.errors.logo_url?.message}</FormMessage>
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
