import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import appReducer from 'store/slices/appSlice/appSlice';
import searchReducer from 'store/slices/searchSlice/searchSliсe';
import userReducer from 'store/slices/userSlice/userSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
