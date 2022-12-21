import { Field, ObjectType, InputType } from 'type-graphql';
import { User } from '../user/user';

@ObjectType()
export class Account {
  @Field()
  accountId!: number;

  @Field()
  user!: User;

  @Field()
  category!: string;
}

@InputType()
export class NewAccountInput {
  @Field()
  userId!: string;

  @Field()
  category!: string;
}
