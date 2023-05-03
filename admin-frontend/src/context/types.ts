import { ReactNode } from 'react';

export interface IAuthProvider {
  children: ReactNode;
}

export interface IUser {
  email: string;
  id: number;
  userName: string;
  coins: string;
  ripoId: string;
  verifiedEmail: boolean;
  admin: boolean;
}
