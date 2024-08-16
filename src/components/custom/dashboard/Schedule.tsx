import CreateScheduleGame from "./CreateScheduleGame"
import UpdateScheduleGame from "./UpdateScheduleGame"

// w-full border rounded-lg border-slate-200 mb-16 p-16 space-y-8
type Props = {}

const Schedule = () => {
  return (
    <section className='flex flex-col space-y-6 justify-start items-center mt-16 min-h-[calc(100vh-50px)]'>
      <h1 className=' text-center text-4xl text-celtics'>Program Schedule</h1>

      <article className="p-16 border border-slate-200 w-full rounded-lg space-y-4">
        <UpdateScheduleGame />
        <br />
        <CreateScheduleGame />
      </article>

    </section>
  )
}

export default Schedule