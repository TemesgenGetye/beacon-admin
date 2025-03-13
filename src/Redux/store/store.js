import { configureStore } from '@reduxjs/toolkit';
import advertReducer from '../slices/advertSlice';
import beaconReducer from '../slices/beaconSlice';
import assignmentReducer from '../slices/assignmnetSlice';

const store = configureStore({
  reducer: {
    advert: advertReducer,
    beacon: beaconReducer,
    assignment: assignmentReducer,
  },
});

export default store;
