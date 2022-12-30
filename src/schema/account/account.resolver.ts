import mongoose, { PopulatedDoc, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import AccountModel from '../../db/models/AccountModel';
import CardModel from '../../db/models/CardModel';
import { ACCOUNT_TYPE } from '../../types';
import { User } from '../user/user';
import { Account, NewAccountInput } from './account';

@Resolver(Account)
export class AccountResolver {
  @Query(() => [Account])
  async account(@Arg('userId') userId: string): Promise<Account[]> {
    try {
      const foundAccountDetails: PopulatedDoc<User & Document> =
        await AccountModel.find({
          user: userId,
        })
          .populate('user')
          .populate('card')
          .orFail()
          .exec();

      console.log('foundAccountDetails', foundAccountDetails);

      if (!foundAccountDetails.length) {
        throw new Error('No account details found');
      }

      return foundAccountDetails;
    } catch (error: any) {
      throw new Error('Error while fetching account details', error);
    }
  }

  @Mutation(() => String)
  async addAccount(
    @Arg('newAccountData', { validate: false }) newAccountData: NewAccountInput
  ): Promise<String | undefined> {
    try {
      // generate unique 10 digits account number.
      // will be replaced with a better generator in real app.
      const generatedAccountNumber =
        Math.floor(Math.random() * 9000000000) + 1000000000;

      // create new card depending on account type
      let generatedCardNumber = +`401288888888${
        Math.floor(Math.random() * 9000) + 1000
      }`;

      const newCard = new CardModel({
        _id: new mongoose.Types.ObjectId(),
        cardNumber: generatedCardNumber,
        cardType:
          newAccountData.type === ACCOUNT_TYPE.SAVINGS
            ? 'DEBIT_CARD'
            : 'CREDIT_CARD',
        expiryMonth: 11,
        expiryYear: new Date(
          new Date().setFullYear(new Date().getFullYear() + 10)
        ).getFullYear(),
        cvv: Math.floor(Math.random() * 900) + 100,
      });

      const newAccount = new AccountModel({
        accountNumber: generatedAccountNumber,
        user: newAccountData.userId,
        type: newAccountData.type,
        category: newAccountData.category,
        card: newCard._id,
      });

      await newCard.save();
      await newAccount.save();

      return newAccount._id;
    } catch (error) {
      console.log('error', error);
    }
  }
}
