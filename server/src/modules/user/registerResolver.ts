import bcrypt from "bcryptjs";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { registerInput } from "./registerInput";
import { loginOutput } from "./loginOutput";
import { generateAccessToken, generateRefreshToken } from "./generateToken";
import { MyContext } from "../../types/MyContext";

@Resolver()
export class registerResolver {
  @Mutation(() => User)
  async register(
    @Arg("input") { username, email, password }: registerInput
  ): Promise<User> {
    const userAlreadyExists = await User.findOne({ where: { email } });
    if (userAlreadyExists)
      throw new Error("user with that email already exists");

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = User.create({ username, email, password: hashedPassword });
    await user.save();
    return user;
  }

  @Mutation(() => loginOutput)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext
  ): Promise<loginOutput> {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) throw new Error("Invalid credentials");

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) throw new Error("Invalid credentials");

      // set the refresh token to the cookie of the browser

      res.cookie("jid", generateRefreshToken(user.id), { httpOnly: true });

      const token = generateAccessToken(user.id);

      const outputUser = { ...user, token };

      return outputUser;
    } catch (error) {
      throw new Error(error);
    }
  }
}
