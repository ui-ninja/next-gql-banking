import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Transaction {
  @Field(() => ID)
  id!: string;

  @Field()
  accountId!: string;

  @Field()
  createdAt!: string;

  @Field()
  type!: string; // DEBIT or CREDIT

  @Field()
  amount!: number;

  @Field()
  rowNo!: number;
}

@ObjectType()
export class Edge {
  @Field()
  cursor!: string;

  @Field()
  node!: Transaction;
}

@ObjectType()
export class PageInfo {
  @Field()
  hasNextPage!: boolean;

  @Field()
  endCursor!: string;
}

@ObjectType()
export class Transactions {
  @Field()
  pageInfo!: PageInfo;

  @Field(() => [Edge])
  edges!: Edge[];
}
