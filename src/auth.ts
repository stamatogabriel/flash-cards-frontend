import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

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