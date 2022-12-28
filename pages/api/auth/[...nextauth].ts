import NextAuth, { NextAuthOptions } from 'next-auth';
import bcrypt from 'bcrypt';
import CredentialsProvider from 'next-auth/providers/credentials';

import { connectDb } from '../../../src/db/config/connectDb';
import UserModel from '../../../src/db/models/UserModel';

import { LoginForm } from '../../../src/types';
import { User } from '../../../src/generated/graphql';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      //@ts-ignore
      async authorize(creds: LoginForm) {
        try {
          connectDb();
          const { email, password } = creds;
          const user: (User & { password: string }) | null =
            await UserModel.findOne({ email });

          if (!user) {
            console.log(
              'User with given credentials not found, please signup first.'
            );
            return null;
          }
          const comparePwd = await bcrypt.compare(password, user.password);
          if (!comparePwd) {
            console.log('uername or password does not match');
            return null;
          }
          return user;
        } catch (error) {
          console.log('error', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (token && token.sub) {
        delete session.user?.image;
        session.user.userId = token?.sub;
      }
      return Promise.resolve(session);
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
  },
};

export default NextAuth(authOptions);
