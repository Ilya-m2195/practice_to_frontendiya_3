import { GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { QuerySnapshot, QueryDocumentSnapshot } from 'firebase/firestore';
import { NavigateFunction } from 'react-router-dom';

import { UserRole, FileCollections } from 'constant';
import { AppDispatch, RootState } from 'store';

export interface IInitialState {
  isLoading: boolean;
  isAuth: boolean;
  isOccupiedNick: boolean;
  email: string;
  id: string;
  phone: string;
  createdAt: string;
  fullName: string;
  balance: number;
  role: UserRole;
  nickname: string;
  photoURL: Nullable<string>;
  searchNickname: string;
  steam: Nullable<string>;
  users: Array<IUser>;
  lastUser: Nullable<QuerySnapshot>;
  lengthDataUsers: number;
}

export interface IUser {
  phone: string;
  nickname: string;
  fullName: string;
  role: UserRole;
  email: string;
  id: string;
  balance: number;
  createdAt: string;
  photoURL: Nullable<string>;
  searchNickname: string;
  steam: Nullable<string>;
}

export interface IUpdateUser {
  [key: string]: IUser[keyof IUser];
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
  fullName: Nullable<string>;
  createdAt?: string;
  phone: Nullable<string>;
}

export interface IValuesAddUserNickForm {
  nickname: string;
  role: UserRole;
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
  lastVisible: Nullable<QueryDocumentSnapshot>;
  lengthData?: number;
}

export interface IReturnTypeGetUsersThank {
  usersData: Array<IUser>;
  lastVisible: Nullable<QuerySnapshot>;
  lengthData?: number;
}

export interface IUploadDataStorage {
  fileCollection: FileCollections;
  file: File;
}

export interface IDeleteDataStorage {
  fileCollection: FileCollections;
  fileName: string;
}
