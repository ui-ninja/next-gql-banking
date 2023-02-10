import { Length, MaxLength } from "class-validator";
import { Field, ObjectType, ID, InputType } from "type-graphql";

@ObjectType()
export class User {
  @Field(() => ID)
  id?: string;

  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field()
  phone!: number;

  @Field({ nullable: true })
  residence?: string;

  @Field({ nullable: true })
  occupation?: string;

  @Field({ nullable: true })
  income!: number;

  @Field()
  govtId!: string;
}

@InputType()
export class NewUserInput {
  @Field()
  @MaxLength(30)
  name!: string;

  @Field()
  @Length(5, 255)
  email!: string;

  @Field()
  phone!: number;

  @Field({ nullable: true })
  residence?: string;

  @Field({ nullable: true })
  occupation?: string;

  @Field()
  income!: number;

  @Field()
  govtId!: string;

  @Field()
  password!: string;
}
