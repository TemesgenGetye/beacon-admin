import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBeacons } from '../../service/beaconApi';

export const getBeacons = createAsyncThunk('beacons/getBeacons', async (_, { rejectWithValue }) => {
  try {
    const data = await fetchBeacons();
    return data;
  } catch (error) {
    const errorMessage = error.message || 'Unknown error occurred';
    return rejectWithValue(errorMessage);
  }
});
