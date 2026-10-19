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
import { useRouter } from 'next/navigation';
import { useState } from "react"


type Props = {
  seeds: any,
  gamesPlayed: any,
  playoffsId: string
}

export interface Game {
  id: string;
  wins: number;
  team_code: string;
  position: string;
  losses: number;
  disabled: boolean;
  eliminated: boolean;
  round: string;
  conference: 'WEST' | 'EAST';
}

const UpdatePlayoffsForm = ({ seeds, gamesPlayed, playoffsId }: Props) => {
  const router = useRouter();


  // Helper seguro que no depende del orden del array de Prisma
  const getInitialSeed = (conference: 'WEST' | 'EAST', pos: number) => {
    const found = seeds.find(
      (s: any) => s.conference === conference && Number(s.position) === pos
    );
    return {
      id: found?.id || '',
      wins: found?.wins ?? 0,
      losses: found?.losses ?? 0,
      position: found?.position ?? String(pos),
      eliminated: found?.eliminated ?? false,
      conference,
      playoffsId
    };
  };

  async function onSubmit(values: z.infer<typeof updateSeedSchema>) {

    try {
      //console.log("VALUES ON FORM", values)
      const res = await updateSeed(values)

      if (res?.success) {
        toast({
          title: `Seed updated successfully`,
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 text-zinc-500">
              <code className="">{JSON.stringify(values, null, 2)}</code>
            </pre>
          ),
        })
        router.refresh();
      }
    } catch (error) {
      console.log("You couldnt update your playoffs data", error);
    }
  }

  const form = useForm<z.infer<typeof updateSeedSchema>>({
    resolver: zodResolver(updateSeedSchema),
    defaultValues: {
      seed_WEST_1: getInitialSeed('WEST', 1),
      seed_WEST_2: getInitialSeed('WEST', 2),
      seed_WEST_3: getInitialSeed('WEST', 3),
      seed_WEST_4: getInitialSeed('WEST', 4),
      seed_WEST_5: getInitialSeed('WEST', 5),
      seed_WEST_6: getInitialSeed('WEST', 6),
      seed_WEST_7: getInitialSeed('WEST', 7),
      seed_WEST_8: getInitialSeed('WEST', 8),

      seed_EAST_1: getInitialSeed('EAST', 1),
      seed_EAST_2: getInitialSeed('EAST', 2),
      seed_EAST_3: getInitialSeed('EAST', 3),
      seed_EAST_4: getInitialSeed('EAST', 4),
      seed_EAST_5: getInitialSeed('EAST', 5),
      seed_EAST_6: getInitialSeed('EAST', 6),
      seed_EAST_7: getInitialSeed('EAST', 7),
      seed_EAST_8: getInitialSeed('EAST', 8),
    }
  });

  const { register, handleSubmit, formState, watch, trigger, control, setValue, getValues, setFocus, formState: { isSubmitting, isSubmitted, errors } } = form

  return (


    <Form {...form} >
      <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 space-y-16 lg:space-y-0 lg:space-x-2 border rounded-lg p-8 lg:p-16">
        <div className="space-y-2">
          <ConferenceSeed
            seeds={seeds.filter((seed: any) => seed.conference == "WEST")}
            allSeeds={seeds}
            conference={"WEST"}
            control={control}
            setValue={setValue}
            getValues={getValues}
          />

        </div>
        <div className="space-y-2">
          <ConferenceSeed
            seeds={seeds.filter((seed: any) => seed.conference == "EAST")}
            allSeeds={seeds}
            conference={"EAST"}
            control={control}
            setValue={setValue}
            getValues={getValues} />

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
