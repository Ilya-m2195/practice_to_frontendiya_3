import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  isPending,
  isFulfilled,
  isRejected,
} from '@reduxjs/toolkit';

import {
  logInUser,
  LogOut,
  checkFieldValueExists,
  setFirestoreData,
  updateFirestoreDataById,
  deleteFirestoreDataById,
  getFirestoreDataById,
  getFirestoreData,
  setDataStorage,
  deleteDataStorage,
  userObserver,
  basketObserver,
} from 'api';
import { Path, NamesDBCollection, UserRole, FileCollections } from 'constant';
import { handleError } from 'helpers';
import { setErrorMessage, setBasket, setBasketObserver } from 'store';
import {
  ThunkApiConfig,
  IInitialState,
  ILogInUserArg,
  IUser,
  IResultUserInfoData,
  IUniversalObjectArguments,
  IUpdateUser,
  IReturnTypeGetUsersThank,
  IDeleteDataStorage,
} from 'types';

const initialState: IInitialState = {
  isLoading: false,
  isAuth: false,
  isOccupiedNick: false,
  email: '',
  id: '',
  role: UserRole.User,
  nickname: '',
  phone: '',
  createdAt: '',
  fullName: '',
  balance: 0,
  photoURL: '',
  searchNickname: '',
  steam: null,
  users: [],
  lastUser: null,
  lengthDataUsers: 0,
  userObserver: null,
  basketObserver: null,
  basketCount: 0,
};

export const logOutUserThank = createAsyncThunk<void, undefined, ThunkApiConfig>(
  'userSlice/logOutUser',
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      getState().user.userObserver?.();
      getState().user.basketObserver?.();

      await LogOut();
    } catch (error) {
      const message = handleError(error as Error);

      dispatch(setErrorMessage(message));

      return rejectWithValue(message);
    }
  },
);

export const logInUserThank = createAsyncThunk<void, ILogInUserArg, ThunkApiConfig>(
  'userSlice/LogInUserThank',
  async ({ provider, navigate }, { dispatch, rejectWithValue }) => {
    try {
      const { isUser, resultUserInfoData } = await logInUser({ provider, navigate });

      if (isUser) {
        const currentUserInfo = await getFirestoreDataById(
          NamesDBCollection.Users,
          resultUserInfoData.id,
        );

        dispatch(setUser(currentUserInfo as IUser));
        navigate(Path.Home);

        const unsubscribe = userObserver(resultUserInfoData.id, (data) => {
          dispatch(setUser(data));
        });

        const onSubscribeBasket = basketObserver(
          resultUserInfoData.id,
          NamesDBCollection.Users,
          NamesDBCollection.Basket,
          (data) => {
            dispatch(setBasket(data));
            dispatch(setBasketCount(data.size));
          },
        );

        dispatch(setUserObserver(unsubscribe));
        dispatch(setBasketObserver(onSubscribeBasket));
      }

      dispatch(addCurrentEmailId(resultUserInfoData));
      navigate(Path.SetNick);
    } catch (error) {
      const message = handleError(error as Error);

      dispatch(setErrorMessage(message));

      return rejectWithValue(message);
    }
  },
);

export const updateUserThank = createAsyncThunk<
  void,
  IUniversalObjectArguments<IUpdateUser>,
  ThunkApiConfig
>('userSlice/updateUserThank', async ({ id, values }, { rejectWithValue, dispatch }) => {
  try {
    if (!id) return;

    await updateFirestoreDataById({ id, values }, NamesDBCollection.Users);

    dispatch(getUserThank(id));
  } catch (error) {
    const message = handleError(error as Error);

    dispatch(setErrorMessage(message));

    return rejectWithValue(message);
  }
});

interface IArguments {
  nickname: string;
  limit: number;
}

export const getLimitUsersThank = createAsyncThunk<
  IReturnTypeGetUsersThank,
  IArguments,
  ThunkApiConfig
>(
  'userSlice/getLimitUsersThank',
  async ({ nickname, limit }, { dispatch, rejectWithValue }) => {
    try {
      const { data, lastVisible, lengthData } = await getFirestoreData(
        NamesDBCollection.Users,
        nickname,
        limit!,
        null,
        null,
      );

      const usersData = data.docs.map((doc) => doc.data());

      return { usersData, lastVisible, lengthData } as IReturnTypeGetUsersThank;
    } catch (error) {
      const message = handleError(error as Error);

      dispatch(setErrorMessage(message));

      return rejectWithValue(message);
    }
  },
);

export const getMoreUsersThank = createAsyncThunk<
  IReturnTypeGetUsersThank,
  IArguments,
  ThunkApiConfig
>(
  'userSlice/getMoreUsersThank',
  async ({ nickname, limit }, { dispatch, rejectWithValue, getState }) => {
    try {
      const { data, lastVisible } = await getFirestoreData(
        NamesDBCollection.Users,
        nickname,
        limit,
        null,
        getState().user.lastUser,
      );

      const usersData = data.docs.map((doc) => doc.data());

      return { usersData, lastVisible } as IReturnTypeGetUsersThank;
    } catch (error) {
      const message = handleError(error as Error);

      dispatch(setErrorMessage(message));

      return rejectWithValue(message);
    }
  },
);

export const setUserThank = createAsyncThunk<
  void,
  IUniversalObjectArguments<IUser>,
  ThunkApiConfig
>(
  'userSlice/setUserThank',
  async ({ id, values }, { dispatch, rejectWithValue, getState }) => {
    try {
      dispatch(isOccupiedNickThank(values.nickname));

      if (getState().user.isOccupiedNick) {
        return;
      }

      await setFirestoreData(NamesDBCollection.Users, { id, values });

      dispatch(setUser(values));
    } catch (error) {
      const message = handleError(error as Error);

      dispatch(setErrorMessage(message));

      return rejectWithValue(message);
    }
  },
);

export const getUserThank = createAsyncThunk<void, string, ThunkApiConfig>(
  'userSlice/getUserThunk',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const user = await getFirestoreDataById(NamesDBCollection.Users, id);

      dispatch(setUser(user as IUser));
    } catch (error) {
      const message = handleError(error as Error);

      dispatch(setErrorMessage(message));

      return rejectWithValue(message);
    }
  },
);

export const deleteUserThank = createAsyncThunk<void, string, ThunkApiConfig>(
  'userSlice/DeleteUserThank',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await deleteFirestoreDataById(NamesDBCollection.Users, id);
    } catch (error) {
      const message = handleError(error as Error);

      dispatch(setErrorMessage(message));

      return rejectWithValue(message);
    }
  },
);

export const isOccupiedNickThank = createAsyncThunk<void, string, ThunkApiConfig>(
  'userSlice/isOccupiedNickThank',
  async (valueNick, { rejectWithValue, dispatch }) => {
    try {
      const isOccupiedNick = await checkFieldValueExists(
        NamesDBCollection.Users,
        'nickname',
        valueNick,
      );

      dispatch(setIsOccupiedNick(isOccupiedNick));
    } catch (error) {
      const message = handleError(error as Error);

      dispatch(setErrorMessage(message));

      return rejectWithValue(message);
    }
  },
);

export const changeUserPhotoThank = createAsyncThunk<string, File, ThunkApiConfig>(
  'userSlice/changeUserPhotoThank',
  async (file, { dispatch, rejectWithValue, getState }) => {
    const fileCollection = FileCollections.Images;
    const { id } = getState().user;

    try {
      const url = await setDataStorage({ fileCollection, file });

      const values = {
        photoURL: url,
      };

      dispatch(updateUserThank({ id, values }));

      return url;
    } catch (error) {
      const message = handleError(error as Error);

      dispatch(setErrorMessage(message));

      return rejectWithValue(message);
    }
  },
);

export const deleteDataStorageThunk = createAsyncThunk<
  void,
  IDeleteDataStorage,
  ThunkApiConfig
>(
  'userSlice/deleteDataStorageThunk',
  async ({ fileCollection, fileName }, { dispatch, rejectWithValue }) => {
    try {
      await deleteDataStorage({ fileCollection, fileName });
    } catch (error) {
      const message = handleError(error as Error);

      dispatch(setErrorMessage(message));

      return rejectWithValue(message);
    }
  },
);

const isPendingAction = isPending(
  logOutUserThank,
  logInUserThank,
  updateUserThank,
  setUserThank,
  getUserThank,
  changeUserPhotoThank,
  deleteDataStorageThunk,
);

const isFulfilledAction = isFulfilled(
  logInUserThank,
  logOutUserThank,
  updateUserThank,
  setUserThank,
  getUserThank,
  deleteDataStorageThunk,
);

const isRejectedAction = isRejected(
  deleteDataStorageThunk,
  getUserThank,
  setUserThank,
  getMoreUsersThank,
  getLimitUsersThank,
  updateUserThank,
  logInUserThank,
  logOutUserThank,
  changeUserPhotoThank,
);

const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.email = action.payload.email;
      state.id = action.payload.id!;
      state.role = action.payload.role;
      state.nickname = action.payload.nickname;
      state.phone = action.payload.phone;
      state.balance = action.payload.balance;
      state.photoURL = action.payload.photoURL;
      state.isAuth = true;
      state.createdAt = action.payload.createdAt;
      state.fullName = action.payload.fullName!;
      state.steam = action.payload.steam;
    },
    setUserObserver: (state, action: PayloadAction<() => void>) => {
      state.userObserver = action.payload;
    },
    setBasketCount: (state, action: PayloadAction<number>) => {
      state.basketCount = action.payload;
    },
    setBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
    addCurrentEmailId: (state, action: PayloadAction<IResultUserInfoData>) => {
      state.email = action.payload.email!;
      state.id = action.payload.id;
      state.photoURL = action.payload.photoURL;
      state.fullName = action.payload.fullName!;
      state.createdAt = action.payload.createdAt!;
      state.phone = action.payload.phone!;
    },
    setIsOccupiedNick: (state, action: PayloadAction<boolean>) => {
      state.isOccupiedNick = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logOutUserThank.fulfilled, (state) => {
      state.isAuth = false;
      state.email = '';
      state.id = '';
      state.role = UserRole.User;
      state.users = [];
      state.isLoading = false;
    });
    builder.addCase(getLimitUsersThank.fulfilled, (state, action) => {
      state.users = action.payload.usersData;
      state.lastUser = action.payload.lastVisible;
      state.lengthDataUsers = action.payload.lengthData!;
    });
    builder.addCase(getMoreUsersThank.fulfilled, (state, action) => {
      state.users = [...state.users, ...action.payload.usersData];
      state.lastUser = action.payload.lastVisible;
    });
    builder.addCase(changeUserPhotoThank.fulfilled, (state, action) => {
      state.photoURL = action.payload!;
      state.isLoading = false;
    });
    builder.addMatcher(isPendingAction, (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(isFulfilledAction, (state) => {
      state.isLoading = false;
    });
    builder.addMatcher(isRejectedAction, (state) => {
      state.isLoading = false;
    });
  },
});

export const {
  setBalance,
  setUser,
  setBasketCount,
  addCurrentEmailId,
  setIsOccupiedNick,
  setUserObserver,
} = userReducer.actions;
export default userReducer.reducer;
