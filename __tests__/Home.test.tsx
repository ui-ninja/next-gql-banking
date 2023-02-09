import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import '@testing-library/jest-dom';
import Home from '../pages';

jest.mock('next-auth/react');

const setup = () => {
  const utils = render(<Home />);
  const heading = screen.getByRole('heading', {
    name: /Shop smart and safely with a NextGen/i,
  });

  return {
    heading,
    ...utils,
  };
};

describe('Home page testing suite', () => {
  it('should show login and signup button when user is not authenticated', () => {
    (useSession as jest.Mock).mockReturnValueOnce({
      data: null,
      status: 'unauthenticated',
    });

    const { heading, getByRole } = setup();

    const loginBtn = getByRole('button', {
      name: /Login/i,
    });

    const signupBtn = getByRole('button', {
      name: /Sign up/i,
    });

    expect(heading).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
    expect(signupBtn).toBeInTheDocument();
  });

  it('should show render dashboard and open new account button when user is authenticated', () => {
    const mockSession = {
      expires: new Date(Date.now() + 2 * 86400).toISOString(),
      user: {
        username: 'admin',
        email: 'sample@yopmail.com',
        userId: 'uuidv4',
      },
    };
    (useSession as jest.Mock).mockReturnValueOnce({
      data: mockSession,
      status: 'unauthenticated',
    });
    const { heading, getByRole } = setup();

    const dashboardBtn = getByRole('button', {
      name: /Dashboard/i,
    });

    const openNewAccountBtn = getByRole('button', {
      name: /open new account/i,
    });

    expect(heading).toBeInTheDocument();
    expect(dashboardBtn).toBeInTheDocument();
    expect(openNewAccountBtn).toBeInTheDocument();
  });
});
