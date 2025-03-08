import { createSlice } from '@reduxjs/toolkit';
import { getAdverts } from '../thunks/advertThunk';

const advertSlice = createSlice({
  name: 'advert',
  initialState: {
    adverts: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearAdverts: state => {
      state.adverts = [];
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAdverts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAdverts.fulfilled, (state, action) => {
        state.adverts = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getAdverts.rejected, (state, action) => {
        state.adverts = [];
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const advertData = state => state.advert.adverts;
export const advertLoading = state => state.advert.isLoading;
export const advertError = state => state.advert.error;

export const { clearAdverts } = advertSlice.actions;
export default advertSlice.reducer;
