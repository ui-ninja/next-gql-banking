import { GraphQLClient } from 'graphql-request';
import { QueryClient } from 'react-query';

import { getSdk } from './generated/graphql';

const gqlClient = new GraphQLClient(
  process.env.GRAPHQL_ENDPOINT || 'http://localhost:3000/qpi/graphql'
);

export const { getUser, getAccountById, addUser, addAccount } =
  getSdk(gqlClient);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});
