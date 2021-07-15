import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class loginOutput {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  token: string;
}
