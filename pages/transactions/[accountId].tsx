import { GetServerSideProps } from 'next';
import { dehydrate, useQuery } from 'react-query';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Center,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { queryClient, transactions } from '../../src/api';

import { H1, H4 } from '../../src/components/atoms/typography';
import Button from '../../src/components/atoms/Button';
import { useState } from 'react';

const PAGE_SIZE = 10;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.query?.accountId) {
    return {
      props: {
        data: '',
      },
    };
  }

  await queryClient.prefetchQuery('transactions', () =>
    transactions({
      accountId: context.query.accountId as string,
      after: '',
      before: '',
      first: PAGE_SIZE,
    })
  );

  return {
    props: {
      accountId: context.query?.accountId,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

function Transactions({ accountId }: { accountId: string }) {
  const [state, setState] = useState({
    nextCursor: '',
    previousCursor: '',
    activePageNumber: 1,
  });

  const { nextCursor, activePageNumber, previousCursor } = state;

  const { data, isLoading, isError } = useQuery(
    ['transactions', nextCursor, previousCursor],
    () => {
      return transactions({
        accountId,
        after: nextCursor,
        before: previousCursor,
        first: PAGE_SIZE,
      });
    },
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) {
    return <H1>Loading results...</H1>;
  }

  if (isError || !data?.transactions) {
    return <H1>Error while fetching transactions, please try again.</H1>;
  }

  const {
    transactions: {
      pageInfo: { endCursor, hasNextPage },
      edges,
    },
  } = data;

  const handleNextPage = () => {
    setState((prevState) => ({
      activePageNumber: prevState.activePageNumber + 1,
      nextCursor: endCursor,
      previousCursor: '',
    }));
  };

  const handlePreviousPage = () => {
    setState((prevState) => ({
      activePageNumber: prevState.activePageNumber - 1,
      nextCursor: '',
      previousCursor: edges[0].cursor,
    }));
  };

  return (
    <Box>
      <Alert status="info">
        <AlertIcon />
        <AlertTitle>This page uses dummy data!</AlertTitle>
        <AlertDescription>
          Even though this page accepts <code>accountId</code>, it does not
          filter based on <code>accountId</code> due to lack of data points.
          But, this page follow cursor based pagination as per{' '}
          <code>Relay</code> specifications.
        </AlertDescription>
      </Alert>
      <H1>Transactions</H1>
      <TableContainer>
        <Table variant="striped" colorScheme="gray">
          <TableCaption>Transaction data (10 per page)</TableCaption>
          <Thead>
            <Tr>
              <Th>S.no.</Th>
              <Th>Id</Th>
              <Th>Transaction done on</Th>
              <Th>Type</Th>
              <Th>Amount</Th>
            </Tr>
          </Thead>
          <Tbody>
            {edges.map(({ node: { id, createdAt, type, amount, rowNo } }) => (
              <Tr key={id}>
                <Td>{rowNo}</Td>
                <Td>{id}</Td>
                <Td>{new Date(createdAt).toLocaleString()}</Td>
                <Td>{type}</Td>
                <Td>{amount}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Center>
        <Button
          variant="primary"
          disabled={activePageNumber === 1}
          onClick={handlePreviousPage}
        >
          Prev.
        </Button>
        <H4 mx={5}>Page {activePageNumber}</H4>
        <Button
          variant="primary"
          disabled={!hasNextPage}
          onClick={handleNextPage}
        >
          Next
        </Button>
      </Center>
    </Box>
  );
}

export default Transactions;
