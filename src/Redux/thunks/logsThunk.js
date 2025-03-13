import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteLogApi, fetchLogs } from '../../service/logsApi';

export const getLogs = createAsyncThunk('logs/getLogs', async (_, { rejectWithValue }) => {
  try {
    const data = await fetchLogs();
    return data;
  } catch (error) {
    const errorMessage = error.message || 'Unknown error occurred';
    return rejectWithValue(errorMessage);
  }
});

export const deleteLog = createAsyncThunk('logs/deleteLog', async (id, { rejectWithValue }) => {
  try {
    const data = await deleteLogApi(id);
    return { log_id: id };
  } catch (error) {
    console.log('Thunk error:', error.message);
    return rejectWithValue(error.message || 'Failed to delete log');
  }
});
