import {
  createAsyncThunk,
  createSlice,
  isPending,
  isFulfilled,
  isRejected,
} from '@reduxjs/toolkit';
import { DocumentData, increment, QuerySnapshot } from 'firebase/firestore';

import {
  getFirestoreSubCollectionById,
  setDocSubCollectionById,
  updateFirestoreDataById,
} from 'api';
import { BalanceOperation, FieldsTransaction, NamesDBCollection } from 'constant';
import { handleError } from 'helpers';
import { setErrorMessage } from 'store';
import {
  IChangeBalanceHistoryThunkProps,
  ISetBalanceHistoryThunkProps,
  Transaction,
  ThunkApiConfig,
} from 'types';

export interface IBalanceHistory {
  transaction: Transaction;
  loader: boolean;
  totalBalance: number;
  historyBalance: Transaction[] | [];
  lastVisibleData: Nullable<QuerySnapshot>;
  userId?: string;
}

const initialState: IBalanceHistory = {
  transaction: {
    typeOperation: null,
    currentBalance: 0,
    amount: 0,
    performerName: '',
    dateOperation: new Date(),
  },
  loader: false,
  totalBalance: 0,
  historyBalance: [],
  lastVisibleData: null,
  userId: '',
};

export const changeBalanceThunk = createAsyncThunk<
  number,
  IChangeBalanceHistoryThunkProps,
  ThunkApiConfig
>('balanceHistorySlice/changeBalance', async (data, { dispatch, rejectWithValue }) => {
  try {
    const { currentBalance, amount, typeOperation } = data.values;
    const { id } = data;

    if (currentBalance < amount) {
      dispatch(setErrorMessage('errorInsufficientFunds'));

      return currentBalance;
    }

    if (!id) {
      dispatch(setErrorMessage('errorUserId'));

      return currentBalance;
    }

    let totalBalance = currentBalance;

    const changeBalanceOperation = async (amount: number): Promise<number> => {
      totalBalance += amount;

      const values = {
        balance: increment(amount),
      };

      await updateFirestoreDataById({ id, values }, NamesDBCollection.Users);

      return totalBalance;
    };

    switch (typeOperation) {
      case BalanceOperation.Accrue:
        await changeBalanceOperation(amount);
        break;
      case BalanceOperation.WriteOff:
        await changeBalanceOperation(-1 * amount);
        break;
      default:
        dispatch(setErrorMessage('errorOperation'));
        break;
    }

    return totalBalance;
  } catch (error) {
    const message = handleError(error as Error);

    dispatch(setErrorMessage(message));

    return rejectWithValue(message);
  }
});

export const setBalanceHistoryThunk = createAsyncThunk<
  void,
  ISetBalanceHistoryThunkProps,
  ThunkApiConfig
>(
  'balanceHistorySlice/setBalanceHistory',
  async ({ value, typeOperation }, { dispatch, rejectWithValue, getState }) => {
    const { currentBalance } = getState().balanceHistory.transaction;
    const id = getState().balanceHistory.userId;
    const userNickname = getState().user.nickname;

    const values = {
      currentBalance,
      amount: value,
      performerName: userNickname,
      dateOperation: new Date(),
      typeOperation,
    };

    const data = {
      id,
      values,
    };

    try {
      dispatch(setTransaction(data.values));

      await setDocSubCollectionById(
        NamesDBCollection.Users,
        NamesDBCollection.BalanceHistory,
        data,
      );

      dispatch(changeBalanceThunk(data));
    } catch (error) {
      const message = handleError(error as Error);

      dispatch(setErrorMessage(message));

      return rejectWithValue(message);
    }
  },
);

interface IGetUserBalanceHistoryThunk {
  id: string;
  orderField: FieldsTransaction;
  limitCount: number;
}

export const getUserBalanceHistoryThunk = createAsyncThunk<
  DocumentData,
  IGetUserBalanceHistoryThunk,
  ThunkApiConfig
>(
  'balanceHistorySlice/getUserBalanceHistory',
  async (
    { id, orderField, limitCount = 10 },
    { dispatch, rejectWithValue, getState },
  ) => {
    try {
      const { data, lastVisible, lengthData } = await getFirestoreSubCollectionById(
        NamesDBCollection.Users,
        id,
        NamesDBCollection.BalanceHistory,
        orderField,
        limitCount,
        getState().balanceHistory.lastVisibleData,
      );

      const historyBalance = data.docs.map((doc) => doc.data());

      dispatch(setBalanceHistory(historyBalance));

      return { historyBalance, lastVisible, lengthData };
    } catch (error) {
      const message = handleError(error as Error);

      dispatch(setErrorMessage(message));

      return rejectWithValue(message);
    }
  },
);

const isPendingAction = isPending(
  setBalanceHistoryThunk,
  getUserBalanceHistoryThunk,
  changeBalanceThunk,
);

const isFulfilledAction = isFulfilled(setBalanceHistoryThunk, getUserBalanceHistoryThunk);

const isRejectedAction = isRejected(
  setBalanceHistoryThunk,
  getUserBalanceHistoryThunk,
  changeBalanceThunk,
);

const balanceHistoryReducer = createSlice({
  name: 'balanceHistoryReducer',
  initialState,
  reducers: {
    setBalanceHistory: (state, action) => {
      state.historyBalance = [...state.historyBalance, ...action.payload];
    },
    setTransaction: (state, action) => {
      state.transaction = action.payload;
      state.totalBalance = action.payload.currentBalance;
    },
    setCurrentBalance: (state, action) => {
      state.transaction.currentBalance = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(changeBalanceThunk.fulfilled, (state, action) => {
      state.loader = false;
      state.totalBalance = action.payload;
      state.transaction.currentBalance = action.payload;
    });
    builder.addMatcher(isPendingAction, (state) => {
      state.loader = true;
    });
    builder.addMatcher(isFulfilledAction, (state) => {
      state.loader = false;
    });
    builder.addMatcher(isRejectedAction, (state) => {
      state.loader = false;
    });
  },
});

export default balanceHistoryReducer.reducer;
export const { setCurrentBalance, setBalanceHistory, setTransaction, setUserId } =
  balanceHistoryReducer.actions;
