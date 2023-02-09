import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from '../../src/components/organisms/Dashboard';

const dummy_response_data = {
  account: [
    {
      id: '63ad8e4abef868d1f367c97e',
      accountNumber: 8619572868,
      type: 'CREDIT_CARD',
      category: 'PLATINUM',
      user: {
        id: '63aab3b84618d37d7d29fa48',
        govtId: 'ASDASDASDq',
        email: 'hashed@yopmail.com',
        income: 300001,
        name: 'Hashed',
        occupation: '',
        phone: 1231231231,
        residence: '',
      },
      card: {
        id: '63ad8e4abef868d1f367c97c',
        expiryYear: 2032,
        expiryMonth: 11,
        cardType: 'CREDIT_CARD',
        cardNumber: 4012888888884196,
      },
    },
    {
      id: '63adc80a16af0641e1751e9d',
      accountNumber: 2889943251,
      type: 'SAVINGS',
      category: 'PREMIUM',
      user: {
        id: '63aab3b84618d37d7d29fa48',
        govtId: 'ASDASDASDq',
        email: 'hashed@yopmail.com',
        income: 300001,
        name: 'Hashed',
        occupation: '',
        phone: 1231231231,
        residence: '',
      },
      card: {
        id: '63adc80a16af0641e1751e9b',
        expiryYear: 2032,
        expiryMonth: 11,
        cardType: 'DEBIT_CARD',
        cardNumber: 4012888888883019,
      },
    },
    {
      id: '63adc9e7c4aa47608c8feb8b',
      accountNumber: 8902780898,
      type: 'SAVINGS',
      category: 'REGULAR',
      user: {
        id: '63aab3b84618d37d7d29fa48',
        govtId: 'ASDASDASDq',
        email: 'hashed@yopmail.com',
        income: 300001,
        name: 'Hashed',
        occupation: '',
        phone: 1231231231,
        residence: '',
      },
      card: {
        id: '63adc9e7c4aa47608c8feb89',
        expiryYear: 2032,
        expiryMonth: 11,
        cardType: 'DEBIT_CARD',
        cardNumber: 4012888888887587,
      },
    },
    {
      id: '63e321362f336b027a0f0e14',
      accountNumber: 1321287080,
      type: 'SAVINGS',
      category: 'PREMIUM',
      user: {
        id: '63aab3b84618d37d7d29fa48',
        govtId: 'ASDASDASDq',
        email: 'hashed@yopmail.com',
        income: 300001,
        name: 'Hashed',
        occupation: '',
        phone: 1231231231,
        residence: '',
      },
      card: {
        id: '63e321362f336b027a0f0e12',
        expiryYear: 2033,
        expiryMonth: 11,
        cardType: 'DEBIT_CARD',
        cardNumber: 4012888888886360,
      },
    },
  ],
};

let IS_LOADING = false;
let ACCOUNTS_DATA: any = dummy_response_data;

const setup = () => {
  const utils = render(
    <Dashboard data={ACCOUNTS_DATA} isLoading={IS_LOADING} />
  );

  return {
    ...utils,
  };
};

describe('Dashboard testing suite', () => {
  it('should show list of accounts for given user', () => {
    const { getAllByTestId, getByText } = setup();

    const heading = getByText(/Welcome to NextGen banking!/i);

    expect(heading).toBeInTheDocument();

    const accountItems = getAllByTestId('account_list_item');

    // 4 list items should be present
    expect(accountItems).toHaveLength(4);
  });

  it('should show cards owned by user', () => {
    const { getAllByTestId } = setup();

    const cardItems = getAllByTestId('card_list_item');
    expect(cardItems).toHaveLength(4);
  });

  it('should show a alert to open new account when no account is present for user', () => {
    ACCOUNTS_DATA = null;
    const { getByText } = setup();
    const alert = getByText(
      /It seems you do not have an account with us at the moment, you can open a Savings or credit account with us/i
    );
    expect(alert).toBeInTheDocument();
  });

  it('shows loading indicator', () => {
    IS_LOADING = true;
    const { getByText } = setup();
    expect(getByText(/Fetching your accounts/i)).toBeInTheDocument();
  });
});
