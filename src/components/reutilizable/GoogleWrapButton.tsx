'use client'
import GoogleButton from 'react-google-button'
import { signIn } from "next-auth/react"

const GoogleWrapButton = () => {
  return (

    <GoogleButton
      onClick={() => signIn('google')}
      style={{ width: "max-width", fontSize: "1rem" }}
      label="Sign in with Google"
    />

  )
}

export default GoogleWrapButton