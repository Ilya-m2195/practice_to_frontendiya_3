import { GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { QuerySnapshot } from 'firebase/firestore';
import { NavigateFunction } from 'react-router-dom';

export interface IInitialState {
  isLoading: boolean;
  isAuth: boolean;
  isOccupiedNick: boolean;
  email: string;
  id: string;
  phone: string;
  balance: number;
  role: string;
  nickname: string;
  errorMessage: string;
  users: Array<IUser>;
  lastUser: unknown;
  lengthDataUsers: number;
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

export interface IUpdateUser {
  fullName: string;
  nickname: string;
  role: string;
  phone: string;
}

export interface IUniversalObjectArguments<T> {
  id?: string;
  values: T;
}

export interface ILogInUserArg {
  provider: GoogleAuthProvider | GithubAuthProvider;
  navigate: NavigateFunction;
}

export interface IResultUserInfoData {
  email: string;
  id: string;
}

export interface IValuesAddUserNickForm {
  fullName: string;
  nickname: string;
  role: string;
  phone: string;
  balance: number;
}

export interface IReturnGetFirestoreData {
  data: QuerySnapshot;
  lastVisible: unknown;
  lengthData?: number;
}

export interface IReturnTypeGetUsersThank {
  usersData: Array<IUser>;
  lastVisible: unknown;
  lengthData?: number;
}
