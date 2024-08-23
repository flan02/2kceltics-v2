import AddSeasonForm from "./AddSeasonForm";



export default async function AddSeason() {



  return (
    <div className='flex flex-col justify-start items-center mt-16 min-h-[calc(100vh-50px)]'>
      <h1 className=' text-center text-4xl text-celtics'>Add new season</h1>
      <br />

      <AddSeasonForm />
    </div>
  )
}


