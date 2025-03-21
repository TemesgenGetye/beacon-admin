import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchBeaconCount,
  fetchLocationCount,
  fetchLogCount,
  fetchMessageCount,
} from '../../service/dashbordApi';

export const getBeaconCount = createAsyncThunk(async (_, { rejectWithValue }) => {
  try {
    const data = await fetchBeaconCount();
    return data;
  } catch (error) {
    return rejectWithValue(error.message || 'Unknown error occurred');
  }
});

export const getLocationCount = createAsyncThunk(async (_, { rejectWithValue }) => {
  try {
    const data = await fetchLocationCount();
    return data;
  } catch (error) {
    return rejectWithValue(error.message || 'Unknown error occurred');
  }
});

export const getLogCount = createAsyncThunk(async (_, { rejectWithValue }) => {
  try {
    const data = await fetchLogCount();
    return data;
  } catch (error) {
    return rejectWithValue(error.message || 'Unknown error occurred');
  }
});

export const getMessageCount = createAsyncThunk(async (_, { rejectWithValue }) => {
  try {
    const data = await fetchMessageCount();
    return data;
  } catch (error) {
    return rejectWithValue(error.message || 'Unknown error occurred');
  }
});
