import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  errorMessage: Nullable<string>;
}

const initialState: IInitialState = {
  errorMessage: null,
};

const appReducer = createSlice({
  name: 'appReducer',
  initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { setErrorMessage } = appReducer.actions;
export default appReducer.reducer;
