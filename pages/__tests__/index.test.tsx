import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '..';
import { useSession } from 'next-auth/react';

jest.mock('next-auth/react');

describe('Home page testing suite', () => {
  it('should show login and signup button when user is not authenticated', () => {
    (useSession as jest.Mock).mockReturnValueOnce({
      data: null,
      status: 'unauthenticated',
    });

    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: /Shop smart and safely with a NextGen/i,
    });

    const loginBtn = screen.getByRole('button', {
      name: /Login/i,
    });

    const signupBtn = screen.getByRole('button', {
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

    render(<Home />);

    const dashboardBtn = screen.getByRole('button', {
      name: /Dashboard/i,
    });

    const openNewAccountBtn = screen.getByRole('button', {
      name: /open new account/i,
    });
    expect(dashboardBtn).toBeInTheDocument();
    expect(openNewAccountBtn).toBeInTheDocument();
  });
});
