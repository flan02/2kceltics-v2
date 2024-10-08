/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { getScheduleGame } from "@/app/dashboard/actions"
import LoadingButton from "@/components/reutilizable/LoadingButton"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { seasonTypes } from "@/lib/types"
import { updateTeamSchema } from "@/zod/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Search } from "lucide-react"
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
      season: "NBA2K24"
    }
  })

  const { register, handleSubmit, formState, watch, trigger, control, setValue, setFocus, formState: { isSubmitting, isSubmitted } } = form

  async function onSubmit(values: updateProps): Promise<void> {
    //console.log('what the fuck');
    const formData = new FormData()
    Object.entries(values).forEach(([key, value]) => {
      if (value) formData.append(key, String(value))
      //console.log(typeof value, value)
    })

    try {
      const gameID = await getScheduleGame(values) as { id: string };

      // console.log(gameID)
      if (gameID) {
        setToUpdateGame(gameID.id)
      } else {
        setToUpdateGame(null)
      }

    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    form.reset({
      currentGame: 0,
      // season: "" // ? not reset I locked a default value
    })
  }, [isSubmitted])

  return (
    <>
      <h2 className="text-sm text-celtics font-bold uppercase flex"><Search className="mr-2" size={18} />  Search game to update</h2>
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
                <FormLabel >Season: </FormLabel>
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
                          <SelectItem key={index} value={type}>{type}</SelectItem>
                        ))
                        }
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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
          <div className="flex flex-col pl-2 space-y-4">
            <p className="text-muted-foreground">1 Game found to update</p>
            {
              toUpdateGame
                ?
                <Link
                  className="hover:underline text-sm text-celtics hover:text-slate-800"
                  href={`/dashboard/${toUpdateGame}`} rel="noopener" referrerPolicy="no-referrer">{toUpdateGame}
                </Link>
                : null
            }
          </div>
          : <p className="text-muted-foreground">No game found yet.</p>
      }

    </>
  )
}

export default UpdateScheduleGame