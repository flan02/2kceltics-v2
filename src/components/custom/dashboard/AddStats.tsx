import React from 'react'
import AddPlayerStatsForm from './AddPlayerStatsForm'

type Props = {}

const AddStats = () => {
  return (
    <section className='flex flex-col justify-start items-center mt-16 min-h-[calc(100vh-50px)]'>
      <h1 className='text-center text-4xl text-celtics'>Add Player Stats</h1>
      <br />
      <AddPlayerStatsForm />
    </section>
  )
}

export default AddStats