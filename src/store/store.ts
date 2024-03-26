import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import appReducer from 'store/slices/appSlice/appSlice';
import balanceHistoryReducer from 'store/slices/balanceHistorySlice/balanceHistorySlice';
import basketReducer from 'store/slices/basketSlice/basketSlice';
import searchReducer from 'store/slices/searchSlice/searchSliсe';
import shopReducer from 'store/slices/shopSlice/shopSlice';
import userReducer from 'store/slices/userSlice/userSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    search: searchReducer,
    balanceHistory: balanceHistoryReducer,
    shop: shopReducer,
    basket: basketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
