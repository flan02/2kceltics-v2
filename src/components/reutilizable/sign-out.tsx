//"use client"


import { handleGoogleSignOut } from "@/services/server-functions"
import { LogOut } from "lucide-react"

type Props = {}

const SignOut = () => {

  const ServerLogOut = () => {
    return (
      <form
        action={handleGoogleSignOut}
      >
        <button type="submit" >
          <LogOut className='hover:text-red-500 text-muted-foreground' size={20} />
        </button>

      </form>
    )
  }

  return (
    <ServerLogOut />
  )
}

export default SignOut
