import { GetServerSidePropsContext } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { dehydrate } from 'react-query';

import { authOptions } from '../api/auth/[...nextauth]';

import { getAccountByUserId, queryClient } from '../../src/api';

import useAccount from '../../src/hooks/useAccount';
import Dashboard from '../../src/components/organisms/Dashboard';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // get user id from session
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  const userId = session?.user.userId;

  if (userId) {
    await queryClient.prefetchQuery('account', () =>
      getAccountByUserId({ userId })
    );
  }

  return {
    props: {
      userId: userId || null,
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function DashboardContainer({ userId }: { userId: string }) {
  const { data, isLoading } = useAccount(userId);
  return <Dashboard data={data} isLoading={isLoading} />;
}
