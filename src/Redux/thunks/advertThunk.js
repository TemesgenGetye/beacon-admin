import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createAdvertisement,
  deleteAdvertisement,
  fetchAdvertisement,
  fetchAdvertisements,
  updateAdvertisement,
} from '../../service/advertApi';

export const getAdverts = createAsyncThunk('advert/getAdverts', async (_, { rejectWithValue }) => {
  try {
    const data = await fetchAdvertisements();
    return data;
  } catch (error) {
    const errorMessage = error.message || 'Unknown error occurred';
    return rejectWithValue(errorMessage);
  }
});

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
