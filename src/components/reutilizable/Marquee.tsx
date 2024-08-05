import React from 'react'

type Props = {}

const Marquee = (props: Props) => {
  return (
    <div className=" absolute whitespace-nowrap overflow-hidden w-[100%] top-[50px] left-0 bg-zinc-300/60 py-4 uppercase font-bold">
      <div className='min-w-full animate-marquee-x text-celtics'>

        <h6 className="inline-block uppercase"><span className='underline'>NEXT GAME #50:</span> &nbsp; &nbsp; &nbsp; BOSTON CELTICS <span className='lowercase'>vs</span> MIAMI HEAT &nbsp; - &nbsp; starting 5: C - Kristap Porzingis | PF - Jayson Tatum | SF - Jaylen Brown | SG - Jrue Holiday | PG - Derrick White </h6>
        <h6 className="inline-block uppercase ml-48 mr-48">Welcome to Boston Celtics Kristap Porzingis! 🦄</h6>
        {/*<!--  
      <h6 className="inline-block ml-48"><span className='underline'>NEXT GAME #50:</span> &nbsp; &nbsp; &nbsp; BOSTON CELTICS <span className='lowercase'>vs</span> MIAMI HEAT &nbsp; - &nbsp; starting 5: C - Kristap Porzingis | PF - Jayson Tatum | SF - Jaylen Brown | SG - Jrue Holiday | PG - Derrick White </h6>
      --> */}
        <h6 className="inline-block uppercase ml-48 mr-48">We&apos;re all gonna miss you Marcus Smart [Heart and soul of the Boston Celtics] ☘</h6>
      </div>

    </div>
  )
}

export default Marquee