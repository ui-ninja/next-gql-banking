import { useQuery } from 'react-query';
import { getAccountByUserId } from '../api';

export default function useAccount(userId: string) {
  const { data, isLoading, isError, error, refetch } = useQuery(
    ['account'],
    () => getAccountByUserId({ userId })
  );

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  };
}
