import mongoose, { PopulatedDoc, Document } from "mongoose";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import AccountModel from "../../db/models/AccountModel";
import CardModel from "../../db/models/CardModel";
import { ACCOUNT_TYPE } from "../../types";
import { User } from "../user/user";
import { Account, NewAccountInput } from "./account";

@Resolver(Account)
export class AccountResolver {
  @Query(() => [Account])
  async account(@Arg("userId") userId: string): Promise<Account[]> {
    try {
      const foundAccountDetails: PopulatedDoc<User & Document> =
        await AccountModel.find({
          user: userId,
        })
          .populate("user")
          .populate("card")
          .orFail()
          .exec();

      if (!foundAccountDetails.length) {
        throw new Error("No account details found for given user id.");
      }

      return foundAccountDetails;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  @Mutation(() => String)
  async addAccount(
    @Arg("newAccountData", { validate: false }) newAccountData: NewAccountInput
  ): Promise<string | null> {
    try {
      // generate unique 10 digits account number.
      // will be replaced with a better generator in real app.
      const generatedAccountNumber =
        Math.floor(Math.random() * 9000000000) + 1000000000;

      // create new card depending on account type
      const generatedCardNumber = +`401288888888${
        Math.floor(Math.random() * 9000) + 1000
      }`;

      const newCard = new CardModel({
        _id: new mongoose.Types.ObjectId(),
        cardNumber: generatedCardNumber,
        cardType:
          newAccountData.type === ACCOUNT_TYPE.SAVINGS
            ? "DEBIT_CARD"
            : "CREDIT_CARD",
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
        // eslint-disable-next-line no-underscore-dangle
        card: newCard._id,
      });

      await newCard.save();
      await newAccount.save();

      // eslint-disable-next-line no-underscore-dangle
      return newAccount._id;
    } catch (error) {
      console.log("error", error);
      return null;
    }
  }
}
