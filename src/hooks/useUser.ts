import { useQuery } from 'react-query';
import { getUser } from '../api';

export default function useUser(emailAddress: string) {
  const { data, isLoading, isError, error, refetch } = useQuery(['user'], () =>
    getUser({ emailAddress })
  );

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  };
}
