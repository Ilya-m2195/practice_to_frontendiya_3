import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import mainReducer from 'store/slices/mainSlice';
import searchReducer from 'store/slices/searchSlice/searchSliсe';

export const store = configureStore({
  reducer: {
    main: mainReducer,
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
