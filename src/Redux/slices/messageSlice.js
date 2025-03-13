import { createSlice } from '@reduxjs/toolkit';
import { deleteMessage, getMessages } from '../thunks/messageThnuk';

const messageSlice = createSlice({
  name: 'message',
  initialState: {
    messages: [],

    isLoading: false,
    error: null,
  },
  reducers: {
    clearMessages: state => {
      state.messages = [];
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getMessages.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.messages = [];
        state.isLoading = false;
        state.error = action.message;
      })
      // delete message 🗑🗑🗑🗑🗑🗑
      .addCase(deleteMessage.pending, state => {
        state.error = null;
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        if (!Array.isArray(state.messages)) {
          console.warn('state.messages was not an array in delete fulfilled, initializing', state);
          state.messages = [];
        }
        const index = state.messages.findIndex(l => l.log_id === action.payload.log_id);
        if (index !== -1) {
          state.messages.splice(index, 1);
        }
      })
      .addCase(deleteMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const messageData = state => state.message.messages;
export const messageLoading = state => state.message.isLoading;
export const messageError = state => state.message.error;

export const { clearMessages } = messageSlice.actions;

export default messageSlice.reducer;
