import bcrypt from "bcryptjs";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { registerInput } from "./registerInput";
import { loginOutput } from "./loginOutput";
import { generateToken } from "./generateToken";

@Resolver()
export class registerResolver {
  @Mutation(() => User)
  async register(
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

  @Mutation(() => loginOutput)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<loginOutput | Error> {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) throw new Error("user with that email does not exists");

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) throw new Error("password does not match");

      const token = generateToken(user.id);

      const outputUser = { ...user, token };

      return outputUser;
    } catch (error) {
      throw new Error(error);
    }
  }
}
