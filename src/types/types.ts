import { GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { QuerySnapshot } from 'firebase/firestore';
import { NavigateFunction } from 'react-router-dom';

import { UserRole } from '../constants';
import { AppDispatch, RootState } from '../store';

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
  photoURL: Nullable<string>;
  searchNickname: string;
  users: Array<IUser>;
  lastUser: Nullable<QuerySnapshot>;
  lengthDataUsers: number;
}

export interface IUser {
  phone: string;
  nickname: string;
  fullName: string;
  role: UserRole.Admin | UserRole.User;
  email: string;
  id: string;
  balance: number;
  photoURL: Nullable<string>;
  searchNickname: string;
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
  photoURL: Nullable<string>;
}

export interface IValuesAddUserNickForm {
  fullName: string;
  nickname: string;
  role: string;
  phone: string;
  balance: number;
}

export type ThunkApiConfig = {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
};

export interface IReturnGetFirestoreData {
  data: QuerySnapshot;
  lastVisible: Nullable<QuerySnapshot>;
  lengthData?: number;
}

export interface IReturnTypeGetUsersThank {
  usersData: Array<IUser>;
  lastVisible: Nullable<QuerySnapshot>;
  lengthData?: number;
}
