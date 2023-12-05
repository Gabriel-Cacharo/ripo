import { ReactNode } from 'react';

export interface IAuthContext {
  isAuthenticated: boolean;
  user: IUser | null;
  loading: boolean;
  contextLoginFunction: (email: string, password: string) => void;
  contextLogoutFunction: () => void;
}

export interface IAuthProvider {
  children: ReactNode;
}

export interface IUser {
  email: string;
  id: number;
  userName: string;
  verifiedEmail: boolean;
  admin: boolean;
}
