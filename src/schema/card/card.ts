import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Card {
  @Field(() => ID)
  id?: string;

  @Field()
  cardNumber!: number;

  @Field()
  cardType!: string;

  @Field()
  expiryMonth!: number;

  @Field()
  expiryYear!: number;
}
