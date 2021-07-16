import { Ctx, Query, Resolver } from 'type-graphql';
import { User } from '../../entity/User';
import { MyContext } from '../../types/MyContext';
import { currentlyLoggedInUserId } from '../../utils/currentlyLoggedUserId';

@Resolver()
export class helloResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    const user = await User.findOne(currentlyLoggedInUserId(req));
    return user;
  }
}
