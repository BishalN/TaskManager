import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { createTypeormConnection } from './utils/createTypeormConnection';
import { helloResolver } from './modules/me/resolver';
import { registerResolver } from './modules/user/registerResolver';
import { isAuthenticated } from './utils/isAuthenticated';
import { taskResolver } from './modules/task/resolver';
import { User } from './entity/User';
import { verify } from 'jsonwebtoken';
import {
  generateAccessToken,
  generateRefreshToken,
} from './modules/user/generateToken';

const main = async () => {
  const path = '/graphql';
  await createTypeormConnection();
  const app = express();

  app.use(cookieParser());

  app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

  app.post('/refresh_token', async (req, res) => {
    const token = req.cookies.jid;
    if (!token) {
      return res.send({ ok: false, accessToken: '' });
    }

    let payload: any = null;
    try {
      payload = verify(token, 'myawesomesecretadkjsahdjk');
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: '' });
    }

    // token is valid and
    // we can send back an access token
    const user = await User.findOne({ id: payload.userId });

    if (!user) {
      return res.send({ ok: false, accessToken: '' });
    }

    // if (user.tokenVersion !== payload.tokenVersion) {
    //   return res.send({ ok: false, accessToken: "" });
    // }

    res.cookie('jid', generateRefreshToken(user.id), {
      httpOnly: true,
      path: '/refresh_token',
    });

    return res.send({ ok: true, accessToken: generateAccessToken(user.id) });
  });

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
    playground: true,
  });

  apolloServer.applyMiddleware({
    path,
    app,
    cors: false,
  });

  app.listen(process.env.PORT || 4000, () => {
    console.log('timeXoneSyncer running on port 4000 !!');
  });
};

main();
