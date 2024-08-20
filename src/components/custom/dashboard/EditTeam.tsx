import { getSeasons2k } from "@/app/dashboard/actions"
import EditTeamForm from "./EditTeamForm"



type Props = {
  season: any
  total_games: any
}



export default async function EditTeam() {

  const CURRENT_SEASON = process.env.CURRENT_SEASON;
  const season2k: Props = await getSeasons2k(CURRENT_SEASON) as Props;

  return (
    <div className='flex flex-col justify-start items-center mt-16 min-h-[calc(100vh-50px)]'>
      <h1 className=' text-center text-4xl text-celtics'>Edit a team</h1>
      <br />
      <EditTeamForm season2k={season2k} />

    </div>
  )
}


