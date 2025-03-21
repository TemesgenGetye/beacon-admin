import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAdvertWithBeacons,
  fetchAssignments,
  createAssignmentApi,
  updateAssignmentApi,
  deleteAssignmentApi,
} from '../../service/assignmentApi';

export const getAssignments = createAsyncThunk(
  'assignment/getAssignments',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchAssignments();
      return data;
    } catch (error) {
      const errorMessage = error.message || 'Unknown error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);

export const getAdvertWithBeacons = createAsyncThunk(
  'assignment/getAdvertWithBeacons',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchAdvertWithBeacons();
      return data;
    } catch (error) {
      const errorMessage = error.message || 'Unknown error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);

export const createAssignment = createAsyncThunk(
  'assignment/createAssignment',
  async (assignment, { rejectWithValue }) => {
    try {
      const data = await createAssignmentApi(assignment);
      return data;
    } catch (error) {
      const errorMessage = error.message || 'Unknown error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);

// export const getAssignment = createAsyncThunk(
//   'assignment/getAssignment',
//   async (id, { rejectWithValue }) => {
//     try {
//       const data = await fetchAssignment(id);
//       return data;
//     } catch (error) {
//       const errorMessage = error.message || 'Unknown error occurred';
//       return rejectWithValue(errorMessage);
//     }
//   }
// );

export const updateAssignment = createAsyncThunk(
  'assignment/updateAssignment',
  async (assignment, { rejectWithValue }) => {
    try {
      const data = await updateAssignmentApi(assignment);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update assignment');
    }
  }
);

export const deleteAssignment = createAsyncThunk(
  'assignment/deleteAssignment',
  async (id, { rejectWithValue }) => {
    try {
      const data = await deleteAssignmentApi(id);
      return { assignment_id: id };
    } catch (error) {
      console.log('Thunk error:', error.message);
      return rejectWithValue(error.message || 'Failed to delete assignment');
    }
  }
);
