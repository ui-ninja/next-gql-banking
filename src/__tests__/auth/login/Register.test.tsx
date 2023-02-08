import {
  fireEvent,
  render,
  waitForElementToBeRemoved,
  screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import RegisterInputForm from '../../../components/organisms/RegisterForm';
import registerConstants from '../../../constants/registerConstants';

const setup = () => {
  const mockSignup = jest.fn((data) => {
    return Promise.resolve({ data });
  });

  const utils = render(<RegisterInputForm onSignup={mockSignup} />);

  const signupBtn = utils.getByRole('button', {
    name: /Sign up/i,
  });
  return {
    nameInput: utils.getByPlaceholderText(registerConstants.NAME_PLACEHOLDER),
    emailInput: utils.getByPlaceholderText(registerConstants.EMAIL_PLACEHOLDER),
    passwordInput: utils.getByPlaceholderText(
      registerConstants.PASSWORD_PLACEHOLDER
    ),
    phoneInput: utils.getByPlaceholderText(registerConstants.PHONE_PLACEHOLDER),
    residenceInput: utils.getByPlaceholderText(
      registerConstants.RESIDENCE_PLACEHOLDER
    ),
    occupationSelectBox: utils.getByTestId('occupation_field'),
    incomeSelectBox: utils.getByTestId('income_field'),
    govtIdInput: utils.getByPlaceholderText(
      registerConstants.GOVTID_PLACEHOLDER
    ),
    signupBtn,
    mockSignup,
    ...utils,
  };
};

describe('Register page testing suite', () => {
  it('should show expected input fields', () => {
    const {
      nameInput,
      emailInput,
      passwordInput,
      residenceInput,
      occupationSelectBox,
      incomeSelectBox,
      govtIdInput,
      signupBtn,
    } = setup();

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(residenceInput).toBeInTheDocument();
    expect(occupationSelectBox).toBeInTheDocument();
    expect(incomeSelectBox).toBeInTheDocument();
    expect(govtIdInput).toBeInTheDocument();

    expect(signupBtn).toBeInTheDocument();
  });

  it('should display validation error when incorrect input is given', async () => {
    const { emailInput, passwordInput, signupBtn, mockSignup } = setup();

    fireEvent.change(emailInput, {
      target: { value: 'invalid_email_address' },
    });

    fireEvent.change(passwordInput, {
      target: { value: 'withoutNumericAndSpecialCharacters' },
    });

    fireEvent.click(signupBtn);

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

    const emailValidationError = screen.queryByText(
      registerConstants.EMAIL_NOT_VALID
    );
    const passwordValidationError = screen.queryByText(
      registerConstants.PASSWORD_NOT_VALID
    );
    const incomeValidationError = screen.queryByText(
      registerConstants.INCOME_REQUIRED
    );

    expect(emailValidationError).toBeInTheDocument();
    expect(passwordValidationError).toBeInTheDocument();
    expect(incomeValidationError).toBeInTheDocument();
    expect(mockSignup).not.toBeCalled();
  });

  it('should not display error when value is valid', async () => {
    const {
      emailInput,
      passwordInput,
      nameInput,
      phoneInput,
      govtIdInput,
      incomeSelectBox,
      signupBtn,
      mockSignup,
    } = setup();

    fireEvent.change(nameInput, {
      target: { value: 'John doe' },
    });

    fireEvent.change(emailInput, {
      target: { value: 'valid_address@yopmail.com' },
    });

    fireEvent.change(passwordInput, {
      target: { value: 'Sample@1' },
    });

    fireEvent.change(phoneInput, {
      target: { value: '5555555555' },
    });

    fireEvent.change(govtIdInput, {
      target: { value: 'DROTP3411L' },
    });

    fireEvent.change(incomeSelectBox, {
      target: { value: '1000001' },
    });

    fireEvent.click(signupBtn);

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

    const emailValidationError = screen.queryByText(
      registerConstants.EMAIL_NOT_VALID
    );
    const passwordValidationError = screen.queryByText(
      registerConstants.PASSWORD_NOT_VALID
    );
    const incomeValidationError = screen.queryByText(
      registerConstants.INCOME_REQUIRED
    );

    expect(emailValidationError).not.toBeInTheDocument();
    expect(passwordValidationError).not.toBeInTheDocument();
    expect(incomeValidationError).not.toBeInTheDocument();
    expect(mockSignup).toHaveBeenCalledWith({
      email: 'valid_address@yopmail.com',
      govtId: 'DROTP3411L',
      income: 1000001,
      name: 'John doe',
      occupation: '',
      password: 'Sample@1',
      phone: 5555555555,
      residence: '',
    });
  });
});
