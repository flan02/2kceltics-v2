'use client'

import LoadingButton from "@/components/reutilizable/LoadingButton"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { atHomeTypes, gameTypes, stageTypes } from "@/lib/types"
import { createGameSchema } from "@/zod/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { SelectTrigger } from "@radix-ui/react-select"
import { useForm } from "react-hook-form"
import { z } from "zod"

type Props = {}





async function onSubmit(values: z.infer<typeof createGameSchema>) {
  // it goes to database
  console.log(values)
  toast({
    title: "New game has been created",
    description: (
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(values, null, 2)}</code>
      </pre>
    ),
  })
}

const NewGameForm = (props: Props) => {
  const form = useForm<z.infer<typeof createGameSchema>>({
    resolver: zodResolver(createGameSchema),
    defaultValues: {
      season: "NBA2K24",
      type: undefined,
      stage: undefined,
      currentGame: 0,
      athome: undefined,
      team1: "Boston Celtics",
      team_code1: "BOS",
      team2: "",
      team_code2: ""
    }
  })

  const { register, handleSubmit, formState, watch, trigger, control, setValue, setFocus, formState: { isSubmitting, isSubmitted } } = form

  return (
    <Form {...form} >
      <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="season"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="season">Current Season</FormLabel>
              <FormControl>
                <Input
                  id="season"
                  placeholder="" {...field}
                  autoComplete="off"
                  required={true}
                />
              </FormControl>
              <FormMessage>{form.formState.errors.season?.message}</FormMessage>
            </FormItem>
          )}
        />

        <div className="flex justify-start space-x-8">
          <FormField
            control={control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel >Game type: </FormLabel>
                <FormControl>
                  <Select {...field} defaultValue="" >
                    <SelectTrigger className="border border-slate-200 text-md font-light shadow-md py-1.5 text-left pl-2 min-w-[150px] rounded-md">
                      <SelectValue placeholder="Select RS or PO" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup >
                        {gameTypes.map((type, index) => (
                          <SelectItem key={index} value={type}>{type}</SelectItem>
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
            control={control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel >Stage: </FormLabel>
                <FormControl>
                  <Select {...field} defaultValue="" >
                    <SelectTrigger className="border border-slate-200 text-md font-light shadow-md py-1.5 text-left pl-2 w-[200px] rounded-md">
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup >
                        {stageTypes.map((stage, index) => (
                          <SelectItem key={index} value={stage}>{stage}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
          name="athome"
          render={({ field }) => (
            <FormItem>
              <FormLabel >Where: </FormLabel>
              <FormControl>
                <Select {...field} defaultValue="" >
                  <SelectTrigger className="border border-slate-200 text-md font-light shadow-md py-1.5 text-left pl-2 min-w-[150px] rounded-md">
                    <SelectValue placeholder="Select HOME or AWAY" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup >
                      {atHomeTypes.map((athome, index) => (
                        <SelectItem key={index} value={athome}>{athome}</SelectItem>
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

        <FormField
          control={form.control}
          name="team2"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="team2">Rival Team</FormLabel>
              <FormControl>
                <Input
                  id="team2"
                  placeholder="" {...field}
                  autoComplete="off"
                  required={true}
                />
              </FormControl>
              <FormMessage>{form.formState.errors.season?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="team_code2"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="team_code2">Rival Code</FormLabel>
              <FormControl>
                <Input
                  id="team_code2"
                  placeholder="" {...field}
                  autoComplete="off"
                  required={true}
                />
              </FormControl>
              <FormMessage>{form.formState.errors.season?.message}</FormMessage>
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

export default NewGameForm


//<option value="" hidden> Select an option</option>