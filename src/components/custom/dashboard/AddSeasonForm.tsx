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


type Props = {}

async function onSubmit(values: any) { // ! CHANGE THIS SCHEMA
  console.log(values)
}

const AddSeasonForm = (props: Props) => {
  // * Fields to create a new season
  /* 
  teamId: (id of boston celtics)
  season: (Season type of prisma)
  total_games: (number of games played that season)
  players: string to write markdown content
  team_record: string to write markdown content
  playoffs_record: string to write markdown content
  createdAt: (date of creation)
  updatedAt: (date of last update)
  */

  const form = useForm()

  const { register, handleSubmit, formState, watch, trigger, control, setValue, setFocus, formState: { isSubmitting, isSubmitted } } = form

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
              <FormMessage>{ }</FormMessage>
            </FormItem>
          )}
        />




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