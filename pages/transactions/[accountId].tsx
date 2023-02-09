import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { dehydrate } from 'react-query';
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

import useTransactions from '../../src/hooks/useTransactions';

import { queryClient, transactions } from '../../src/api';

import { H1, H4 } from '../../src/components/atoms/typography';
import Button from '../../src/components/atoms/Button';
import transactionConstants from '../../src/constants/TransactionConstants';
import CommonConstants from '../../src/constants/CommonConstants';

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

function Transactions({
  accountId,
  pageSize = PAGE_SIZE,
}: {
  accountId: string;
  pageSize?: number;
}) {
  const [state, setState] = useState({
    nextCursor: '',
    previousCursor: '',
    activePageNumber: 1,
  });

  const { nextCursor, activePageNumber, previousCursor } = state;

  const { data, isLoading, isError } = useTransactions(
    accountId,
    nextCursor,
    previousCursor,
    pageSize
  );

  if (isLoading) {
    return (
      <H1>
        <Spinner mr={5} />
        {transactionConstants.LOADING_RESULTS}
      </H1>
    );
  }

  if (isError || !data?.transactions) {
    return <H1>{transactionConstants.ERROR_WHILE_FETCHING}</H1>;
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

  const isPreviousBtnDisabled = activePageNumber === 1;
  const isNextbtnDisabled = !hasNextPage;

  return (
    <Box>
      <Alert status="info">
        <AlertIcon />
        <AlertTitle>{transactionConstants.DUMMY_DATA_ALERT_TITLE}</AlertTitle>
        <AlertDescription>
          {transactionConstants.DUMMY_DATA_ALERT_DESCRIPTION}
        </AlertDescription>
      </Alert>
      <H1>{transactionConstants.PAGE_HEADING}</H1>
      <TableContainer>
        <Table variant="striped" colorScheme="gray">
          <TableCaption>Transactions data ({pageSize} per page)</TableCaption>
          <Thead>
            <Tr>
              {transactionConstants.TRANSACTIONS_TABLE_COLUMNS.map((col) => (
                <Th key={col}>{col}</Th>
              ))}
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
          isDisabled={isPreviousBtnDisabled}
          onClick={handlePreviousPage}
        >
          {CommonConstants.PREVIOUS}
        </Button>
        <H4 mx={5}>Page {activePageNumber}</H4>
        <Button
          variant="primary"
          isDisabled={isNextbtnDisabled}
          onClick={handleNextPage}
        >
          {CommonConstants.NEXT}
        </Button>
      </Center>
    </Box>
  );
}

export default Transactions;
