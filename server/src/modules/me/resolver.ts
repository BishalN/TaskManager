import { Authorized, Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../../entity/User";
import { MyContext } from "../../types/MyContext";
import { isAuth } from "../../utils/isAuth";

@Resolver()
export class helloResolver {
  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async me(@Ctx() { payload }: MyContext) {
    const userId = payload.userId;
    const user = await User.findOne(userId);
    return user;
  }

  @Query(() => String)
  hello() {
    return "hello world";
  }
}
