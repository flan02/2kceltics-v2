import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import React, { useState } from 'react'
import { Game } from './UpdatePlayoffsForm'
import { Round } from '@/lib/types'


type Props = {
  seeds: any[]
  conference: string
  control: any
  setValue: any
  getValues: any

}

type Action = 'WIN' | 'LOSS'



const ConferenceSeed = ({ seeds, conference, control, setValue, getValues }: Props) => {

  const initGames: Game[] = seeds.map((seed: any) => ({
    id: seed.id,
    wins: seed.wins,
    team_code: seed.team_code,
    position: seed.position,
    losses: seed.losses,
    disabled: false,
    eliminated: seed.eliminated,
    round: seed.round,
  }))



  const [games, setGames] = useState<Game[]>(initGames);


  const handleGames = (id: string, action: Action): void => {

    const gameToUpdate = games.find((game) => game.id === id);
    if (gameToUpdate!.disabled) {
      alert("You can only update the game once");
      return;
    }
    if (gameToUpdate!.wins > 15) {
      alert("Wins cannot be greater than 16. You are the champ!");
      return;
    }

    // First I update the form
    const newWins: number = action === 'WIN' ? gameToUpdate!.wins + 1 : gameToUpdate!.wins;
    const newLosses: number = action === 'LOSS' ? gameToUpdate!.losses + 1 : gameToUpdate!.losses;

    let newRound = Round.FIRST_ROUND; // Default value

    if (conference === "EAST") {
      if (newWins > 3 && newWins < 8) {
        newRound = Round.ECSF;
      } else if (newWins > 7 && newWins < 12) {
        newRound = Round.ECF;
      } else if (newWins > 11 && newWins < 17) {
        newRound = Round.FINALS;
      }
    }

    if (conference === "WEST") {
      if (newWins > 3 && newWins < 8) {
        newRound = Round.WCSF;
      } else if (newWins > 7 && newWins < 12) {
        newRound = Round.WCF;
      } else if (newWins > 11 && newWins < 17) {
        newRound = Round.FINALS;
      }
    }

    // Second I update values in the form using setValue
    setValue(`seed_${conference}_${gameToUpdate?.position}.wins`, newWins);
    setValue(`seed_${conference}_${gameToUpdate?.position}.losses`, newLosses);
    setValue(`seed_${conference}_${gameToUpdate?.position}.round`, newRound);


    // Finally I update the state
    setGames((prev) => prev.map((game: any) =>
      game.id === id
        ? { ...game, wins: newWins, losses: newLosses, round: newRound }
        : game
    ))

    setGames((prev) => prev.map((game) =>
      game.id === id ? { ...game, disabled: true } : game
    ));
  }


  return (
    <section className='space-y-2'>
      <h1 className='uppercase text-celtics dark:text-celtics text-2xl text-center mb-6'>{conference} CONFERENCE</h1>
      {
        games
          .map((seed: any, index) => (
            <section key={seed.id} className={`p-2 rounded-md ${seed.eliminated ? "bg-zinc-300 opacity-50 dark:bg-black dark:opacity-40" : "border  dark:bg-zinc-900/50 dark:hover:bg-zinc-800/30 hover:bg-green-100/50 bg-zinc-200/30"}`}>

              <div className={`${seed.eliminated ? "line-through" : ""} flex items-end space-x-2 text-lg text-muted-foreground dark:text-zinc-600`}>
                <Image className={`${seed.team_code == "MIA" ? "" : ""}`} src={`/logos/${seed.team_code}.png`} width={seed.team_code == "MIA" ? 28 : 34} height={seed.team_code == "MIA" ? 28 : 34} alt={seed.team_code} />
                <p className=''>{seed.team_code} ({seed.position}) {seed.round} | {seed.wins} <span className='text-celtics'>W</span> - {seed.losses} <span className='text-red-500'>L </span></p>
              </div>

              <div className='flex space-x-4'>
                <FormField
                  control={control}
                  name={`seed_${conference}_${seed.position}`}
                  render={({ field }) => (
                    <>
                      <FormItem className='flex items-end space-x-1'>
                        <FormLabel className='' htmlFor='wins'>
                          <button onClick={() => handleGames(seed.id, 'WIN')} disabled={seed.eliminated ? true : false} type="button" className={`${seed.eliminated ? "border rounded-md disabled:border-zinc-400" : " rounded-md border border-celtics/50 text-celtics/50"} px-2 py-2.5`}>WIN</button>
                        </FormLabel>

                        <FormControl >
                          <Input id="wins" disabled={true} type="number" className="dark:text-zinc-500 w-[42px] disabled:border disabled:border-zinc-700 disabled:text-black"  {...field} value={field.value ? field.value.wins : seed.wins} />
                        </FormControl>
                        <FormMessage> </FormMessage>
                      </FormItem>


                      <FormItem className='flex items-end space-x-1'>
                        <FormLabel className='flex space-x-2 justify-between' htmlFor='losses'>

                          <button onClick={() => handleGames(seed.id, 'LOSS')} disabled={seed.eliminated ? true : false} type="button" className={`${seed.eliminated ? "border rounded-md disabled:border-zinc-400" : " rounded-md border border-red-600/50 text-red-600/50"} px-2 py-2.5`}>LOSS</button>
                        </FormLabel>

                        <FormControl>

                          <Input id="losses" disabled={true} type="number" className="dark:text-zinc-500 w-[42px] disabled:border disabled:border-zinc-700 disabled:text-black" {...field} value={field.value ? field.value.losses : seed.losses} />
                        </FormControl>
                        <FormMessage> </FormMessage>
                      </FormItem>

                      <FormItem className="flex items-end p-1 mr-2 w-full justify-end">
                        <FormControl className='order-1 ml-1.5'>
                          <Checkbox
                            id="eliminated"
                            checked={field.value && !seed.eliminated ? field.value.eliminated : seed.eliminated}
                            onCheckedChange={(value) => {
                              // Obtener todos los valores actuales del formulario
                              const currentValues = getValues();
                              // console.log(currentValues);
                              // Actualizamos solo el campo "eliminated" para este seed específico
                              // console.log(`seed_${conference}_${seed.position}.eliminated`, value);
                              setValue(`seed_${seed.conference}_${seed.position}.eliminated`, value);

                              // Asegurar que el resto de los valores (wins, losses, etc.) no se sobrescriban
                              setValue(`seed_${conference}_${seed.position}`, {
                                ...currentValues[`seed_${conference}_${seed.position}`],
                                eliminated: value,
                              });
                            }}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none text-muted-foreground dark:text-zinc-600">
                          <FormLabel htmlFor='eliminated'>
                            elim:
                          </FormLabel>

                        </div>
                      </FormItem>

                      <FormItem hidden={true} >
                        <FormControl >
                          <Input id="playoffsId" type="text" hidden={true} {...field} />
                        </FormControl>
                        <FormMessage> </FormMessage>
                      </FormItem>
                      <FormItem hidden={true} >
                        <FormControl >
                          <Input id="id" type="text" hidden={true} {...field} />
                        </FormControl>
                        <FormMessage> </FormMessage>
                      </FormItem>
                      <FormItem hidden={true} >
                        <FormControl >
                          <Input id="conference" type="text" hidden={true} {...field} />
                        </FormControl>
                        <FormMessage> </FormMessage>
                      </FormItem>
                    </>

                  )}
                />


              </div>
            </section>
          ))
      }
    </section>
  )
}

export default ConferenceSeed




/* 
  <div className='flex items-end space-x-2'>
                          <span className='uppercase text-xs'>elim:</span>
                          <Checkbox
                            id={`${seed.id}-checkbox`}
                            checked={field.value}
                            onChange={field.onChange}
                            className='border border-gray-400 dark:border-zinc-700' disabled={seed.eliminated} />
                        </div>
*/

/* 

 <FormField
                control={control}
                name=""
                render={({ field }) => (
                  <FormItem className={`${seed.eliminated ? "bg-zinc-400 dark:bg-black opacity-30 hover:opacity-30 dark:hover:bg-black dark:hover:opacity-30" : "hover:bg-zinc-200/60 dark:hover:bg-zinc-800/20 dark:opacity-0"}flex flex-col items-end space-x-2 text-zinc-500 dark:text-stone-700  border rounded-md py-2 px-4`}>
                    <FormLabel htmlFor="" className={`w-full`} >
                      <div className={`${seed.eliminated ? "line-through" : ""} flex items-end space-x-2 text-lg`}>


                        <Image className={`${seed.team_code == "MIA" ? "" : ""}`} src={`/logos/${seed.team_code}.png`} width={seed.team_code == "MIA" ? 28 : 34} height={seed.team_code == "MIA" ? 28 : 34} alt={seed.team_code} />
                        <p>{seed.team_code} ({seed.position}) {seed.round} | {seed.wins} <span className='text-celtics'>W</span> - {seed.losses} <span className='text-red-500'>L</span></p>


                      </div>
                    </FormLabel>

                  </FormItem>
                )}
              />
*/

/* 
    <FormField
                  control={control}
                  name='losses'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='flex space-x-2 justify-between' htmlFor='losses'>

                        <button onClick={() => handleGames(seed.id, 'LOSS')} disabled={seed.eliminated ? true : false} type="button" className={`${seed.eliminated ? "border rounded-md" : " rounded-md border border-red-600/50 text-red-600/50"} px-2 py-1`}>LOSS</button>
                      </FormLabel>

                      <FormControl>

                        <Input id="losses" disabled={true} type="number" className="dark:text-zinc-500 w-[42px] disabled:border disabled:border-zinc-700 disabled:text-black" {...field} value={seed.losses} />
                      </FormControl>





                      <FormMessage> </FormMessage>
                    </FormItem>

                  )}
                />
                <FormField
                  control={control}
                  name="eliminated"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                      <FormControl>
                        <Checkbox
                          id="eliminated"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel htmlFor='eliminated'>
                          elim:
                        </FormLabel>

                      </div>
                    </FormItem>
                  )}
                />
*/

/* 

    setGames((prev) => prev.map((game) => {

      if (game.id === id && !game.disabled) {
        
        if (action === 'WIN') {
          return { ...game, wins: game.wins + 1, disabled: true };
        }
        if (action === 'LOSS') {
          return { ...game, losses: game.losses + 1, disabled: true };
        }
        
        
                const updatedGame = {
                  ...game,
                  wins: action == 'WIN' ? game.wins + 1 : game.wins,
                  losses: action == 'LOSS' ? game.losses + 1 : game.losses,
                };
        
                setValue(`seed_${conference}_${game.position}.wins`, updatedGame.wins);
                setValue(`seed_${conference}_${game.position}.losses`, updatedGame.losses);
        
                console.log(updatedGame);
        
                return updatedGame;
        
       

      }
      return game;
    })
    )
  }

*/