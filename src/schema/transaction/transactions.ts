import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Transaction {
  @Field(() => ID)
  id!: number;

  @Field()
  accountId!: string;

  @Field()
  createdAt!: string;

  @Field()
  type!: string; // DEBIT or CREDIT

  @Field()
  amount!: number;
}

@ObjectType()
export class Edge {
  @Field()
  cursor!: number;

  @Field()
  node!: Transaction;
}

@ObjectType()
export class PageInfo {
  @Field()
  hasNextPage!: boolean;

  @Field()
  endCursor!: number;
}

@ObjectType()
export class Transactions {
  @Field()
  pageInfo!: PageInfo;

  @Field(() => [Edge], { defaultValue: [] })
  edges!: Edge[];
}
