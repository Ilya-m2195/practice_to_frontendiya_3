import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
} from '@reduxjs/toolkit';

import { IProduct, IProductCategory, IRemoveShopData, IUpdateShopData } from './types';

import {
  deleteFirestoreDataById,
  getFirestoreData,
  setFirestoreData,
  updateFirestoreDataById,
} from 'api';
import { NamesDBCollection } from 'constant';
import { handleError } from 'helpers';
import { logOutUserThank, setErrorMessage } from 'store';
import { ThunkApiConfig } from 'types';

const reserveLimit = 100;

interface IInitialState {
  isLoading: boolean;
  error?: Nullable<string>;
  productCategories: Array<IProductCategory>;
  currentCategoryId: string;
  products: Array<IProduct>;
}

const initialState: IInitialState = {
  isLoading: false,
  error: null,
  productCategories: [],
  currentCategoryId: '',
  products: [],
};

const shopReducer = createSlice({
  name: 'shopReducer',
  initialState,
  reducers: {
    setCurrentCategoryId: (state, action: PayloadAction<string>) => {
      state.currentCategoryId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getCategoriesDataThunk.fulfilled,
      (state, action: PayloadAction<Array<IProductCategory>>) => {
        state.productCategories = action.payload;
      },
    );
    builder.addCase(
      getProductsDataThunk.fulfilled,
      (state, action: PayloadAction<Array<IProduct>>) => {
        state.products = action.payload;
      },
    );
    builder.addCase(logOutUserThank.fulfilled, (state) => {
      state.currentCategoryId = '';
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

export const getCategoriesDataThunk = createAsyncThunk<
  Array<IProductCategory>,
  Nullable<number>,
  ThunkApiConfig
>('shopSlice/getCategoriesDataThunk', async (limit, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await getFirestoreData(
      NamesDBCollection.ProductCategories,
      'id',
      limit || reserveLimit,
      null,
      null,
    );
    const categoriesData = data.docs.map((doc) => doc.data());

    return categoriesData as Array<IProductCategory>;
  } catch (error) {
    const message = handleError(error as Error);

    dispatch(setErrorMessage(message));

    return rejectWithValue(message);
  }
});

export const getProductsDataThunk = createAsyncThunk<
  Array<IProduct>,
  Nullable<number>,
  ThunkApiConfig
>(
  'shopSlice/getProductsDataThunk',
  async (limit, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await getFirestoreData(
        NamesDBCollection.Products,
        'categoryId',
        limit || reserveLimit,
        getState().shop.currentCategoryId,
        null,
      );

      return data.docs.map((doc) => doc.data()) as Array<IProduct>;
    } catch (error) {
      const message = handleError(error as Error);

      dispatch(setErrorMessage(message));

      return rejectWithValue(message);
    }
  },
);

export const setProductCategoryThunk = createAsyncThunk<
  void,
  IProductCategory,
  ThunkApiConfig
>(
  'shopSlice/setProductCategoryThunk',
  async (values: IProductCategory, { rejectWithValue, dispatch }) => {
    try {
      await setFirestoreData<IProductCategory>(NamesDBCollection.ProductCategories, {
        values,
      });

      dispatch(getCategoriesDataThunk(null));
    } catch (error) {
      const message = handleError(error as Error);

      dispatch(setErrorMessage(message));
      dispatch(getCategoriesDataThunk(null));

      return rejectWithValue(message);
    }
  },
);

export const setProductThunk = createAsyncThunk<void, IProduct, ThunkApiConfig>(
  'shopSlice/setProductThunk',
  async (values, { rejectWithValue, getState, dispatch }) => {
    try {
      await setFirestoreData<IProduct>(NamesDBCollection.Products, {
        values: { ...values, categoryId: getState().shop.currentCategoryId },
      });

      dispatch(getProductsDataThunk(null));
    } catch (error) {
      const message = handleError(error as Error);

      dispatch(setErrorMessage(message));

      return rejectWithValue(message);
    }
  },
);

export const removeShopDataThunk = createAsyncThunk<
  void,
  IRemoveShopData,
  ThunkApiConfig
>(
  'shopSlice/removeShopDataThunk',
  async ({ id, nameDBCollection }, { rejectWithValue, dispatch }) => {
    try {
      await deleteFirestoreDataById(nameDBCollection, id);
      if (nameDBCollection === NamesDBCollection.ProductCategories) {
        dispatch(getCategoriesDataThunk(null));

        return;
      }

      dispatch(getProductsDataThunk(null));
    } catch (error) {
      const message = handleError(error as Error);

      dispatch(setErrorMessage(message));

      return rejectWithValue(message);
    }
  },
);

export const updateShopDataThunk = createAsyncThunk<
  void,
  IUpdateShopData,
  ThunkApiConfig
>(
  'shopSlice/updateShopDataThunk',
  async ({ id, values, nameDBCollection }, { dispatch, rejectWithValue }) => {
    try {
      await updateFirestoreDataById({ id, values }, nameDBCollection);
      if (nameDBCollection === NamesDBCollection.ProductCategories) {
        dispatch(getCategoriesDataThunk(null));

        return;
      }

      dispatch(getProductsDataThunk(null));
    } catch (error) {
      const message = handleError(error as Error);

      return rejectWithValue(message);
    }
  },
);

const isPendingAction = isPending(
  getCategoriesDataThunk,
  setProductCategoryThunk,
  getProductsDataThunk,
  removeShopDataThunk,
  updateShopDataThunk,
);

const isFulfilledAction = isFulfilled(
  getCategoriesDataThunk,
  setProductCategoryThunk,
  getProductsDataThunk,
  removeShopDataThunk,
  updateShopDataThunk,
);

const isRejectedAction = isRejected(
  getCategoriesDataThunk,
  setProductCategoryThunk,
  getProductsDataThunk,
  removeShopDataThunk,
  updateShopDataThunk,
);

export const { setCurrentCategoryId } = shopReducer.actions;

export default shopReducer.reducer;
