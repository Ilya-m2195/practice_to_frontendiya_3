import { GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { NavigateFunction } from 'react-router-dom';

export interface IInitialState {
  isLoading: boolean;
  isAuth: boolean;
  email: string;
  id: string;
  phone: string;
  balance: number;
  role: string;
  nickname: string;
  isError: boolean;
  users: Array<IUser>;
}

export interface IUser {
  phone: string;
  nickname: string;
  fullName: string;
  role: string;
  email: string;
  id: string;
  balance: number;
}

export interface IId {
  id: string;
}

export interface IUpdateUser {
  fullName: string;
  nickname: string;
  role: string;
}

export interface IUpdateUserArg {
  id: string;
  values: IUpdateUser;
}

export interface ILogInUserArg {
  provider: GoogleAuthProvider | GithubAuthProvider;
  navigate: NavigateFunction;
}
