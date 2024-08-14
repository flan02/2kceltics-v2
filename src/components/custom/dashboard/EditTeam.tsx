

import { getSeasons2k } from "@/app/dashboard/actions"
import EditTeamForm from "./EditTeamForm"
import { Season2k } from "@prisma/client";






export default async function EditTeam() {


  return (
    <div className='flex flex-col justify-start items-center mt-16 min-h-[calc(100vh-50px)]'>
      <h1 className=' text-center text-4xl text-celtics'>Edit a team</h1>
      <br />
      <EditTeamForm />

    </div>
  )
}


