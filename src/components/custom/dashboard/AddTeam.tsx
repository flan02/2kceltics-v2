
import { getSeasons2k } from "@/app/dashboard/actions";
import AddTeamForm from "./AddTeamForm"
import EditTeamForm from "./EditTeamForm";

type Props = {
  season: any
  total_games: any
}




export default async function AddTeam() {
  const CURRENT_SEASON = process.env.CURRENT_SEASON;
  const season2k: Props = await getSeasons2k(CURRENT_SEASON) as Props;

  return (
    <section className='flex flex-col space-y-6 justify-start items-center mt-16 min-h-[calc(100vh-50px)]'>
      <h1 className=' text-center text-4xl text-celtics'>Add/Edit team</h1>
      <div className="grid grid-cols-1 w-full">

        <EditTeamForm season2k={season2k} />
        <AddTeamForm />

      </div>


    </section>
  )
}


