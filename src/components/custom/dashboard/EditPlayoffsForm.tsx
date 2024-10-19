"use client"
import { getPlayoffs } from "@/app/dashboard/actions"
import LoadingButton from "@/components/reutilizable/LoadingButton"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { seasonTypes } from "@/lib/types"
import { getPlayoffsDataSchema } from "@/zod/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Search } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"


export type updatePlayoffsProps = {
  season: string
}

type Game = {
  id: string | undefined;
  gamesPlayed: number | undefined;
};


const EditPlayoffsForm = () => {


  const [toUpdateGame, setToUpdateGame] = useState<Game | null>({
    id: undefined,
    gamesPlayed: undefined
  });

  const form = useForm<z.infer<typeof getPlayoffsDataSchema>>({
    resolver: zodResolver(getPlayoffsDataSchema),
    defaultValues: {
      season: undefined
    }
  })
  const { register, handleSubmit, formState, watch, trigger, control, setValue, setFocus, formState: { isSubmitting, isSubmitted } } = form

  async function onSubmit({ season }: updatePlayoffsProps): Promise<void> {
    //console.log('what the fuck');
    /*
    const formData = new FormData()
    Object.entries(values).forEach(([key, value]) => {
      if (value) formData.append(key, String(value))
        //console.log(typeof value, value)
    })
    */
    //console.log(season)


    try {
      const gameID = await getPlayoffs(season) as { id: string, gamesPlayed: number };

      console.log(gameID)

      if (gameID) {
        setToUpdateGame({
          id: gameID.id,
          gamesPlayed: gameID.gamesPlayed
        })
      } else {
        setToUpdateGame(null)
      }

    } catch (error) {
      console.log(error)
    }

  }


  return (
    <div className="w-full border border-slate-200 rounded-lg mb-16 px-4 py-16 lg:p-16 b-16 space-y-8">
      <Form {...form}>
        <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={control}
            name="season"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-celtics font-bold text-lg flex" ><Search className="mr-2 mt-1" size={18} /> <span>Select playoff to update: </span></FormLabel>
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
          <div className="text-center ">
            <LoadingButton type="submit" loading={isSubmitting} className="dark:bg-celtics dark:hover:bg-celtics/80">
              Search
            </LoadingButton>
          </div>
        </form>
      </Form>

      {
        toUpdateGame?.id != undefined
          ?
          <div className="flex flex-col pl-2 space-y-4">
            <p className="text-muted-foreground">Playoffs to update - Games played {toUpdateGame?.gamesPlayed}</p>
            {
              toUpdateGame
                ?
                <Link
                  className="hover:underline text-sm text-celtics hover:text-slate-800"
                  href={`/playoffs/${toUpdateGame.id}`} rel="noopener" referrerPolicy="no-referrer">{toUpdateGame.id}
                </Link>
                : null
            }
          </div>
          : <p className="text-muted-foreground">No playoffs founded yet.</p>
      }

    </div>
  )
}

export default EditPlayoffsForm