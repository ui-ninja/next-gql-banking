import { useQuery } from 'react-query';
import { transactions } from '../api';

export default function useTransactions(
  accountId: string,
  nextCursor: string,
  previousCursor: string,
  pageSize: number
) {
  const { data, isLoading, isError, error, refetch } = useQuery(
    ['transactions', nextCursor, previousCursor],
    () => {
      return transactions({
        accountId,
        after: nextCursor,
        before: previousCursor,
        first: pageSize,
      });
    },
    {
      keepPreviousData: true,
    }
  );

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  };
}
