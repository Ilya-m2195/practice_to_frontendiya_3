import { Path, NamesDBCollection } from 'constants';

import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  logInUser,
  LogOut,
  checkFieldValueExists,
  setFirestoreData,
  updateFirestoreDataById,
  deleteFirestoreDataById,
  getFirestoreDataById,
  getLimitFirestoreData,
  getMoreFirestoreData,
} from 'api';
import { AppDispatch, RootState } from 'store';
import {
  IInitialState,
  ILogInUserArg,
  IUser,
  IResultUserInfoData,
  IUniversalObjectArguments,
  IUpdateUser,
  IReturnTypeGetUsersThank,
} from 'types';

type ThunkApiConfig = {
  state: RootState;
  dispatch: AppDispatch;
};

const initialState: IInitialState = {
  isLoading: false,
  isAuth: false,
  isOccupiedNick: false,
  email: '',
  id: '',
  role: '',
  nickname: '',
  phone: '',
  balance: 0,
  errorMessage: '',
  users: [],
  lastUser: null,
  lengthDataUsers: 0,
};

const errorHandler = (dispatch: AppDispatch, error: unknown): void => {
  dispatch(setErrorMessage(error as string));
};

export const logOutUserThank = createAsyncThunk<void, undefined, ThunkApiConfig>(
  'mainSlice/logOutUser',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await LogOut();
    } catch (error) {
      return rejectWithValue(errorHandler(dispatch, error));
    }
  },
);

export const logInUserThank = createAsyncThunk<void, ILogInUserArg, ThunkApiConfig>(
  'mainSlice/LogInUserThank',
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
      } else {
        dispatch(addCurrentEmailId(resultUserInfoData));
        navigate(Path.SetNick);
      }
    } catch (error) {
      return rejectWithValue(errorHandler(dispatch, error));
    }
  },
);

export const updateUserThank = createAsyncThunk<
  void,
  IUniversalObjectArguments<IUpdateUser>,
  ThunkApiConfig
>('mainSlice/updateUserThank', async ({ id, values }, { rejectWithValue, dispatch }) => {
  try {
    await updateFirestoreDataById<IUpdateUser>({ id, values }, NamesDBCollection.Users);
  } catch (error) {
    return rejectWithValue(errorHandler(dispatch, error));
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
  'mainSlice/getLimitUsersThank',
  async ({ nickname, limit }, { rejectWithValue, dispatch }) => {
    try {
      const { data, lastVisible, lengthData } = await getLimitFirestoreData(
        NamesDBCollection.Users,
        nickname,
        limit!,
      );

      const usersData = data.docs.map((doc) => doc.data());

      return { usersData, lastVisible, lengthData } as IReturnTypeGetUsersThank;
    } catch (error) {
      return rejectWithValue(errorHandler(dispatch, error));
    }
  },
);

export const getMoreUsersThank = createAsyncThunk<
  IReturnTypeGetUsersThank,
  IArguments,
  ThunkApiConfig
>(
  'mainSlice/getMoreUsersThank',
  async ({ nickname, limit }, { rejectWithValue, dispatch, getState }) => {
    try {
      const { data, lastVisible } = await getMoreFirestoreData(
        NamesDBCollection.Users,
        nickname,
        limit!,
        getState().main.lastUser,
      );

      const usersData = data.docs.map((doc) => doc.data());

      return { usersData, lastVisible } as IReturnTypeGetUsersThank;
    } catch (error) {
      return rejectWithValue(errorHandler(dispatch, error));
    }
  },
);

export const setUserThank = createAsyncThunk<
  void,
  IUniversalObjectArguments<IUser>,
  ThunkApiConfig
>(
  'mainSlice/setUserThank',
  async ({ id, values }, { dispatch, rejectWithValue, getState }) => {
    try {
      dispatch(isOccupiedNickThank(values.nickname));

      if (getState().main.isOccupiedNick) {
        return;
      }

      await setFirestoreData(NamesDBCollection.Users, { id, values });

      dispatch(setUser(values));
    } catch (error) {
      return rejectWithValue(errorHandler(dispatch, error));
    }
  },
);

export const deleteUserThank = createAsyncThunk<void, string, ThunkApiConfig>(
  'mainSlice/DeleteUserThank',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await deleteFirestoreDataById(NamesDBCollection.Users, id);
    } catch (error) {
      return rejectWithValue(errorHandler(dispatch, error));
    }
  },
);

export const isOccupiedNickThank = createAsyncThunk<void, string, ThunkApiConfig>(
  'mainSlice/isOccupiedNickThank',
  async (valueNick, { rejectWithValue, dispatch }) => {
    try {
      const isOccupiedNick = await checkFieldValueExists(
        NamesDBCollection.Users,
        'nickname',
        valueNick,
      );

      dispatch(setIsOccupiedNick(isOccupiedNick));
    } catch (error) {
      return rejectWithValue(errorHandler(dispatch, error));
    }
  },
);

const mainReducer = createSlice({
  name: 'mainReducer',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.email = action.payload.email;
      state.id = action.payload.id!;
      state.role = action.payload.role;
      state.nickname = action.payload.nickname;
      state.phone = action.payload.phone;
      state.balance = action.payload.balance;
      state.isAuth = true;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    addCurrentEmailId: (state, action: PayloadAction<IResultUserInfoData>) => {
      state.email = action.payload.email!;
      state.id = action.payload.id;
    },
    setRole: (state, action) => {
      state.role = action.payload.role;
    },
    setIsOccupiedNick: (state, action: PayloadAction<boolean>) => {
      state.isOccupiedNick = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logOutUserThank.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = '';
    });
    builder.addCase(logOutUserThank.fulfilled, (state) => {
      state.isAuth = false;
      state.email = '';
      state.id = '';
      state.role = '';
      state.users = [];
      state.isLoading = false;
      state.errorMessage = '';
    });
    builder.addCase(logOutUserThank.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(logInUserThank.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = '';
    });
    builder.addCase(logInUserThank.fulfilled, (state) => {
      state.isLoading = false;
      state.errorMessage = '';
    });
    builder.addCase(logInUserThank.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateUserThank.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = '';
    });
    builder.addCase(updateUserThank.fulfilled, (state) => {
      state.isLoading = false;
      state.errorMessage = '';
    });
    builder.addCase(updateUserThank.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getLimitUsersThank.pending, (state) => {
      state.errorMessage = '';
    });

    builder.addCase(getLimitUsersThank.fulfilled, (state, action) => {
      state.users = action.payload.usersData;
      state.lastUser = action.payload.lastVisible;
      state.lengthDataUsers = action.payload.lengthData!;
    });
    builder.addCase(getLimitUsersThank.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getMoreUsersThank.pending, (state) => {
      state.errorMessage = '';
    });

    builder.addCase(getMoreUsersThank.fulfilled, (state, action) => {
      state.users = [...state.users, ...action.payload.usersData];
      state.lastUser = action.payload.lastVisible;
    });
    builder.addCase(getMoreUsersThank.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(setUserThank.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = '';
    });
    builder.addCase(setUserThank.fulfilled, (state) => {
      state.isLoading = false;
      state.errorMessage = '';
    });
    builder.addCase(setUserThank.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(isOccupiedNickThank.pending, (state) => {
      state.errorMessage = '';
    });
    builder.addCase(isOccupiedNickThank.fulfilled, (state) => {
      state.errorMessage = '';
    });
  },
});

export const { setUser, setRole, addCurrentEmailId, setErrorMessage, setIsOccupiedNick } =
  mainReducer.actions;

export default mainReducer.reducer;
