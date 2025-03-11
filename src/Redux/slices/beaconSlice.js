import { createSlice } from '@reduxjs/toolkit';
import { createBeacons, getBeacons } from '../thunks/beaconThunk';

const beaconSlice = createSlice({
  name: 'beacon',
  initialState: {
    beacons: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearBeacons: state => {
      state.beacons = [];
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getBeacons.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBeacons.fulfilled, (state, action) => {
        state.beacons = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getBeacons.rejected, (state, action) => {
        state.beacons = [];
        state.isLoading = false;
        state.error = action.error.message;
      })
      // beacon create
      .addCase(createBeacons.pending, (state, action) => {
        console.log('Pending - state.beacons:', state.beacons);
        state.isLoading = true;
        state.error = null;
        state.beacons.push({ ...action.meta.arg, tempId: Date.now() });
      })
      .addCase(createBeacons.fulfilled, (state, action) => {
        console.log('Fulfilled - state.beacons:', state.beacons);
        const index = state.beacons.findIndex(ad => ad.tempId === action.meta.arg.tempId);
        if (index !== -1) state.beacons[index] = action.payload;
        state.isLoading = false;
      })
      .addCase(createBeacons.rejected, (state, action) => {
        console.log('Rejected - state.beacons:', state.beacons);
        state.beacons = state.beacons.filter(ad => ad.tempId !== action.meta.arg.tempId);
        state.isLoading = false;
        state.error = action.payload;
      });

    //   // beacon update
    //   .addCase(updateBeacon.pending, (state, action) => {
    //     state.isLoading = true;
    //     state.error = null;
    //     const index = state.beacons.findIndex(
    //       ad => ad.advertisement_id === action.meta.arg.advertisement_id
    //     );
    //     if (index !== -1) {
    //       state.beacons[index] = { ...state.beacons[index], ...action.meta.arg }; // Optimistic update
    //     }
    //   })
    //   .addCase(updateBeacon.fulfilled, (state, action) => {
    //     const index = state.beacons.findIndex(
    //       ad => ad.advertisement_id === action.payload.advertisement_id
    //     );
    //     if (index !== -1) {
    //       state.beacons[index] = action.payload; // Replace with server data
    //     }
    //     state.isLoading = false;
    //   })
    //   .addCase(updateBeacon.rejected, (state, action) => {
    //     const index = state.beacons.findIndex(
    //       ad => ad.advertisement_id === action.meta.arg.advertisement_id
    //     );
    //     if (index !== -1) {
    //       // No change, or revert if you track original state
    //     }
    //     state.isLoading = false;
    //     state.error = action.payload; // Use payload for custom message
    //   })
    //   // beacon delete
    //   .addCase(deleteBeacon.pending, (state, action) => {
    //     state.isLoading = true;
    //     state.error = null;
    //     state.beacons.push({ ...action.meta.arg, tempId: Date.now() }); // Optimistic add
    //   })
    //   .addCase(deleteBeacon.fulfilled, (state, action) => {
    //     const index = state.beacons.findIndex(
    //       ad => ad.advertisement_id === action.meta.arg.advertisement_id
    //     );
    //     if (index !== -1) state.beacons.splice(index, 1); // Replace with server data
    //     state.isLoading = false;
    //   })
    //   .addCase(deleteBeacon.rejected, (state, action) => {
    //     state.beacons = state.beacons.filter(
    //       ad => ad.advertisement_id !== action.meta.arg.advertisement_id
    //     ); // Rollback
    //     state.isLoading = false;
    //     state.error = action.error.message;
    //   });
  },
});

export const beaconData = state => state.beacon?.beacons;
export const beaconLoading = state => state.beacon?.isLoading;
export const beaconError = state => state.beacon?.error;

export const { clearBeacons } = beaconSlice.actions;
export default beaconSlice.reducer;
