/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { getCurrentSchedule, getScheduleGame } from "@/app/dashboard/actions"
import LoadingButton from "@/components/reutilizable/LoadingButton"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { seasonTypes } from "@/lib/types"
import { searchSeasonSchema } from "@/zod/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import type { Season } from "@prisma/client"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"

import { useForm } from "react-hook-form"

// ! It's not necessary by now...
// this form shows the entire schedule for a specific season with all related info.

export type searchProps = {
  season: Season
}

function EditScheduleForm() {
  const CURRENT_SEASON = process.env.NEXT_PUBLIC_CURRENT_SEASON as Season

  const form = useForm({
    resolver: zodResolver(searchSeasonSchema),
    defaultValues: {
      season: CURRENT_SEASON
    }
  })

  const { register, handleSubmit, formState, watch, trigger, control, setValue, setFocus, formState: { isSubmitting, isSubmitted } } = form

  async function onSubmit(value: searchProps): Promise<void> {

    try {
      const currentSchedule = await getCurrentSchedule(value.season)
      console.log(currentSchedule)
    } catch (error) {
      console.log(error)
    }

  }


  // useEffect(() => {
  //   form.reset({
  //     season: CURRENT_SEASON // ? not reset I locked a default value
  //   })
  // }, [isSubmitted])

  return (
    <>
      <h2 className="text-sm text-celtics font-bold uppercase flex"><Search className="mr-2" size={18} />  Search season to update games</h2>
      <Form {...form}>
        <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={control}
            name="season"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Season: </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value ?? CURRENT_SEASON}
                  >
                    <SelectTrigger className="border border-slate-200 text-md shadow-md py-1.5 text-left pl-2 min-w-[150px] rounded-md">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {seasonTypes.map((type, index) => (
                          <SelectItem key={index} value={type}>{type}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          <div className="text-center">
            <LoadingButton type="submit" loading={isSubmitting}>
              Search
            </LoadingButton>
          </div>
        </form>
      </Form>





    </>
  )
}

export default EditScheduleForm