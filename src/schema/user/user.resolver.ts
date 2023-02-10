import { Resolver, Query, Arg, Mutation } from "type-graphql";

import { NewUserInput, User } from "./user";

import UserModel from "../../db/models/UserModel";

@Resolver(User)
export class UserResolver {
  @Query(() => User)
  // gives one user
  async user(@Arg("emailAddress") emailAddress: string): Promise<User | null> {
    return UserModel.findOne({ email: emailAddress });
  }

  @Mutation(() => User)
  async addUser(@Arg("newUserData") newUserData: NewUserInput): Promise<User> {
    const newUser = new UserModel(newUserData);
    await newUser.save();
    return newUser;
  }
}
