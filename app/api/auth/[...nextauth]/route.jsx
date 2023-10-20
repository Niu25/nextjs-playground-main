import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter"


const prisma = new PrismaClient()


const login = async (username, password) => {
  //const prisma = new PrismaClient();
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
  adapter: PrismaAdapter(prisma),
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
    EmailProvider({

      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      sendVerificationRequest({
        identifier: email,
        url,
        provider: { server, from },
      }) {
        /* your function */
      },
    }), 
  ],
  pages: {
    signIn: "/signIn",
  },
  callbacks: {},
});

export { handler as GET, handler as POST };
