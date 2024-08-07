
import Link from "next/link"
import { useState } from "react"
import { buttonVariants } from "../ui/button"



type Props = {
  isAdmin: boolean
}

const Upload = ({ isAdmin }: Props) => {

  return (
    <>
      {
        isAdmin
          ?
          <Link href="/api/auth/logout" className={buttonVariants({ size: "sm", variant: "ghost" })}>
            Sign out
          </Link>
          : <p>dropdown menu</p>
      }
    </>
  )
}

export default Upload