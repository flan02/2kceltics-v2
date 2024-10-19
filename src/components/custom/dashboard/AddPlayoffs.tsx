import AddPlayoffsForm from "./AddPlayoffsForm";
import EditPlayoffsForm from "./EditPlayoffsForm";




export default async function AddPlayoffs() {
  return (
    <div className='flex flex-col space-y-6 justify-start items-center mt-16 min-h-[calc(100vh-50px)]'>
      <h1 className=' text-center text-4xl text-celtics'>Add/Edit Playoffs</h1>
      <div className="grid grid-cols-1 w-full">
        <EditPlayoffsForm />
        <AddPlayoffsForm />
      </div>
    </div>
  )
}