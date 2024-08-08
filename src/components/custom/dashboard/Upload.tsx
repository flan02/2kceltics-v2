import Link from "next/link"
import { buttonVariants } from "../../ui/button"



type Props = {
  isAdmin: boolean
}

const Upload = ({ isAdmin }: Props) => {

  return (
    <>
      {
        isAdmin
          ?
          <div className="">
            <Link href="/dashboard" className={buttonVariants({ size: "sm", variant: "outline" })}>
              Dashboard
            </Link>
            <Link href="/api/auth/logout" className={buttonVariants({ size: "sm", variant: "outline" })}>
              Sign out
            </Link>
          </div>
          : <p>dropdown menu</p>
      }
    </>
  )
}

export default Upload