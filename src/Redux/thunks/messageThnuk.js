import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteMessageApi, fetchMessages } from '../../service/messageApi';

export const getMessages = createAsyncThunk(
  'messages/getMessages',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchMessages();
      return data;
    } catch (error) {
      const errorMessage = error.message || 'Unknown error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteMessage = createAsyncThunk(
  'messages/deleteMessage',
  async (id, { rejectWithValue }) => {
    try {
      const data = await deleteMessageApi(id);
      return { log_id: id };
    } catch (error) {
      console.log('Thunk error:', error.message);
      return rejectWithValue(error.message || 'Failed to delete log');
    }
  }
);
