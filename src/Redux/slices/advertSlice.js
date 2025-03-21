import { createSlice } from '@reduxjs/toolkit';
import {
  createAdvert,
  deleteAdvert,
  getAdvert,
  getAdverts,
  updateAdvert,
} from '../thunks/advertThunk';

const advertSlice = createSlice({
  name: 'advert',
  initialState: {
    adverts: [],
    advert: [],
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
        state.adverts = action.payload; // Store only the results array
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getAdverts.rejected, (state, action) => {
        state.adverts = [];
        state.isLoading = false;
        state.error = action.error.message;
      })
      // advert get 🔥🔥🔥🔥🔥🔥
      .addCase(getAdvert.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAdvert.fulfilled, (state, action) => {
        state.advert = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getAdvert.rejected, (state, action) => {
        state.advert = [];
        state.isLoading = false;
        state.error = action.payload;
      })
      // advert create 🔥🔥🔥🔥🔥🔥
      .addCase(createAdvert.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createAdvert.fulfilled, (state, action) => {
        state.isLoading = false;
        state.adverts.push({ ...action.payload });
      })
      .addCase(createAdvert.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.log('Rejected - Error:', action.payload);
      })
      // advert update 🎨🎨🎨🎨🎨🎨
      .addCase(updateAdvert.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        const index = state.adverts.findIndex(
          ad => ad.advertisement_id === action.meta.arg.advertisement_id
        );
        if (index !== -1) {
          state.adverts[index] = { ...state.adverts[index], ...action.meta.arg };
        }
      })
      .addCase(updateAdvert.fulfilled, (state, action) => {
        const index = state.adverts.findIndex(
          ad => ad.advertisement_id === action.payload.advertisement_id
        );
        if (index !== -1) {
          state.adverts[index] = action.payload;
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
        state.error = action.payload;
      })
      // advert delete 🗑🗑🗑🗑🗑🗑
      .addCase(deleteAdvert.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        const index = state.adverts.findIndex(ad => ad.advertisement_id === action.meta.arg);
        if (index !== -1) state.adverts.splice(index, 1);
      })
      .addCase(deleteAdvert.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteAdvert.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.adverts.push({ advertisement_id: action.meta.arg });
      });
  },
});

export const advertData = state => state.advert.adverts;
export const advertLoading = state => state.advert.isLoading;
export const advertError = state => state.advert.error;
export const singleData = state => state.advert.advert;

export const { clearAdverts } = advertSlice.actions;
export default advertSlice.reducer;
