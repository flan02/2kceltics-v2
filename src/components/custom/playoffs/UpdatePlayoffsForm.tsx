'use client'
import { updateSeedSchema } from "@/zod/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "@/components/ui/use-toast"
import ConferenceSeed from "./ConferenceSeed"
import LoadingButton from "@/components/reutilizable/LoadingButton"
import { updateSeed } from "@/app/playoffs/action"



type Props = {
  seeds: any,
  gamesPlayed: any,
  playoffsId: string
}

async function onSubmit(values: z.infer<typeof updateSeedSchema>) {

  try {
    //console.log("VALUES ON FORM", values)
    const update = await updateSeed(values)


    toast({
      title: `Seed updated successfully`,
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 text-zinc-500">
          <code className="">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    })
  } catch (error) {
    console.log("You couldnt update your playoffs data", error);
  }
}

export interface Game {
  id: string;
  wins: number;
  team_code: string;
  losses: number;
  position: string;
  disabled: boolean;
  eliminated: boolean;
}

const UpdatePlayoffsForm = ({ seeds, gamesPlayed, playoffsId }: Props) => {

  const dflt: any = seeds.map((seed: any) => ({
    id: seed.id,
    wins: seed.wins,
    losses: seed.losses,
    position: seed.position,
    eliminated: seed.eliminated,
    conference: seed.conference,
    playoffsId: playoffsId
  }))



  const form = useForm<z.infer<typeof updateSeedSchema>>({
    resolver: zodResolver(updateSeedSchema),
    defaultValues: {
      seed_WEST_1: {
        id: dflt[0].id,
        wins: dflt[0].wins,
        losses: dflt[0].losses,
        position: dflt[0].position,
        eliminated: dflt[0].eliminated,
        conference: dflt[0].conference,
        playoffsId: dflt[0].playoffsId

      },
      seed_WEST_2: {
        id: dflt[1].id,
        wins: dflt[1].wins,
        losses: dflt[1].losses,
        position: dflt[1].position,
        eliminated: dflt[1].eliminated,
        conference: dflt[1].conference,
        playoffsId: dflt[1].playoffsId

      },
      seed_WEST_3: {
        id: dflt[2].id,
        wins: dflt[2].wins,
        losses: dflt[2].losses,
        position: dflt[2].position,
        eliminated: dflt[2].eliminated,
        conference: dflt[2].conference,
        playoffsId: dflt[2].playoffsId

      },
      seed_WEST_4: {
        id: dflt[3].id,
        wins: dflt[3].wins,
        losses: dflt[3].losses,
        position: dflt[3].position,
        eliminated: dflt[3].eliminated,
        conference: dflt[3].conference,
        playoffsId: dflt[3].playoffsId

      },
      seed_WEST_5: {
        id: dflt[4].id,
        wins: dflt[4].wins,
        losses: dflt[4].losses,
        position: dflt[4].position,
        eliminated: dflt[4].eliminated,
        conference: dflt[4].conference,
        playoffsId: dflt[4].playoffsId

      },
      seed_WEST_6: {
        id: dflt[5].id,
        wins: dflt[5].wins,
        losses: dflt[5].losses,
        position: dflt[5].position,
        eliminated: dflt[5].eliminated,
        conference: dflt[5].conference,
        playoffsId: dflt[5].playoffsId

      },
      seed_WEST_7: {
        id: dflt[6].id,
        wins: dflt[6].wins,
        losses: dflt[6].losses,
        position: dflt[6].position,
        eliminated: dflt[6].eliminated,
        conference: dflt[6].conference,
        playoffsId: dflt[6].playoffsId

      },
      seed_WEST_8: {
        id: dflt[7].id,
        wins: dflt[7].wins,
        losses: dflt[7].losses,
        position: dflt[7].position,
        eliminated: dflt[7].eliminated,
        conference: dflt[7].conference,
        playoffsId: dflt[7].playoffsId

      },
      seed_EAST_1: {
        id: dflt[8].id,
        wins: dflt[8].wins,
        losses: dflt[8].losses,
        position: dflt[8].position,
        eliminated: dflt[8].eliminated,
        conference: dflt[8].conference,
        playoffsId: dflt[8].playoffsId

      },
      seed_EAST_2: {
        id: dflt[9].id,
        wins: dflt[9].wins,
        losses: dflt[9].losses,
        position: dflt[9].position,
        eliminated: dflt[9].eliminated,
        conference: dflt[9].conference,
        playoffsId: dflt[9].playoffsId

      },
      seed_EAST_3: {
        id: dflt[10].id,
        wins: dflt[10].wins,
        losses: dflt[10].losses,
        position: dflt[10].position,
        eliminated: dflt[10].eliminated,
        conference: dflt[10].conference,
        playoffsId: dflt[10].playoffsId

      },
      seed_EAST_4: {
        id: dflt[11].id,
        wins: dflt[11].wins,
        losses: dflt[11].losses,
        position: dflt[11].position,
        eliminated: dflt[11].eliminated,
        conference: dflt[11].conference,
        playoffsId: dflt[11].playoffsId

      },
      seed_EAST_5: {
        id: dflt[12].id,
        wins: dflt[12].wins,
        losses: dflt[12].losses,
        position: dflt[12].position,
        eliminated: dflt[12].eliminated,
        conference: dflt[12].conference,
        playoffsId: dflt[12].playoffsId

      },
      seed_EAST_6: {
        id: dflt[13].id,
        wins: dflt[13].wins,
        losses: dflt[13].losses,
        position: dflt[13].position,
        eliminated: dflt[13].eliminated,
        conference: dflt[13].conference,
        playoffsId: dflt[13].playoffsId

      },
      seed_EAST_7: {
        id: dflt[14].id,
        wins: dflt[14].wins,
        losses: dflt[14].losses,
        position: dflt[14].position,
        eliminated: dflt[14].eliminated,
        conference: dflt[14].conference,
        playoffsId: dflt[14].playoffsId

      },
      seed_EAST_8: {
        id: dflt[15].id,
        wins: dflt[15].wins,
        losses: dflt[15].losses,
        position: dflt[15].position,
        eliminated: dflt[15].eliminated,
        conference: dflt[15].conference,
        playoffsId: dflt[15].playoffsId


      }
    }
  })





  const { register, handleSubmit, formState, watch, trigger, control, setValue, getValues, setFocus, formState: { isSubmitting, isSubmitted, errors } } = form

  //console.error(errors)

  // ! This is the way to get the values from the form using ShadCN
  //console.log(getValues())

  return (


    <Form {...form} >
      <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 space-y-16 lg:space-y-0 lg:space-x-2 border rounded-lg p-8 lg:p-16">
        <div className="space-y-2">
          <ConferenceSeed seeds={seeds.filter((seed: any) => seed.conference == "WEST")} conference={"WEST"} control={control} setValue={setValue} getValues={getValues} />

        </div>
        <div className="space-y-2">
          <ConferenceSeed seeds={seeds.filter((seed: any) => seed.conference == "EAST")} conference={"EAST"} control={control} setValue={setValue} getValues={getValues} />

        </div>

        <div className="flex items-center space-x-2 text-zinc-500 text-center md:text-left pt-6">
          <p className="text-lg">Adding Playoffs game # {gamesPlayed + 1}:</p>
          <LoadingButton className="dark:bg-celtics hover:dark:bg-celtics/80" type="submit" loading={isSubmitting}>
            Update
          </LoadingButton>
        </div>
      </form>
    </Form>

  )
}

export default UpdatePlayoffsForm
