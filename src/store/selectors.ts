import { DocumentData } from 'firebase/firestore';

import { IProduct, IProductCategory, RootState } from 'store';
import { IUser } from 'types';

export const getIsLoading = (state: RootState): boolean => state.user.isLoading;
export const getId = (state: RootState): string => state.user.id;
export const getEmail = (state: RootState): string => state.user.email;
export const getPhotoURl = (state: RootState): Nullable<string> => state.user.photoURL;
export const getUsers = (state: RootState): Array<IUser> => state.user.users;
export const getFullName = (state: RootState): string => state.user.fullName;
export const getCreatedAt = (state: RootState): string => state.user.createdAt;
export const getRole = (state: RootState): string => state.user.role;
export const getIsAuth = (state: RootState): boolean => state.user.isAuth;
export const getErrorMessage = (state: RootState): Nullable<string> =>
  state.app.errorMessage;
export const getNickname = (state: RootState): string => state.user.nickname;
export const getBalance = (state: RootState): number => state.user.balance;
export const getIsOccupiedNick = (state: RootState): boolean => state.user.isOccupiedNick;
export const getPhone = (state: RootState): string => state.user.phone;
export const getSteam = (state: RootState): Nullable<string> => state.user.steam;
export const getLengthDataUsers = (state: RootState): number =>
  state.user.lengthDataUsers;
export const getSearchData = (state: RootState): Nullable<DocumentData[]> =>
  state.search.data;
export const getCurrentBalance = (state: RootState): number =>
  state.balanceHistory.transaction.currentBalance;

export const getProductCategories = (state: RootState): Array<IProductCategory> =>
  state.shop.productCategories;

export const getProducts = (state: RootState): Array<IProduct> => state.shop.products;

export const getCategoryId = (state: RootState): string => state.shop.currentCategoryId;
