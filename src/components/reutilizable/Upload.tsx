'use client'
import Link from "next/link"
import { useState } from "react"



type Props = {}

const Upload = (props: Props) => {
  const [user, setUser] = useState<boolean>(false)
  return (
    <>
      {
        user
          ? <Link href="/upload" className="text-celtics uppercase hover:underline">Upload 🎨</Link>
          : <p>dropdown menu</p>
      }
    </>
  )
}

export default Upload