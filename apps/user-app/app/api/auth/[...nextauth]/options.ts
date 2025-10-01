import GoogleProvider from "next-auth/providers/google";
import { AuthOptions, DefaultUser } from "next-auth";
import { CustomSession } from "@repo/types";
import axios from "axios";
import { prisma } from "@repo/db";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    number?: string | null;
  }

  interface Session {
    user: CustomSession;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      // console.log("User :", user);
      // console.log("Account :", account);

      try {
        const payload = {
          name: user.name,
          email: user.email,
          image: user.image,
          oauth_id: account?.providerAccountId,
          provider: "Google",
        };

        const { data } = await axios.post(
          `${process.env.NEXTAUTH_URL}/api/sign-user`,
          payload
        );

        // Since the user object coming from google doesn't have id and phone number, we need to append them to user from the data object :
        user.id = data?.user?.id.toString();
        user.number = data?.user?.number;

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          number: user.number,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as CustomSession;
      return session;
    },
  },
  pages: {
    signIn: process.env.NEXTAUTH_URL,
  },
};
