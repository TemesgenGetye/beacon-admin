import { createSlice } from '@reduxjs/toolkit';
import { createAssignment, getAdvertWithBeacons, getAssignments } from '../thunks/assignmentThunk';

const assignmentSlice = createSlice({
  name: 'assignment',
  initialState: {
    assignments: [], // Always an array
    advertswithbeacons: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearAssignments: state => {
      state.assignments = [];
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAssignments.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAssignments.fulfilled, (state, action) => {
        state.assignments = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getAssignments.rejected, (state, action) => {
        state.assignments = [];
        state.isLoading = false;
        state.error = action.message;
      })
      //  get advert with beacons 🔥🔥🔥🔥🔥🔥
      .addCase(getAdvertWithBeacons.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAdvertWithBeacons.fulfilled, (state, action) => {
        state.advertswithbeacons = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getAdvertWithBeacons.rejected, (state, action) => {
        state.advertswithbeacons = [];
        state.isLoading = false;
        state.error = action.message;
      })
      // create assignment 🔥🔥🔥🔥🔥🔥
      .addCase(createAssignment.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createAssignment.fulfilled, (state, action) => {
        state.assignments.push(action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createAssignment.rejected, (state, action) => {
        state.assignments = [];
        state.isLoading = false;
        state.error = action.message;
      });
  },
});

export const assignmentData = state => state.assignment.assignments;
export const assignmentLoading = state => state.assignment.isLoading;
export const assignmentError = state => state.assignment.error;
export const advertWithBeacons = state => state.assignment.advertswithbeacons;

export const { clearAssignments } = assignmentSlice.actions;
export default assignmentSlice.reducer;
