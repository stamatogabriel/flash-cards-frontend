import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

declare module "next-auth" {
  interface User {
    _id: string
    access_token: string
  }
  interface Session {
    access_token: string
    user: {
      _id: string
      email: string
      name: string
    }
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        let user = null

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        })

        if (response.ok) {
          user = await response.json()
        }

        if (!user) {
          throw new Error("Invalid credentials.")
        }

        return { _id: user.user._id, email: user.user.email, name: user.user.username, access_token: user.access_token }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      session.user._id = token._id as string
      session.user.email = token.email as string
      session.user.name = token.name as string
      session.access_token = token.access_token as string
      return session
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token._id = user._id
        token.email = user.email
        token.name = user.name
        token.access_token = user.access_token
      }
      return token
    },
  },
})