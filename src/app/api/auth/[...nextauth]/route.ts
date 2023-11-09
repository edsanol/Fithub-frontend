import container from "@/config/inversifyContainer";
import { TYPES } from "@/config/types";
import { LoginGymUserUseCase } from "@/domain/useCases/GymUser/loginGymUserUseCase";
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

          const loginGymUserUseCase = container.get<LoginGymUserUseCase>(
            TYPES.LoginGymUserUseCase
          );

          const response = await loginGymUserUseCase.execute({
            email: credentials.email,
            password: credentials.password,
          });

          if (response.email) {
            return response as any;
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
