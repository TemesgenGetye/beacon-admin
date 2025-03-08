import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAdvertisements } from '../../service/advertApi';

export const getAdverts = createAsyncThunk('advert/getAdverts', async (_, { rejectWithValue }) => {
  try {
    const data = await fetchAdvertisements();
    return data;
  } catch (error) {
    const errorMessage = error.message || 'Unknown error occurred';
    return rejectWithValue(errorMessage);
  }
});
