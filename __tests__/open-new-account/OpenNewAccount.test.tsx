import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import OpenNewAccountForm from '../../src/components/organisms/OpenNewAccountForm';
import { ACCOUNT_TYPE } from '../../src/types';

const dummyUser = {
  name: 'john doe',
  email: 'sample@yopmail.com',
  govtId: 'PANCARD123',
  income: 500000,
  phone: 5555555555,
  id: 'sampleId',
};

const setup = () => {
  const mockAccountCreation = jest.fn((data) => {
    return Promise.resolve({ data });
  });

  const utils = render(
    <OpenNewAccountForm
      data={{ user: dummyUser }}
      onCreateAccount={mockAccountCreation}
    />
  );

  const nameInput = utils.getByDisplayValue(dummyUser.name);
  const emailInput = utils.getByDisplayValue(dummyUser.email);
  const phoneInput = utils.getByDisplayValue(dummyUser.phone);

  const accountTypeDropdown = utils.getByTestId('account_type_field');

  const createAccountBtn = utils.getByRole('button', {
    name: /Create account/i,
  });

  return {
    nameInput,
    emailInput,
    phoneInput,
    accountTypeDropdown,
    createAccountBtn,
    mockAccountCreation,
    ...utils,
  };
};

describe('Open new account testing suite', () => {
  it('should show fields - name, email and phone', () => {
    const { nameInput, emailInput, phoneInput } = setup();

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(phoneInput).toBeInTheDocument();
    expect(nameInput).toMatchSnapshot();
    expect(emailInput).toMatchSnapshot();
    expect(phoneInput).toMatchSnapshot();
  });

  it('render account type dropdown with savings option as default', () => {
    const { accountTypeDropdown } = setup();

    expect(accountTypeDropdown).toBeInTheDocument();
    expect(accountTypeDropdown).toHaveValue(ACCOUNT_TYPE.SAVINGS);
  });

  it('render two radio options for account type - SAVINGS', () => {
    const { getByRole } = setup();

    const regularAccountRadio = getByRole('radio', {
      name: 'Regular',
    });
    const premiumAccountRadio = getByRole('radio', {
      name: 'Premium',
    });

    expect(regularAccountRadio).toBeInTheDocument();
    expect(premiumAccountRadio).toBeInTheDocument();
  });

  it('on change of account type to credit card, should render Platinum and gold radio options', () => {
    const { accountTypeDropdown, getByRole } = setup();

    fireEvent.change(accountTypeDropdown, {
      target: {
        value: ACCOUNT_TYPE.CREDIT_CARD,
      },
    });

    const goldAccountRadio = getByRole('radio', {
      name: 'Gold',
    });
    const platinumAccountRadio = getByRole('radio', {
      name: 'Platinum',
    });

    expect(goldAccountRadio).toBeInTheDocument();
    expect(platinumAccountRadio).toBeInTheDocument();
  });

  it('throw validation error when user with income less than 500,000 selects account category as PLATINUM', async () => {
    const { accountTypeDropdown, getByRole, createAccountBtn, debug } = setup();

    // user selects credit card
    fireEvent.change(accountTypeDropdown, {
      target: {
        value: ACCOUNT_TYPE.CREDIT_CARD,
      },
    });

    const platinumAccountRadio = getByRole('radio', {
      name: 'Platinum',
    });

    // did not select any account category and click on create account button
    fireEvent.click(createAccountBtn);

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

    const mustSelectAccountCategory = screen.queryByText(
      /You must select an account category/i
    );

    expect(mustSelectAccountCategory).toBeInTheDocument();

    // selects platinum radio option
    fireEvent.click(platinumAccountRadio);
    fireEvent.click(createAccountBtn);

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

    const validationErrorMessage = screen.queryByText(
      /Based on your income declared i.e. 500000, you can select GOLD credit card only./i
    );

    expect(validationErrorMessage).toBeInTheDocument();
  });

  it('should submit form with expected fields', async () => {
    const {
      accountTypeDropdown,
      getByRole,
      createAccountBtn,
      mockAccountCreation,
    } = setup();

    fireEvent.change(accountTypeDropdown, {
      target: {
        value: ACCOUNT_TYPE.CREDIT_CARD,
      },
    });

    const goldAccountRadio = getByRole('radio', {
      name: 'Gold',
    });

    fireEvent.click(goldAccountRadio);

    fireEvent.click(createAccountBtn);

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

    expect(mockAccountCreation).toBeCalledWith({
      category: 'GOLD',
      type: 'CREDIT_CARD',
      userId: 'sampleId',
    });
  });
});
