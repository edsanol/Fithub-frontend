import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          if (!credentials) {
            throw new Error("Missing credentials");
          }

          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Gym/login`,
            {
              email: credentials.email,
              password: credentials.password,
            }
          );

          if (response.status === 200) {
            return response.data;
          }

          return null;
        } catch (error) {
          console.log("error", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
