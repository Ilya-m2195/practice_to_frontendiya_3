import { UsersKeys, NamesDBCollection } from 'constants';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DocumentData } from 'firebase/firestore';

import { searchData } from 'api';
import { handleError } from 'helpers';
import { ThunkApiConfig } from 'types';

export interface IInitialState {
  data: Nullable<DocumentData[]>;
  isLoading: boolean;
  error: Nullable<string | undefined>;
}

const initialState: IInitialState = {
  data: null,
  isLoading: false,
  error: null,
};

const searchReducer = createSlice({
  name: 'searchReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchDataThank.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(searchDataThank.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(searchDataThank.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const searchDataThank = createAsyncThunk<
  Nullable<DocumentData[]>,
  string,
  ThunkApiConfig
>('mainSlice/searchDataThank', async (searchValue, { rejectWithValue }) => {
  try {
    const responseData = await searchData(
      NamesDBCollection.Users,
      UsersKeys.SearchNickname,
      searchValue,
      false,
    );

    if (!responseData.length) {
      return null;
    }

    return responseData;
  } catch (error) {
    const message = handleError(error as Error);

    return rejectWithValue(message);
  }
});

export default searchReducer.reducer;
