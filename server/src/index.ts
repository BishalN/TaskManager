import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ArgumentValidationError, buildSchema } from "type-graphql";

import { createTypeormConnection } from "./utils/createTypeormConnection";
import { helloResolver } from "./modules/me/resolver";
import { registerResolver } from "./modules/user/registerResolver";

const main = async () => {
  await createTypeormConnection();
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [helloResolver, registerResolver],
    }),
    context: ({ req, res }: any) => ({
      req,
      res,
    }),
    introspection: true,
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(process.env.PORT || 4000, () => {
    console.log("timeXoneSyncer running on port 4000 !!");
  });
};

main();
