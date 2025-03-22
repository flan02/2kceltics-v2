import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import { createUser, loggedAsAdmin } from './app/dashboard/actions'

import { User } from 'types'
import { db } from './db'

// ? To see the current providers
// $ http://localhost:3000/api/auth/providers  

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub, Google],
  session: {
    maxAge: 86400,
    updateAge: 3600 // 43200
  },
  jwt: {
    maxAge: 86400
  },
  callbacks: {
    async signIn({ user, account, profile }) {

      try {
        const { name, email, image } = user as User

        //console.log({ user, account, profile });
        //console.log('Current email', email);
        const userFound = await loggedAsAdmin(email) // We need to know if the user is an admin or not

        if (!userFound) {
          await createUser(name, email, image)
          return true

        }
        // if (userFound.role == "ADMIN") return true
        return true
      } catch (error) {
        console.error("We found the following error: ", error)
        return false
      }
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await db.user.findUnique({
          where: {
            email: profile.email!
          }
        })
        if (user) {
          token.id = user?.id
          token.iat = Math.floor(Date.now() / 1000)
          token.exp = Math.floor(Date.now() / 1000) + 86400
        }
      }
      return token
    },
    async session({ session, token }: { session: any, token: any }) {
      if (token) {
        session.user.id = String(token.id)
        session.token = token
        session.user.sub = String(token.sub) // Says who is the owner of the token
        session.user.jti = String(token.jti) // Unique identifier for the JWT
        session.user.iat = String(token.iat)
        session.user.exp = String(token.exp)
      }
      return session
    },
    async authorized({ request }) {
      const session = await auth()
      return !!session?.user
      // return !!auth?.user
    }
  },
  pages: {
    signIn: '/',
    signOut: '/',
    error: '/'
  }
})