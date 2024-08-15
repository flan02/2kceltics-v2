import CreateScheduleGame from "./CreateScheduleGame"
import UpdateScheduleGame from "./UpdateScheduleGame"


type Props = {}

const Schedule = () => {
  return (
    <section className='flex flex-col space-y-8 justify-start items-center mt-16 min-h-[calc(100vh-50px)]'>
      <h1 className=' text-center text-4xl text-celtics'>Program Schedule</h1>

      <UpdateScheduleGame />
      <br />
      <CreateScheduleGame />

    </section>
  )
}

export default Schedule