import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';
import { QuerySnapshot } from 'firebase/firestore';

import {
  clearSnapshotCollection,
  deleteDocSubCollectionById,
  setDocSubCollectionById,
  updateDocSubCollectionById,
} from 'api';
import { NamesDBCollection } from 'constant';
import { handleError } from 'helpers';
import { setErrorMessage } from 'store';
import { IUniversalObjectArguments, ThunkApiConfig } from 'types';

export type BasketItem = {
  id: string;
  title: string;
  description: string;
  price: number;
  count: number;
  imageUrl: string;
};
export interface IBasket {
  isLoading: boolean;
  items: any;
  totalPrice: number;
  totalItems: number;
  userId: string;
  basketObserver: Nullable<QuerySnapshot>;
}

const initialState: IBasket = {
  isLoading: false,
  items: null,
  totalPrice: 0,
  totalItems: 0,
  userId: '',
  basketObserver: null,
};

export const addBasketItemThunk = createAsyncThunk<void, BasketItem, ThunkApiConfig>(
  'basketSlice/addBasketItemThunk',
  async (values, { dispatch, rejectWithValue, getState }) => {
    try {
      const { id } = getState().user;

      if (!id) return;

      const data = {
        id,
        values,
      };

      await setDocSubCollectionById(
        NamesDBCollection.Users,
        NamesDBCollection.Basket,
        data,
      );
    } catch (error) {
      const message = handleError(error as Error);

      dispatch(setErrorMessage(message));

      return rejectWithValue(message);
    }
  },
);

export const clearBasketThunk = createAsyncThunk<void, undefined, ThunkApiConfig>(
  'basketSlice/clearBasketThunk',
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      await clearSnapshotCollection(getState().basket.items);
    } catch (error) {
      const message = handleError(error as Error);

      dispatch(setErrorMessage(message));

      return rejectWithValue(message);
    }
  },
);

export const deleteBasketItemThunk = createAsyncThunk<void, string, ThunkApiConfig>(
  'basketSlice/deleteBasketItemThunk',
  async (itemId, { dispatch, rejectWithValue, getState }) => {
    try {
      await deleteDocSubCollectionById(
        NamesDBCollection.Users,
        NamesDBCollection.Basket,
        getState().user.id,
        itemId,
      );
    } catch (error) {
      const message = handleError(error as Error);

      dispatch(setErrorMessage(message));

      return rejectWithValue(message);
    }
  },
);

export const updateBasketItemThunk = createAsyncThunk<
  void,
  IUniversalObjectArguments<BasketItem>,
  ThunkApiConfig
>(
  'basketSlice/updateBasketItemThunk',
  async (data, { dispatch, rejectWithValue, getState }) => {
    try {
      await updateDocSubCollectionById(
        NamesDBCollection.Users,
        NamesDBCollection.Basket,
        getState().user.id,
        data,
      );
    } catch (error) {
      const message = handleError(error as Error);

      dispatch(setErrorMessage(message));

      return rejectWithValue(message);
    }
  },
);

const isPendingAction = isPending(
  addBasketItemThunk,
  clearBasketThunk,
  deleteBasketItemThunk,
  updateBasketItemThunk,
);

const isFulfilledAction = isFulfilled(
  addBasketItemThunk,
  clearBasketThunk,
  deleteBasketItemThunk,
  updateBasketItemThunk,
);

const isRejectedAction = isRejected(
  addBasketItemThunk,
  clearBasketThunk,
  deleteBasketItemThunk,
  updateBasketItemThunk,
);

const basketReducer = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setBasket: (state, action) => {
      state.items = action.payload;
    },
    setBasketObserver: (state, action) => {
      state.basketObserver = action.payload;
    },
  },
  extraReducers: (builder) => {
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

export const { setBasket, setBasketObserver } = basketReducer.actions;
export default basketReducer.reducer;
