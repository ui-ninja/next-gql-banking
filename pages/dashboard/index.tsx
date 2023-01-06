import { Box, Flex, Grid, Icon, Spinner, Text } from '@chakra-ui/react';
import { GetServerSidePropsContext } from 'next';
import { unstable_getServerSession } from 'next-auth';
import Link from 'next/link';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { dehydrate, useQuery } from 'react-query';
import { getAccountByUserId, queryClient } from '../../src/api';
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
  const { data, isFetching, isError, error } = useQuery(['account'], () =>
    getAccountByUserId({ userId })
  );

  if (isError) {
    return <H4>No account created yet, please add a new account.</H4>;
  }

  if (isFetching) {
    return (
      <H4>
        <Spinner /> Fetching your data..
      </H4>
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
      <H1>Dashboard</H1>
      <Box>
        <Grid
          gridGap={'10px'}
          gridAutoFlow="column"
          overflowX="scroll"
          scrollSnapType={'x proximity'}
        >
          <AddNewAccount />
          {data?.account.map((item) => {
            return (
              <AccountCard
                key={item.accountNumber}
                id={item.id}
                type={item.type}
                category={item.category}
              />
            );
          })}
        </Grid>
      </Box>

      {dataSet?.cards.length && (
        <Box mt={10}>
          <H3>Your Cards:</H3>
          <Grid
            gridGap={'10px'}
            gridAutoFlow="column"
            overflowX="scroll"
            scrollSnapType={'x proximity'}
          >
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
