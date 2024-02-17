import { DocumentData } from 'firebase/firestore';

import { RootState } from 'store';
import { IUser } from 'types';

export const getIsLoading = (state: RootState): boolean => state.main.isLoading;
export const getId = (state: RootState): string => state.main.id;
export const getEmail = (state: RootState): string => state.main.email;
export const getPhotoURl = (state: RootState): Nullable<string> => state.main.photoURL;
export const getUsers = (state: RootState): Array<IUser> => state.main.users;
export const getRole = (state: RootState): string => state.main.role;
export const getIsAuth = (state: RootState): boolean => state.main.isAuth;
export const getErrorMessage = (state: RootState): string => state.main.errorMessage;
export const getNickname = (state: RootState): string => state.main.nickname;
export const getIsOccupiedNick = (state: RootState): boolean => state.main.isOccupiedNick;
export const getLengthDataUsers = (state: RootState): number =>
  state.main.lengthDataUsers;
export const getSearchData = (state: RootState): Nullable<DocumentData[]> =>
  state.search.data;
