import React from 'react'
import BackToTop from '../reutilizable/BackToTop'

type Props = {}

const Roster = (props: Props) => {
  return (
    <section id="roster" className="max-w-screen-xl flex mx-auto pt-12 ">
      <div className="flex mx-auto">
        <h1 className="text-celtics mx-auto w-max text-center text-7xl text-shadow uppercase mt-24">2023/24 ROSTER</h1>
        <BackToTop />
      </div>
    </section>
  )
}

export default Roster