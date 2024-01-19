import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

import { IUser } from '../../types/types';

const initialState = {
  isAuth: false,
  email: '',
  id: '',
  role: '',
  nickname: '',
  phone: '',
  balance: 0,
  users: [],
};

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
    addCurrentEmailId: (state, action: PayloadAction<User>) => {
      state.email = action.payload.email!;
      state.id = action.payload.uid;
    },
    setRole: (state, action) => {
      state.role = action.payload.role;
    },
    removeUser: (state) => {
      state.isAuth = false;
      state.email = '';
      state.id = '';
      state.role = '';
      state.users = [];
    },
    addUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { setUser, setRole, removeUser, addUsers, addCurrentEmailId } =
  mainReducer.actions;

export default mainReducer.reducer;
