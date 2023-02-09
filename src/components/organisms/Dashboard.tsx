import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Grid,
  Spinner,
} from '@chakra-ui/react';

import { Account, GetAccountByUserIdQuery } from '../../generated/graphql';

import Link from '../atoms/Link';
import { H1, H3, H4 } from '../atoms/typography';
import AccountCard from '../molecules/AccountCard';
import PaymentCard from '../molecules/PaymentCard';

import Routes from '../../constants/Routes';
import DashboardConstants from '../../constants/DashboardConstants';

type Props = {
  isLoading: boolean;
  data: GetAccountByUserIdQuery | undefined | null;
};

export default function Dashboard({ isLoading, data }: Props) {
  if (isLoading) {
    return (
      <H4>
        <Spinner /> {DashboardConstants.FETCHING_ACCOUNTS}
      </H4>
    );
  }

  if (!data) {
    return (
      <>
        <H1>{DashboardConstants.PAGE_HEADING}</H1>
        <Alert status="info">
          <AlertIcon />
          <AlertDescription>
            {DashboardConstants.NO_ACCOUNT_ALERT_DESC}
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
      <H1>{DashboardConstants.PAGE_HEADING}</H1>
      <Box>
        <Grid as="ul" templateColumns="repeat(auto-fit, min(340px))" gap={6}>
          {data?.account.map((item) => {
            return (
              <Box
                as="li"
                key={item.accountNumber}
                listStyleType="none"
                data-testid="account_list_item"
              >
                <AccountCard
                  id={item.id}
                  type={item.type}
                  category={item.category}
                  userName={dataSet?.user.name || ''}
                />
              </Box>
            );
          })}
        </Grid>
      </Box>

      {dataSet?.cards.length && (
        <Box mt={10}>
          <H3>{DashboardConstants.YOUR_CARDS}</H3>
          <Grid templateColumns="repeat(auto-fit, min(335px))" gap={6} as="ul">
            {dataSet?.cards.map((item) => {
              return (
                <Box
                  as="li"
                  key={item.cardNumber}
                  listStyleType="none"
                  data-testid="card_list_item"
                >
                  <PaymentCard {...item} userName={dataSet.user.name} />
                </Box>
              );
            })}
          </Grid>
        </Box>
      )}
    </>
  );
}
