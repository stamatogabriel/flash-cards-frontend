import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    Credentials({
      credentials: {
        access_token: {},
      },
      authorize: async (credentials) => {
        let user = null

        console.log(credentials)

        user = {
          id: "1",
          name: "John Doe",
          email: "test@test.com",
        }

        if (!user) {
          throw new Error("Invalid credentials.")
        }

        return user
      },
    }),
  ],
})