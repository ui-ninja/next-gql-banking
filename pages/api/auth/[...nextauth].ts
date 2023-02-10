import NextAuth, { NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";

import { connectDb } from "../../../src/db/config/connectDb";
import UserModel from "../../../src/db/models/UserModel";

import { LoginForm } from "../../../src/types";
import { User } from "../../../src/generated/graphql";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      // @ts-ignore
      async authorize(creds: LoginForm) {
        try {
          connectDb();
          const { email, password } = creds;
          const user: (User & { password: string }) | null =
            await UserModel.findOne({ email });

          if (!user) {
            return null;
          }
          const comparePwd = await bcrypt.compare(password, user.password);
          if (!comparePwd) {
            return null;
          }
          return user;
        } catch (error) {
          console.error("error", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      const sessionObj = session;
      if (token && token.sub) {
        delete sessionObj.user?.image;
        sessionObj.user.userId = token?.sub;
      }
      return Promise.resolve(sessionObj);
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
