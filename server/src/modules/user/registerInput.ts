import { IsEmail, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { IsEmailAlreadyExist } from './isEmailAlreadyExist';

@InputType()
export class registerInput {
  @Field()
  @MinLength(3)
  username: string;

  @Field()
  @IsEmail()
  // @IsEmailAlreadyExist({ message: "Email already in use" })
  email: string;

  @Field()
  @MinLength(6)
  password: string;
}
