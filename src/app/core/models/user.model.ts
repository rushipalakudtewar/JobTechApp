export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user' | 'superAdmin' | 'employer' | 'employee';
    token?: string;
  }
  