import { createSlice } from '@reduxjs/toolkit';
import { createAdvert, deleteAdvert, getAdverts, updateAdvert } from '../thunks/advertThunk';

const advertSlice = createSlice({
  name: 'advert',
  initialState: {
    adverts: [], // Always an array
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
        state.adverts = action.payload.results; // Store only the results array
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getAdverts.rejected, (state, action) => {
        state.adverts = [];
        state.isLoading = false;
        state.error = action.error.message;
      })
      // advert create
      .addCase(createAdvert.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.adverts.push({ ...action.meta.arg, tempId: Date.now() }); // Optimistic add
      })
      .addCase(createAdvert.fulfilled, (state, action) => {
        const index = state.adverts.findIndex(ad => ad.tempId === action.meta.arg.tempId);
        if (index !== -1) state.adverts[index] = action.payload; // Replace with server data
        state.isLoading = false;
      })
      .addCase(createAdvert.rejected, (state, action) => {
        state.adverts = state.adverts.filter(ad => ad.tempId !== action.meta.arg.tempId); // Rollback
        state.isLoading = false;
        state.error = action.error.message;
      })
      // In advertSlice
      .addCase(updateAdvert.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        const index = state.adverts.findIndex(
          ad => ad.advertisement_id === action.meta.arg.advertisement_id
        );
        if (index !== -1) {
          state.adverts[index] = { ...state.adverts[index], ...action.meta.arg }; // Optimistic update
        }
      })
      .addCase(updateAdvert.fulfilled, (state, action) => {
        const index = state.adverts.findIndex(
          ad => ad.advertisement_id === action.payload.advertisement_id
        );
        if (index !== -1) {
          state.adverts[index] = action.payload; // Replace with server data
        }
        state.isLoading = false;
      })
      .addCase(updateAdvert.rejected, (state, action) => {
        const index = state.adverts.findIndex(
          ad => ad.advertisement_id === action.meta.arg.advertisement_id
        );
        if (index !== -1) {
          // No change, or revert if you track original state
        }
        state.isLoading = false;
        state.error = action.payload; // Use payload for custom message
      })
      // advert delete
      .addCase(deleteAdvert.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.adverts.push({ ...action.meta.arg, tempId: Date.now() }); // Optimistic add
      })
      .addCase(deleteAdvert.fulfilled, (state, action) => {
        const index = state.adverts.findIndex(
          ad => ad.advertisement_id === action.meta.arg.advertisement_id
        );
        if (index !== -1) state.adverts.splice(index, 1); // Replace with server data
        state.isLoading = false;
      })
      .addCase(deleteAdvert.rejected, (state, action) => {
        state.adverts = state.adverts.filter(
          ad => ad.advertisement_id !== action.meta.arg.advertisement_id
        ); // Rollback
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
