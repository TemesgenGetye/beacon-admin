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
        state.adverts = action.payload; // Store only the results array
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getAdverts.rejected, (state, action) => {
        state.adverts = [];
        state.isLoading = false;
        state.error = action.error.message;
      })
      // advert create 🔥🔥🔥🔥🔥🔥
      .addCase(createAdvert.pending, (state, action) => {
        //state.isLoading = true;
        state.error = null;
        const tempId = Date.now();
        const tempAdvert = { ...action.meta.arg, tempId, advertisement_id: `temp-${tempId}` };
        state.adverts.push(tempAdvert);
      })
      .addCase(createAdvert.fulfilled, (state, action) => {
        const tempIndex = state.adverts.findIndex(ad => ad.tempId === action.meta.arg.tempId);
        if (tempIndex !== -1) {
          state.adverts[tempIndex] = { ...action.payload };
        } else {
          // Remove any temp advert with matching data, then add payload
          state.adverts = state.adverts.filter(
            ad =>
              !(
                ad.tempId &&
                ad.title === action.payload.title &&
                ad.content === action.payload.content
              )
          );
          state.adverts.push({ ...action.payload });
        }
        state.isLoading = false;
      })
      .addCase(createAdvert.rejected, (state, action) => {
        state.adverts = state.adverts.filter(ad => ad.tempId !== action.meta.arg.tempId);
        state.isLoading = false;
        state.error = action.payload;
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
        // state.isLoading = true;
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

export const { clearAdverts } = advertSlice.actions;
export default advertSlice.reducer;
