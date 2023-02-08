import { useQuery } from 'react-query';
import { getUser } from '../api';

export default function useUser(emailAddress: string) {
  const { data, isFetching, isError, error, refetch } = useQuery(['user'], () =>
    getUser({ emailAddress })
  );

  return {
    data,
    isFetching,
    isError,
    error,
    refetch,
  };
}
