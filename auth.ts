import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { type NextAuthConfig, type DefaultSession } from "next-auth";
import Discord from "next-auth/providers/discord";
import { db } from "~/server/db";

declare module "@auth/core" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [Discord],
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  callbacks: {
    authorized(params) {
      return !!params.auth?.user;
    },
    session: async ({ session, user }) => {
      if (user && session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
}) satisfies NextAuthConfig;
