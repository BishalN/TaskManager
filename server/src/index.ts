import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ArgumentValidationError, buildSchema } from "type-graphql";
import jwt from "express-jwt";

import { createTypeormConnection } from "./utils/createTypeormConnection";
import { helloResolver } from "./modules/me/resolver";
import { registerResolver } from "./modules/user/registerResolver";
import { isAuthenticated } from "./utils/isAuthenticated";
import { taskResolver } from "./modules/task/resolver";

const main = async () => {
  const path = "/graphql";
  await createTypeormConnection();
  const app = express();

  // Mount a jwt or other authentication middleware that is run before the GraphQL execution
  //decodes the user from authorization headers and sets the property req.user on them
  app.use(
    path,
    jwt({
      secret: "myawesomesecret",
      algorithms: ["HS256"],
      credentialsRequired: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [helloResolver, registerResolver, taskResolver],
      authChecker: isAuthenticated,
    }),
    context: ({ req, res }: any) => ({
      req,
      res,
    }),
    introspection: true,
  });

  apolloServer.applyMiddleware({
    path,
    app,
    cors: false,
  });

  app.listen(process.env.PORT || 4000, () => {
    console.log("timeXoneSyncer running on port 4000 !!");
  });
};

main();
