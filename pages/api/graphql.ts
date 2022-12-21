import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-micro';
import {
  ApolloServerPluginLandingPageProductionDefault,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import { buildSchema } from 'type-graphql';

import { UserResolver } from '../../src/schema/user/user.resolver';
import { AccountResolver } from '../../src/schema/account/account.resolver';
import { connectDb } from '../../src/db/config/connectDb';

connectDb();

const schema = await buildSchema({
  resolvers: [AccountResolver, UserResolver],
});

const server = new ApolloServer({
  schema,
  plugins: [
    process.env.NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageProductionDefault({
          embed: true,
          graphRef: '',
        })
      : ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const startServer = server.start();

export default async function handler(req: any, res: any) {
  await startServer;
  await server.createHandler({
    path: '/api/graphql',
  })(req, res);
}
