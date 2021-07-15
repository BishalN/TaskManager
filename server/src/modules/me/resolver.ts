import { Ctx, Query, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { MyContext } from "../../types/MyContext";

@Resolver()
export class helloResolver {
  @Query(() => User)
  async me(@Ctx() { req }: MyContext) {
    const user = await User.findOne((req.user as any).id);
    return user;
  }
}