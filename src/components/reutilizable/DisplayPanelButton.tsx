'use client'

import React from "react"


type DisplayPanelProps = {
  icon: React.ReactElement
  children?: React.ReactNode
  isOpen: boolean
  setOpen: (open: boolean) => void
}

const DisplayPanelButton: React.FC<DisplayPanelProps> = ({ icon, children, isOpen, setOpen }) => {

  const handleClick = () => setOpen(!isOpen)

  return (
    <button onClick={handleClick}>{icon}</button>
  )
}

export default DisplayPanelButton