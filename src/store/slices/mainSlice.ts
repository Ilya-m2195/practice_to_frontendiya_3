import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

import { LogInUser, LogOut, addUser, getUsers, updateUser } from '../../api/api';
import { IInitialState, ILogInUserArg, IUpdateUserArg, IUser } from '../../types/types';
import { AppDispatch, RootState } from '../store';

type ThunkApiConfig = {
  state: RootState;
  dispatch: AppDispatch;
};

const initialState: IInitialState = {
  isLoading: false,
  isAuth: false,
  email: '',
  id: '',
  role: '',
  nickname: '',
  phone: '',
  balance: 0,
  isError: false,
  users: [],
};

export const logOutUserThank = createAsyncThunk<void, undefined, ThunkApiConfig>(
  'mainSlice/logOutUser',
  async (_, { rejectWithValue }) => {
    try {
      await LogOut();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const logInUserThank = createAsyncThunk<void, ILogInUserArg, ThunkApiConfig>(
  'mainSlice/LogInUserThank',
  async ({ provider, navigate }, { dispatch, rejectWithValue }) => {
    try {
      await LogInUser({ provider, navigate }, dispatch);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateUserThank = createAsyncThunk<void, IUpdateUserArg, ThunkApiConfig>(
  'mainSlice/updateUserThank',
  async ({ id, values }, { rejectWithValue }) => {
    try {
      await updateUser({ id, values });
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getUsersThank = createAsyncThunk<Array<IUser>, void, ThunkApiConfig>(
  'mainSlice/getUsersThank',
  async (_, { rejectWithValue }) => {
    try {
      const result = await getUsers();
      const usersData = result.docs.map((doc) => doc.data());

      return usersData as Array<IUser>;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const addUserThank = createAsyncThunk<void, IUser, ThunkApiConfig>(
  'mainSlice/addUserThank',
  async (value, { dispatch, rejectWithValue }) => {
    try {
      await addUser(value);
      dispatch(setUser(value));
    } catch (error) {
      return rejectWithValue(error);
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
    setError: (state) => {
      state.isError = true;
    },
    addCurrentEmailId: (state, action: PayloadAction<User>) => {
      state.email = action.payload.email!;
      state.id = action.payload.uid;
    },
    setRole: (state, action) => {
      state.role = action.payload.role;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logOutUserThank.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(logOutUserThank.fulfilled, (state) => {
      state.isAuth = false;
      state.email = '';
      state.id = '';
      state.role = '';
      state.users = [];
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(logOutUserThank.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(logInUserThank.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(logInUserThank.fulfilled, (state) => {
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(logInUserThank.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(updateUserThank.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(updateUserThank.fulfilled, (state) => {
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(updateUserThank.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(getUsersThank.pending, (state) => {
      state.isError = false;
    });

    builder.addCase(getUsersThank.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(getUsersThank.rejected, (state) => {
      state.isError = true;
    });
    builder.addCase(addUserThank.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(addUserThank.fulfilled, (state) => {
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(addUserThank.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { setUser, setRole, addCurrentEmailId, setError } = mainReducer.actions;

export default mainReducer.reducer;
