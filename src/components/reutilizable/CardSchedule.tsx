import React from 'react'

type Props = {}

const CardSchedule = (props: Props) => {
  return (
    <article className='border-y shadow-md md:w-[50%]'>
      <div className='grid grid-cols-2 min-h-[120px] items-center'>
        <div className='pl-4'>game #</div>
        <div>team + result</div>
      </div>
    </article>
  )
}

export default CardSchedule