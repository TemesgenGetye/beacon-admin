import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRefresh, fetchToken } from '../../service/AuthApi';

export const getUser = createAsyncThunk('auth/getUser', async (data, { rejectWithValue }) => {
  try {
    const responce = await fetchToken(data);
    return responce;
  } catch (error) {
    const errorMessage = error.message || 'Unknown error occurred';
    return rejectWithValue(errorMessage);
  }
});

export const getToken = createAsyncThunk('auth/getToken', async (data, { rejectWithValue }) => {
  try {
    const responce = await fetchRefresh(data);
    return responce;
  } catch (error) {
    const errorMessage = error.message || 'Unknown error occurred';
    return rejectWithValue(errorMessage);
  }
});
