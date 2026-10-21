"use server";

import { db } from "@/db";
import { Round } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateSeed = async (values: any) => {
  //console.log("form server values", values)
  try {
    const valuesArray = Object.values(values);
    //console.log(valuesArray);
    //! Probably we dont need playoffsId nor team_code, remove them from the valuesArray and zodschema and the form
    const playoffsId = (valuesArray[0] as { playoffsId: string }).playoffsId;

    // Ejecución atómica en una sola transacción
    await db.$transaction([
      ...valuesArray.map((seed: any) =>
        db.seed.update({
          where: { id: seed.id },
          data: {
            wins: Number(seed.wins),
            losses: Number(seed.losses),
            eliminated: Boolean(seed.eliminated),
            round: seed.round,
          },
        }),
      ),
      db.playoffs.update({
        where: { id: playoffsId },
        data: {
          gamesPlayed: {
            increment: 1,
          },
        },
      }),
    ]);

    //console.log("Playoffs games played updated successfully", updatePlayoffsGame);
    revalidatePath(`/playoffs/${playoffsId}`);
    revalidatePath(`/playoffs`);

    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "An error occurred while updating the seed" };
  }
};

export async function resetPlayoffs(playoffsId: string) {
  try {
    await db.seed.updateMany({
      where: { playoffsId },
      data: {
        wins: 0,
        losses: 0,
        eliminated: false,
        round: Round.FIRST_ROUND,
      },
    });

    revalidatePath(`/playoffs/${playoffsId}`);
    revalidatePath(`/playoffs`);

    return { success: true };
  } catch (error) {
    console.error("Error al resetear playoffs:", error);
    return {
      success: false,
      error: "An error occurred while resetting the playoffs.",
    };
  }
}
