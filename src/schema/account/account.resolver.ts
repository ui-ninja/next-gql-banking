import mongoose, { PopulatedDoc, Document } from 'mongoose';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import AccountModel from '../../db/models/AccountModel';
import { User } from '../user/user';
import { Account, NewAccountInput } from './account';

@Resolver(Account)
export class AccountResolver {
  @Query(() => Account)
  async account(@Arg('id') id: number): Promise<Account> {
    try {
      const foundAccountDetails: PopulatedDoc<User & Document> =
        await AccountModel.findOne({
          accountId: id,
        })
          .populate('user')
          .orFail()
          .exec();

      if (!foundAccountDetails) {
        throw new Error('No account details found');
      }

      return foundAccountDetails;
    } catch (error: any) {
      throw new Error('Error while fetching account details', error);
    }
  }

  @Mutation(() => Number)
  async addAccount(
    @Arg('newAccountData', { validate: false }) newAccountData: NewAccountInput
  ): Promise<number | undefined> {
    try {
      const generatedAccountId = Math.floor(Math.random() * 1000000000);
      const newAccount = new AccountModel({
        accountId: generatedAccountId,
        category: newAccountData.category,
        user: new mongoose.Types.ObjectId(newAccountData.userId),
      });

      await newAccount.save();

      return generatedAccountId;
    } catch (error) {
      console.log('error', error);
    }
  }
}
