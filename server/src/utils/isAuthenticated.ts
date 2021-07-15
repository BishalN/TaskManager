import { AuthChecker } from "type-graphql";
import { User } from "../entity/User";
import { MyContext } from "../types/MyContext";

export const isAuthenticated: AuthChecker<MyContext> = async ({
  root,
  args,
  context,
  info,
}) => {
  const id = (context.req.user as any).id;
  const user = await User.findOne(id);

  if (user) {
    //the user is authenticated
    return true;
  }

  //User is not authenticated
  return false;
};
