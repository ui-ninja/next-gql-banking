import {
  fireEvent,
  render,
  waitForElementToBeRemoved,
  screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginInputForm from '../../../../src/components/organisms/LoginForm';

const setup = () => {
  const mockLogin = jest.fn((data) => {
    return Promise.resolve({ data });
  });

  const utils = render(
    <LoginInputForm csrfToken="dummy_token_value" onLogin={mockLogin} />
  );
  const emailInput = utils.getByPlaceholderText(
    /Enter your registered email address/i
  );
  const passwordInput = utils.getByPlaceholderText(/Enter your password/i);
  const loginBtn = utils.getByRole('button', {
    name: /Login/i,
  });
  return {
    emailInput,
    passwordInput,
    loginBtn,
    mockLogin,
    ...utils,
  };
};

describe('Login page testing suite', () => {
  it('should show email and password input fields', () => {
    const { emailInput, passwordInput, loginBtn } = setup();

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
  });

  it('should display validation error when entered incorrect values in input boxes', async () => {
    const { emailInput, loginBtn } = setup();

    fireEvent.change(emailInput, {
      target: { value: 'invalid_email_address' },
    });

    fireEvent.click(loginBtn);

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
    const emailValidationError = screen.queryByText(
      /Entered value does not match email format/i
    );
    const passwordValidationError = screen.queryByText(
      /Password is required to login/i
    );

    expect(emailValidationError).toBeInTheDocument();
    expect(passwordValidationError).toBeInTheDocument();
  });

  it('should display validation error when entered incorrect values in input boxes', async () => {
    const { emailInput, loginBtn, mockLogin } = setup();

    fireEvent.change(emailInput, {
      target: { value: 'invalid_email_address' },
    });

    fireEvent.click(loginBtn);

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
    const emailValidationError = screen.queryByText(
      /Entered value does not match email format/i
    );
    const passwordValidationError = screen.queryByText(
      /Password is required to login/i
    );

    expect(emailValidationError).toBeInTheDocument();
    expect(passwordValidationError).toBeInTheDocument();
    expect(mockLogin).not.toBeCalled();
  });

  it('should not display error when value is valid', async () => {
    const { emailInput, passwordInput, loginBtn, mockLogin } = setup();

    fireEvent.change(emailInput, {
      target: { value: 'valid_email_address@yopmail.com' },
    });

    fireEvent.change(passwordInput, {
      target: { value: 'dummy@1' },
    });

    fireEvent.click(loginBtn);

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

    expect(mockLogin).toBeCalledWith({
      email: 'valid_email_address@yopmail.com',
      password: 'dummy@1',
    });
  });
});
