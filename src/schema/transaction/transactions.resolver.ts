import { Arg, Query, Resolver } from 'type-graphql';
import { Transactions } from './transactions';
import dummyTransactionData from './dummyData.json';

@Resolver(Transactions)
export class TransactionsResolver {
  @Query(() => Transactions)
  async transactions(
    @Arg('accountId') accountId: string,
    @Arg('first') first: number,
    @Arg('after') after: number
  ): Promise<Transactions> {
    let results = null;

    // for edges

    // when cursor viz. after is in request
    if (after) {
      // find index of cursor and send next (first) items
      const cursorItem = dummyTransactionData.findIndex(
        (item) => item.id === after
      );
      // slice next first items from cursor
      // this usually is taken care by database.
      results = dummyTransactionData.slice(
        cursorItem + 1, // adding 1 as array index starts from 0
        cursorItem + 1 + first
      );
    } else {
      // no cursor in request
      results = dummyTransactionData.slice(0, first);
    }

    // for page info object

    if (results.length > 0) {
      const lastResultsItem = results[results.length - 1];
      // this will be the new cursor
      const endCursor = lastResultsItem.id;

      // this helps to determine if we have nextPage
      const secondQueryResult = dummyTransactionData.slice(endCursor, first);

      return {
        pageInfo: {
          endCursor,
          hasNextPage: secondQueryResult.length >= first,
        },
        edges: results.map((item) => ({
          cursor: item.id,
          node: item,
        })),
      };
    } else {
      return {
        edges: [],
        pageInfo: {
          endCursor: 0,
          hasNextPage: false,
        },
      };
    }
  }
}
