import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

import { UserResolver } from "../../src/schema/user/user.resolver";
import { AccountResolver } from "../../src/schema/account/account.resolver";
import { connectDb } from "../../src/db/config/connectDb";
import { TransactionsResolver } from "../../src/schema/transaction/transactions.resolver";

connectDb();

const schema = await buildSchema({
  resolvers: [AccountResolver, UserResolver, TransactionsResolver],
});

const server = new ApolloServer({
  schema,
});

export default startServerAndCreateNextHandler(server);
