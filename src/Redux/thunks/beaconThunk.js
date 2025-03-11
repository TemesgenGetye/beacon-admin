import { createAsyncThunk } from '@reduxjs/toolkit';
import { createBeacon, fetchBeacon, fetchBeacons } from '../../service/beaconApi';

export const getBeacons = createAsyncThunk('beacons/getBeacons', async (_, { rejectWithValue }) => {
  try {
    const data = await fetchBeacons();
    return data;
  } catch (error) {
    const errorMessage = error.message || 'Unknown error occurred';
    return rejectWithValue(errorMessage);
  }
});

export const getBeacon = createAsyncThunk('beacons/getBeacon', async (id, { rejectWithValue }) => {
  try {
    const data = await fetchBeacon(id);
    return data;
  } catch (error) {
    const errorMessage = error.message || 'Unknown error occurred';
    return rejectWithValue(errorMessage);
  }
});

export const createBeacons = createAsyncThunk(
  'beacons/createBeacon',
  async (beacon, { rejectWithValue }) => {
    try {
      const data = await createBeacon(beacon);
      return data;
    } catch (error) {
      const errorMessage = error.message || 'Unknown error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);
