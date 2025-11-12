import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";

import { prisma } from "./lib/prisma";

const emailFrom = process.env.EMAIL_FROM ?? "no-reply@sasakiya.shoten";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "database",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    EmailProvider({
      from: emailFrom,
      async sendVerificationRequest({ identifier, url }) {
        console.info(`Send magic link to ${identifier}: ${url}`);
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "", // Provide via environment variables
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
});
