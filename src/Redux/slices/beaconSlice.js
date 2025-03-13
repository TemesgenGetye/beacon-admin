// beaconSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  createBeacons,
  deleteBeacon,
  getBeacon,
  getBeacons,
  updateBeacon,
} from '../thunks/beaconThunk';

const beaconSlice = createSlice({
  name: 'beacon',
  initialState: {
    beacons: [],
    beacon: [],
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
        state.beacons = action.payload || []; // Ensure array even if payload is undefined
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getBeacons.rejected, (state, action) => {
        state.beacons = [];
        state.isLoading = false;
        state.error = action.payload;
      })
      // get Beacon by id 🔥🔥🔥🔥🔥🔥
      .addCase(getBeacon.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBeacon.fulfilled, (state, action) => {
        state.beacon = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getBeacon.rejected, (state, action) => {
        state.beacons = [];
        state.isLoading = false;
        state.error = action.payload;
      })
      // beacon create 🔥🔥🔥🔥🔥🔥

      .addCase(createBeacons.pending, (state, action) => {
        const tempId = action.meta.arg.tempId; // Use tempId from createData
        state.beacons.push({ ...action.meta.arg, beacon_id: `temp-${tempId}` });
      })
      .addCase(createBeacons.fulfilled, (state, action) => {
        if (!Array.isArray(state.beacons)) {
          state.beacons = [];
        }
        const tempIndex = state.beacons.findIndex(b => b.tempId === action.meta.arg.tempId);
        if (tempIndex !== -1) {
          state.beacons[tempIndex] = {
            ...state.beacons[tempIndex], // Keep tempId and other data
            beacon_id: action.payload.beacon_id, // Update only beacon_id
          };
        } else {
          state.beacons.push(action.payload);
        }
        state.isLoading = false;
      })
      .addCase(createBeacons.rejected, (state, action) => {
        state.beacons = state.beacons.filter(b => b.tempId !== action.meta.arg.tempId);
      })
      // beacon update 🎨🎨🎨🎨🎨🎨
      .addCase(updateBeacon.pending, (state, action) => {
        state.error = null;
        const index = state.beacons.findIndex(b => b.beacon_id === action.meta.arg.beacon_id);
        if (index !== -1) {
          state.beacons[index] = { ...state.beacons[index], ...action.meta.arg }; // Optimistic full update
        }
      })
      .addCase(updateBeacon.fulfilled, (state, action) => {
        if (!Array.isArray(state.beacons)) {
          state.beacons = [];
        }
        const index = state.beacons.findIndex(b => b.beacon_id === action.payload.beacon_id);
        if (index !== -1) {
          state.beacons[index] = {
            ...state.beacons[index],
            ...action.payload,
          };
        }
        state.isLoading = false;
      })
      .addCase(updateBeacon.rejected, (state, action) => {
        if (!Array.isArray(state.beacons)) {
          state.beacons = [];
        }
        state.isLoading = false;
        state.error = action.payload;
      })
      // beacon delete  🗑🗑🗑🗑🗑🗑
      .addCase(deleteBeacon.pending, state => {
        // state.isLoading = true;
        state.error = null;
        // Don't remove the beacon here yet - wait for confirmation
      })
      .addCase(deleteBeacon.fulfilled, (state, action) => {
        state.isLoading = false;
        if (!Array.isArray(state.beacons)) {
          console.warn('state.beacons was not an array in delete fulfilled, initializing', state);
          state.beacons = [];
        }
        const index = state.beacons.findIndex(b => b.beacon_id === action.payload.beacon_id);
        if (index !== -1) {
          state.beacons.splice(index, 1);
        }
      })
      .addCase(deleteBeacon.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const beaconData = state => state.beacon?.beacons;
export const beaconLoading = state => state.beacon?.isLoading;
export const beaconError = state => state.beacon?.error;
export const singleDataBeacon = state => state.beacon?.beacon;

export const { clearBeacons } = beaconSlice.actions;
export default beaconSlice.reducer;
