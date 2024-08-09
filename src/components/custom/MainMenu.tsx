
import React from 'react'


import DesktopMenu from './home/DesktopMenu';
import MobileMenu from './home/MobileMenu';
type Props = {}

const MainMenu = (props: Props) => {
  return (
    <article id="main-menu" className="max-w-screen-xl mx-auto pt-12 lg:pt-12 mb-24 lg:mb-0" >
      <h1 className="text-celtics mx-auto w-max text-center text-6xl md:text-7xl text-shadow uppercase mt-24">Main Menu</h1>
      <DesktopMenu />
      <MobileMenu />
    </article>
  )
}

export default MainMenu