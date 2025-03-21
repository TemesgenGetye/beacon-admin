import { createSlice } from '@reduxjs/toolkit';
import {
  getBeaconCount,
  getLocationCount,
  getLogCount,
  getMessageCount,
} from '../thunks/dashbordThunk';

const dashbordSlice = createSlice({
  name: 'dashbord',
  initialState: {
    beaconCount: 0,
    locationCount: 0,
    logCount: 0,
    messageCount: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearDashboard: state => {
      state.beaconCount = 0;
      state.locationCount = 0;
      state.logCount = 0;
      state.messageCount = 0;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Get beacon count
      .addCase(getBeaconCount.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBeaconCount.fulfilled, (state, action) => {
        state.beaconCount = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getBeaconCount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.beaconCount = 0;
      })
      // get location count
      .addCase(getLocationCount.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getLocationCount.fulfilled, (state, action) => {
        state.locationCount = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getLocationCount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.locationCount = 0;
      })
      // get log count
      .addCase(getLogCount.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getLogCount.fulfilled, (state, action) => {
        state.logCount = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getLogCount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.logCount = 0;
      })
      // Get message count
      .addCase(getMessageCount.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMessageCount.fulfilled, (state, action) => {
        state.messageCount = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getMessageCount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.messageCount = 0;
      });
  },
});
export const selectBeaconCount = state => state.dashbord.beaconCount;
export const selectLocationCount = state => state.dashbord.locationCount;
export const selectLogCount = state => state.dashbord.logCount;
export const selectMessageCount = state => state.dashbord.messageCount;
export const selectIsLoading = state => state.dashbord.isLoading;
export const selectError = state => state.dashbord.error;

export const { clearDashboard } = dashbordSlice.actions;
export default dashbordSlice.reducer;
