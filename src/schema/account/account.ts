import { Field, ObjectType, InputType, ID } from "type-graphql";
import { Card } from "../card/card";
import { User } from "../user/user";

@ObjectType()
export class Account {
  @Field(() => ID)
  id?: string;

  @Field()
  accountNumber!: number;

  @Field()
  user!: User;

  @Field()
  type!: string;

  @Field()
  category!: string;

  @Field()
  card!: Card;
}

@InputType()
export class NewAccountInput {
  @Field()
  userId!: string;

  @Field()
  type!: string;

  @Field()
  category!: string;
}
