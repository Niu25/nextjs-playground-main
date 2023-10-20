import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";


const login = async (username, password) => {
  const prisma = new PrismaClient();
  const user = await prisma.TestUser.findFirst({
    where: {
      userName: username,
    },
  });

  if (user && (await bcrypt.compare(password, user.password)))  {
    user.password = "";
    return user;

  } else {
    throw new Error("User Not Found!");
  }
}; 

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "jsmith",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) return null;
        try {
          const user = await login(credentials.username, credentials.password);
          return user;
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }), 
  ],
  pages: {
    signIn: "/signIn",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
