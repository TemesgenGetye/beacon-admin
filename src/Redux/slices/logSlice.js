import { createSlice } from '@reduxjs/toolkit';
import { deleteLog, getLogs } from '../thunks/logsThunk';

const logSlice = createSlice({
  name: 'log',
  initialState: {
    logs: [],

    isLoading: false,
    error: null,
  },
  reducers: {
    clearLogs: state => {
      state.logs = [];
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getLogs.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getLogs.fulfilled, (state, action) => {
        state.logs = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getLogs.rejected, (state, action) => {
        state.logs = [];
        state.isLoading = false;
        state.error = action.message;
      })
      // delete log 🗑🗑🗑🗑🗑🗑
      .addCase(deleteLog.pending, state => {
        state.error = null;
      })
      .addCase(deleteLog.fulfilled, (state, action) => {
        state.isLoading = false;
        if (!Array.isArray(state.logs)) {
          console.warn('state.logs was not an array in delete fulfilled, initializing', state);
          state.logs = [];
        }
        const index = state.logs.findIndex(l => l.log_id === action.payload.log_id);
        if (index !== -1) {
          state.logs.splice(index, 1);
        }
      })
      .addCase(deleteLog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const logData = state => state.log.logs;
export const logLoading = state => state.log.isLoading;
export const logError = state => state.log.error;
export const { clearLogs } = logSlice.actions;
export default logSlice.reducer;
