
import { lazy, useEffect, useState, Suspense } from "react"
import EditTeamForm from "./EditTeamForm"



//const AddTeamForm = lazy(() => import("@/components/custom/dashboard/AddTeamForm"))


export function EditTeam() {
  /*const [addTeamForm, setAddTeamForm] = useState(false)
  useEffect(() => {
    const uploadComponent = async () => {
      await import("@/components/custom/dashboard/AddTeamForm")
      setAddTeamForm(true)
    }

    uploadComponent()
  }, [])
*/
  return (
    <div className='flex flex-col justify-start items-center mt-16 min-h-[calc(100vh-50px)]'>
      <h1 className=' text-center text-4xl text-celtics'>Edit a team</h1>
      <br />
      <EditTeamForm />

    </div>
  )
}

export default EditTeam
//<Suspense fallback={<p className="h-full text-lg text-celtics ">Loading form...</p>}>
//</Suspense>