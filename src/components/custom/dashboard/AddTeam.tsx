import { AddTeamForm } from "./AddTeamForm"


type Props = {}

const AddTeam = () => {
  return (
    <div className='flex flex-col justify-start items-center mt-16 min-h-[calc(100vh-150px)]'>
      <h1 className='text-center text-4xl text-celtics'>Add a team</h1>
      <br /><br />
      <AddTeamForm />
    </div>
  )
}

export default AddTeam