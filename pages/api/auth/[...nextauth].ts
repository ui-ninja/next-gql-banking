import NextAuth from 'next-auth';
import bcrypt from 'bcrypt';
import CredentialsProvider from 'next-auth/providers/credentials';

import { connectDb } from '../../../src/db/config/connectDb';
import UserModel from '../../../src/db/models/UserModel';

import { LoginForm } from '../../../src/types';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      async authorize(credentials: LoginForm) {
        try {
          connectDb();
          const { email, password } = credentials;
          const user = await UserModel.find({ email });
          if (!user[0]) {
            throw new Error(
              'User with given credentials not found, please signup first.'
            );
          }
          const comparePwd = await bcrypt.compare(password, user[0].password);
          if (!comparePwd) {
            throw new Error('uername or password does not match');
          }
          return user[0];
        } catch (error) {
          console.log('error', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
  },
});
