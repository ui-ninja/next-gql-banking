import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import bcrypt from 'bcrypt';

import { LoginInput, NewUserInput, User } from './user';

import UserModel from '../../db/models/UserModel';

@Resolver(User)
export class UserResolver {
  @Query(() => User)
  // gives one user
  async user(@Arg('id') id: string): Promise<User | null> {
    return await UserModel.findById(id);
  }

  @Mutation(() => User)
  async addUser(@Arg('newUserData') newUserData: NewUserInput): Promise<User> {
    const newUser = new UserModel(newUserData);
    await newUser.save();
    return newUser;
  }

  @Mutation(() => User)
  async login(
    @Arg('loginData', { validate: false }) loginData: LoginInput
  ): Promise<User> {
    const user = await UserModel.find({ email: loginData.email });
    if (!user[0]) {
      throw new Error('user not found');
    }
    const comparePwd = await bcrypt.compare(
      loginData.password,
      user[0].password
    );
    if (!comparePwd) {
      throw new Error('uername or password does not match');
    }
    return user[0];
  }
}
