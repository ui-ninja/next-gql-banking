import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  Grid,
  Icon,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { GetServerSidePropsContext } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { dehydrate, useQuery } from 'react-query';
import { getAccountByUserId, queryClient } from '../../src/api';
import Link from '../../src/components/atoms/Link';
import { H1, H3, H4 } from '../../src/components/atoms/typography';
import AccountCard from '../../src/components/molecules/AccountCard';
import AddNewAccount from '../../src/components/molecules/AddNewAccoutCard';
import PaymentCard from '../../src/components/molecules/PaymentCard';
import Routes from '../../src/constants/routes';
import { Account } from '../../src/generated/graphql';
import { authOptions } from '../api/auth/[...nextauth]';

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

export default function Dashboard({ userId }: { userId: string }) {
  const { data, isLoading } = useQuery(['account'], () =>
    getAccountByUserId({ userId })
  );

  if (isLoading) {
    return (
      <H4>
        <Spinner /> Fetching your accounts..
      </H4>
    );
  }

  if (!data) {
    return (
      <>
        <H1>Welcome to NextGen banking!</H1>
        <Alert status="info">
          <AlertIcon />
          <AlertDescription>
            It seems you do not have an account with us at the moment, you can
            open a Savings or credit account with us by{' '}
            <Link href={Routes.OPEN_NEW_ACCOUNT}>clicking here</Link>.
          </AlertDescription>
        </Alert>
      </>
    );
  }

  const dataSet = data?.account.reduce(
    (acc, cv) => {
      if (acc.hasOwnProperty('cards')) {
        acc['cards'].push(cv.card);
      } else {
        acc['cards'] = [cv.card];
      }

      acc['user'] = cv.user;

      return acc;
    },
    { cards: [] as Account['card'][], user: {} as Account['user'] }
  );

  return (
    <>
      <H1>Welcome to NextGen banking!</H1>
      <Box>
        <Grid templateColumns="repeat(auto-fit, min(340px))" gap={6}>
          {data?.account.map((item) => {
            return (
              <AccountCard
                key={item.accountNumber}
                id={item.id}
                type={item.type}
                category={item.category}
                userName={dataSet?.user.name || ''}
              />
            );
          })}
        </Grid>
      </Box>

      {dataSet?.cards.length && (
        <Box mt={10}>
          <H3>Your Cards:</H3>
          <Grid templateColumns="repeat(auto-fit, min(335px))" gap={6}>
            {dataSet?.cards.map((item) => {
              return (
                <PaymentCard
                  key={item.cardNumber}
                  {...item}
                  userName={dataSet.user.name}
                />
              );
            })}
          </Grid>
        </Box>
      )}
    </>
  );
}
