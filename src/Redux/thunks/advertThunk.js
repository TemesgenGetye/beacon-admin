import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createAdvertisement,
  deleteAdvertisement,
  fetchAdvertisement,
  fetchAdvertisements,
  updateAdvertisement,
} from '../../service/advertApi';

// Track ongoing requests to prevent duplicates
let ongoingGetAdvertsRequest = null;

export const getAdverts = createAsyncThunk(
  'advert/getAdverts',
  async (_, { rejectWithValue, getState }) => {
    // Check if we're already loading data
    const state = getState();
    if (state.advert.isLoading) {
      // If already loading, wait for the existing request
      if (ongoingGetAdvertsRequest) {
        return ongoingGetAdvertsRequest;
      }
    }

    try {
      // Create a promise for this request
      const requestPromise = fetchAdvertisements();
      ongoingGetAdvertsRequest = requestPromise;

      const data = await requestPromise;
      ongoingGetAdvertsRequest = null;
      return data;
    } catch (error) {
      ongoingGetAdvertsRequest = null;
      const errorMessage = error.message || 'Unknown error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);

export const getAdvert = createAsyncThunk('advert/getAdvert', async (id, { rejectWithValue }) => {
  try {
    const data = await fetchAdvertisement(id);
    return data;
  } catch (error) {
    const errorMessage = error.message || 'Unknown error occurred';
    return rejectWithValue(errorMessage);
  }
});

export const createAdvert = createAsyncThunk(
  'advert/createAdvert',
  async (advert, { rejectWithValue }) => {
    try {
      const data = await createAdvertisement(advert);
      return data;
    } catch (error) {
      const errorMessage = error.message || 'Unknown error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateAdvert = createAsyncThunk(
  'advert/updateAdvert',
  async (advert, { rejectWithValue }) => {
    try {
      const data = await updateAdvertisement(advert);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update advert');
    }
  }
);

export const deleteAdvert = createAsyncThunk(
  'advert/deleteAdvert',
  async (id, { rejectWithValue }) => {
    try {
      const data = await deleteAdvertisement(id);
      return { advertisement_id: id };
    } catch (error) {
      console.log('Thunk error:', error.message);
      return rejectWithValue(error.message);
    }
  }
);
