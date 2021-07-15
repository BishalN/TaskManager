import bcrypt from "bcryptjs";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { MyContext } from "../../types/MyContext";
import { registerInput } from "./registerInput";

@Resolver()
export class registerResolver {
  @Mutation(() => User)
  async registerUser(
    @Ctx() { req, res }: MyContext,
    @Arg("input") { username, email, password }: registerInput
  ): Promise<User | Error> {
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = User.create({ username, email, password: hashedPassword });
      await user.save();
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}
