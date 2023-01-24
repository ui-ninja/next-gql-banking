jest.mock('next/router', () => require('next-router-mock'));

// jest.mock('next-auth/react', () => {
//   const originalModule = jest.requireActual('next-auth/react');
//   const mockSession = {
//     expires: new Date(Date.now() + 2 * 86400).toISOString(),
//     user: { username: 'admin', email: 'sample@yopmail.com', userId: 'uuidv4' },
//   };
//   return {
//     __esModule: true,
//     ...originalModule,
//     useSession: jest.fn(() => {
//       return { data: mockSession, status: 'authenticated' }; // return type is [] in v3 but changed to {} in v4
//     }),
//   };
// });

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
