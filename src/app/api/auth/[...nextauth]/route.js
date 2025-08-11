import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // This is where you would check against a database.
        // For this example, we'll use hardcoded admin credentials.
        if (credentials.email === process.env.ADMIN_USERNAME && credentials.password === process.env.ADMIN_PASSWORD) {
          return { id: "1", name: process.env.NAME, email: process.env.EMAIL }
        }
        // Return null if user data could not be retrieved
        return null
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login', // Redirect users to /login if they are not authenticated
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }