import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { MyContext } from "../../types/MyContext";

@Resolver()
export class taskResolver {
  @Authorized()
  @Query(() => User)
  async ajay(@Ctx() { req }: MyContext) {
    const user = await User.findOne((req.user as any).id);
    return user;
  }
}
