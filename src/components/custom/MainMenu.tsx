
import React from 'react'


import DesktopMenu from './home/DesktopMenu';
import MobileMenu from './home/MobileMenu';
type Props = {

}

const MainMenu = (props: Props) => {
  // * Validate from db if playoffs are on querying the current season has more than 82 games
  const playoffs = true
  return (
    <article id="main-menu" className=" min-w-[350px] lg:max-w-screen-xl md:mx-auto pt-12 lg:pt-12 mb-24 lg:mb-0" >
      <h1 className="text-celtics mx-auto w-max text-center text-5xl md:text-7xl text-shadow uppercase mt-20 lg:mt-24">Main Menu</h1>
      <DesktopMenu playoffs={playoffs} />
      <MobileMenu playoffs={playoffs} />
    </article>
  )
}

export default MainMenu