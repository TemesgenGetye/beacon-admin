import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createBeacon,
  deleteBeaconApi,
  fetchBeacon,
  fetchBeacons,
  updateBeaconApi,
} from '../../service/beaconApi';

export const getBeacons = createAsyncThunk('beacons/getBeacons', async (_, { rejectWithValue }) => {
  try {
    const data = await fetchBeacons();
    return data;
  } catch (error) {
    return rejectWithValue(error.message || 'Unknown error occurred');
  }
});

export const getBeacon = createAsyncThunk('beacons/getBeacon', async (id, { rejectWithValue }) => {
  try {
    const data = await fetchBeacon(id);
    return data;
  } catch (error) {
    return rejectWithValue(error.message || 'Unknown error occurred');
  }
});

export const createBeacons = createAsyncThunk(
  'beacons/createBeacons',
  async (beacon, { rejectWithValue }) => {
    try {
      const data = await createBeacon(beacon);

      return data;
    } catch (error) {
      console.error('Error in createBeacons thunk:', error);
      return rejectWithValue(error.message || 'Unknown error occurred');
    }
  }
);

export const updateBeacon = createAsyncThunk(
  'beacons/updateBeacon',
  async (beacon, { rejectWithValue }) => {
    try {
      const data = await updateBeaconApi(beacon.beacon_id, beacon);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update beacon');
    }
  }
);

export const deleteBeacon = createAsyncThunk(
  'beacons/deleteBeacon',
  async (id, { rejectWithValue }) => {
    try {
      const data = await deleteBeaconApi(id);

      return { beacon_id: id }; // Return the ID to remove it in the reducer
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete beacon');
    }
  }
);
