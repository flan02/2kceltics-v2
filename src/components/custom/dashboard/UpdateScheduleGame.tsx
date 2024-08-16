/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { getScheduleGame } from "@/app/dashboard/actions"
import LoadingButton from "@/components/reutilizable/LoadingButton"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { updateTeamSchema } from "@/zod/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useEffect, useState } from "react"


import { useForm } from "react-hook-form"


export type updateProps = {
  currentGame: number
  season: string
}

const UpdateScheduleGame = () => {

  const [toUpdateGame, setToUpdateGame] = useState<string | null>(null)

  const form = useForm({
    resolver: zodResolver(updateTeamSchema),
    defaultValues: {
      currentGame: 0,
      season: ""
    }
  })

  const { register, handleSubmit, formState, watch, trigger, control, setValue, setFocus, formState: { isSubmitting, isSubmitted } } = form
  async function onSubmit(values: updateProps): Promise<any> {
    //console.log('what the fuck');
    const formData = new FormData()
    Object.entries(values).forEach(([key, value]) => {
      if (value) formData.append(key, String(value))
      // console.log(typeof value, value)
    })

    try {
      const gameID = await getScheduleGame(values) as { id: string };

      //console.log(gameID)
      setToUpdateGame(gameID.id)


    } catch (error) {
      console.log(error)
      return error
    }
  }

  useEffect(() => {
    form.reset({
      currentGame: 0,
      season: ""
    })
  }, [isSubmitted])

  return (
    <>
      <h2 className="text-sm text-celtics font-bold uppercase">Search game to update</h2>
      <Form {...form} >
        <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-4" >
          <FormField
            control={control}
            name="currentGame"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="currentGame">Current Game</FormLabel>
                <FormControl>
                  <Input id="currentGame" type="number" className="dark:text-blue-500" placeholder="min 1 - max 110 games" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="season"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="season">Season</FormLabel>
                <FormControl>
                  <Input id="season" className="dark:text-blue-500" placeholder="NBA2K24, NBA2K25, etc..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="text-center">
            <LoadingButton type="submit" loading={isSubmitting}>
              Search
            </LoadingButton>
          </div>
        </form>
      </Form>

      {
        toUpdateGame
          ?
          <>
            <p>1 Game found to update</p>
            <Link
              className="hover:underline"
              href={`/dashboard/${toUpdateGame}`} target="_blank" rel="noopener" referrerPolicy="no-referrer">{toUpdateGame}</Link>
          </>
          : null
      }
    </>
  )
}

export default UpdateScheduleGame