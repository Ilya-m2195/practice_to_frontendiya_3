import { GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { NavigateFunction } from 'react-router-dom';

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
}

export interface IUser {
  phone: string;
  nickname: string;
  fullName: string;
  role: string;
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
