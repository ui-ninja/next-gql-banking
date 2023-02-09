import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Transactions from '../../pages/transactions/[accountId]';

const dummyTransactions = {
  transactions: {
    edges: [
      {
        cursor: '63b84ad9fc13ae2b950000b4',
        node: {
          id: '63b84ad9fc13ae2b950000b4',
          type: 'credit',
          createdAt: '2021-02-21T00:05:34Z',
          amount: 80894.47,
          accountId: '0af25fe0-48a7-4bfe-a556-8a793255ef70',
          rowNo: 1,
        },
      },
      {
        cursor: '63b84ad9fc13ae2b950000b5',
        node: {
          id: '63b84ad9fc13ae2b950000b5',
          type: 'credit',
          createdAt: '2019-04-21T09:09:46Z',
          amount: 39227.57,
          accountId: '4ec8c52c-2a36-4bf2-9021-14697a439f60',
          rowNo: 2,
        },
      },
      {
        cursor: '63b84ad9fc13ae2b950000b6',
        node: {
          id: '63b84ad9fc13ae2b950000b6',
          type: 'credit',
          createdAt: '2021-02-06T13:04:12Z',
          amount: 86036.65,
          accountId: '8399c3e2-d73f-4478-99ef-3ac7f7aa1380',
          rowNo: 3,
        },
      },
      {
        cursor: '63b84ad9fc13ae2b950000b7',
        node: {
          id: '63b84ad9fc13ae2b950000b7',
          type: 'credit',
          createdAt: '2021-02-15T05:17:32Z',
          amount: 7464.81,
          accountId: 'dc87cdd5-d8c8-4337-9269-027b1ffcb77a',
          rowNo: 4,
        },
      },
      {
        cursor: '63b84ad9fc13ae2b950000b8',
        node: {
          id: '63b84ad9fc13ae2b950000b8',
          type: 'credit',
          createdAt: '2019-09-06T06:20:27Z',
          amount: 7113.16,
          accountId: 'f9669e5e-92a2-49b0-beeb-37915b32c7a8',
          rowNo: 5,
        },
      },
      {
        cursor: '63b84ad9fc13ae2b950000b9',
        node: {
          id: '63b84ad9fc13ae2b950000b9',
          type: 'credit',
          createdAt: '2019-10-09T17:12:04Z',
          amount: 12840.67,
          accountId: '2a35b454-ab9f-4bba-bb52-d38d8d24cff0',
          rowNo: 6,
        },
      },
      {
        cursor: '63b84ad9fc13ae2b950000ba',
        node: {
          id: '63b84ad9fc13ae2b950000ba',
          type: 'debit',
          createdAt: '2023-08-24T02:19:50Z',
          amount: 18654.31,
          accountId: 'f66cdf81-1d87-4529-9916-2d17bdacd859',
          rowNo: 7,
        },
      },
      {
        cursor: '63b84ad9fc13ae2b950000bb',
        node: {
          id: '63b84ad9fc13ae2b950000bb',
          type: 'debit',
          createdAt: '2023-07-17T18:31:06Z',
          amount: 14473.13,
          accountId: '6931cd1a-8514-485d-b1ec-44760c02a511',
          rowNo: 8,
        },
      },
      {
        cursor: '63b84ad9fc13ae2b950000bc',
        node: {
          id: '63b84ad9fc13ae2b950000bc',
          type: 'debit',
          createdAt: '2019-01-24T12:20:04Z',
          amount: 96879.76,
          accountId: '1581d7cc-298b-4c25-9dc2-40f23feb843b',
          rowNo: 9,
        },
      },
      {
        cursor: '63b84ad9fc13ae2b950000bd',
        node: {
          id: '63b84ad9fc13ae2b950000bd',
          type: 'debit',
          createdAt: '2021-11-11T01:04:40Z',
          amount: 66933.96,
          accountId: '78e39a2e-8568-46df-98aa-35d98d3fe76a',
          rowNo: 10,
        },
      },
    ],
    pageInfo: {
      endCursor: '63b84ad9fc13ae2b950000bd',
      hasNextPage: true,
    },
  },
};

let isError = false;
let isLoading = false;

jest.mock('../../src/hooks/useTransactions', () => ({
  __esModule: true,
  default: () => ({
    data: dummyTransactions,
    isLoading,
    isError,
  }),
}));

const setup = () => {
  const utils = render(
    <Transactions accountId="dummy_acount_id" pageSize={5} />
  );

  return {
    ...utils,
  };
};

describe('Transaction testing suite', () => {
  it('render without crashing', () => {
    const { asFragment, getByText, getByRole } = setup();

    expect(asFragment()).toMatchSnapshot();
    expect(getByText(/Page 1/i)).toBeInTheDocument();

    const pageHeading = getByText('List of transactions');
    expect(pageHeading).toBeInTheDocument();

    const previousBtn = getByRole('button', {
      name: 'Previous',
    });
    expect(previousBtn).toBeInTheDocument();
    expect(previousBtn).toBeDisabled();

    const nextBtn = getByRole('button', {
      name: 'Next',
    });
    expect(nextBtn).toBeInTheDocument();

    // click on next btn
    fireEvent.click(nextBtn);

    expect(getByText(/Page 2/i)).toBeInTheDocument();

    // click on prev btn
    fireEvent.click(previousBtn);

    expect(getByText(/Page 1/i)).toBeInTheDocument();
  });

  it('shows error alert in case of any error', () => {
    isError = true;
    const { getByText } = setup();
    expect(
      getByText(/Error while fetching transactions, please try again./i)
    ).toBeInTheDocument();
  });
});
