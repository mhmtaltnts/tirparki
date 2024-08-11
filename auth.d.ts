import 'next-auth';
declare module 'next-auth' {
  interface User {
    id: string | number;
    email: string;
    name: string;
    role?: string;
  }
  interface Session {
    user: User;
  }
}
