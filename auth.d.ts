import 'next-auth';

declare module 'next-auth' {
  interface User {
    userId: string;
    email?: string;
  }

  interface Session {
    user: User;
  }
}
