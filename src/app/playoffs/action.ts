"use server"

import { db } from "@/db";
import { Round } from "@/lib/types";
import { revalidatePath } from "next/cache";

export const updateSeed = async (values: any) => {
  //console.log("form server values", values)
  try {
    const valuesArray = Object.values(values);

    //console.log(valuesArray);


    //! Probably we dont need playoffsId nor team_code, remove them from the valuesArray and zodschema and the form
    const playoffsId = (valuesArray[0] as { playoffsId: string }).playoffsId;
    //console.log("id obtained: ", playoffsId);

    //return valuesArray

    const updatedSeeds = valuesArray.map(async (seed: any) => {
      const { wins, losses, eliminated, id, conference } = seed; // ? Destructure the values from the seed. team_code and playoffsId is not required

      //console.log("Current conference", conference)
      //console.log("Current wins", wins)

      let round: Round = Round.FIRST_ROUND; // ? Set the default round to FIRST_ROUND

      if (conference == "EAST") {
        if (wins > 3 && wins < 8) {
          round = Round.ECSF;  // Eastern Conference Semifinals
        } else if (wins > 7 && wins < 12) {
          round = Round.ECF;   // Eastern Conference Finals
        } else if (wins > 11 && wins < 17) {
          round = Round.FINALS; // Finals
        } else {
          round = Round.FIRST_ROUND; // Default
        }
      }

      if (conference == "WEST") {
        if (wins > 3 && wins < 8) {
          round = Round.WCSF;  // Eastern Conference Semifinals
        } else if (wins > 7 && wins < 12) {
          round = Round.WCF;   // Eastern Conference Finals
        } else if (wins > 11 && wins < 17) {
          round = Round.FINALS; // Finals
        } else {
          round = Round.FIRST_ROUND; // Default
        }
      }


      // Actualizamos cada seed individualmente

      //console.log("next round", round)
      return db.seed.update({
        where: {
          id: id,  // Use the unique identifier for the seed
        },
        data: {
          wins,
          losses,
          eliminated,
          round
        },
      });
    })

    await Promise.all(updatedSeeds);
    //console.log("All seeds updated successfully");
    const updatePlayoffsGame = await db.playoffs.update({
      where: {
        id: playoffsId,
      },
      data: {
        gamesPlayed: {
          increment: 1, // ? Increment the games played by 1
        },

      },
    });

    //console.log("Playoffs games played updated successfully", updatePlayoffsGame);
    revalidatePath(`/playoffs/${playoffsId}`);

    return { success: true };

  } catch (error) {
    console.log(error)
    return { error: 'An error occurred while updating the seed' }
  }

}