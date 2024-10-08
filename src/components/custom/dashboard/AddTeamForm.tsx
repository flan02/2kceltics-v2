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

import { useEffect, lazy } from "react"
import LoadingButton from "@/components/reutilizable/LoadingButton"
import { formSchema } from "@/zod/validation"



const RichTextEditor = lazy(() => import("../RichTextEditor"));



function onSubmit(values: z.infer<typeof formSchema>) {
  //console.log(values)
  createTeam({
    ...values
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

export default function AddTeamForm() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      team_code: "",
      logo_url: ""
    }
  })

  const { register, handleSubmit, formState, watch, trigger, control, setValue, setFocus, formState: { isSubmitting, isSubmitted } } = form

  //console.log(isSubmitting)
  useEffect(() => {
    let isMounted = true
    if (isSubmitted && isMounted) {
      form.reset({ name: "", team_code: "", logo_url: "" })

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
            Add Team
          </LoadingButton>
        </div>
      </form>
    </Form>

  )
}
