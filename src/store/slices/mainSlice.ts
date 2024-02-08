import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

import { NamesDBCollection } from '../../constants/enums';
import { AppDispatch, RootState } from '../store';

import {
  logInUser,
  LogOut,
  getFirestoreData,
  checkFieldValueExists,
  setFirestoreData,
  updateFirestoreDataById,
  deleteFirestoreDataById,
} from 'api/api';
import { usersCollection } from 'firebase/firebase';
import {
  IInitialState,
  ILogInUserArg,
  IUniversalObjectArguments,
  IUpdateUser,
  IUser,
} from 'types/types';

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
      await logInUser({ provider, navigate }, dispatch);
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

export const getUsersThank = createAsyncThunk<
  Array<IUser>,
  number | undefined,
  ThunkApiConfig
>('mainSlice/getUsersThank', async (limit, { rejectWithValue, dispatch }) => {
  try {
    const result = await getFirestoreData(usersCollection, limit);
    const usersData = result.docs.map((doc) => doc.data());

    return usersData as Array<IUser>;
  } catch (error) {
    return rejectWithValue(errorHandler(dispatch, error));
  }
});

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

      await setFirestoreData(usersCollection, { id, values });

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
        usersCollection,
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
    addCurrentEmailId: (state, action: PayloadAction<User>) => {
      state.email = action.payload.email!;
      state.id = action.payload.uid;
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
    builder.addCase(getUsersThank.pending, (state) => {
      state.errorMessage = '';
    });

    builder.addCase(getUsersThank.fulfilled, (state, action) => {
      state.users = action.payload;
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
