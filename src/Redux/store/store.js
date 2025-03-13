import { configureStore } from '@reduxjs/toolkit';
import advertReducer from '../slices/advertSlice';
import beaconReducer from '../slices/beaconSlice';
import assignmentReducer from '../slices/assignmnetSlice';
import logReducer from '../slices/logSlice';
import messageReducer from '../slices/messageSlice';

const store = configureStore({
  reducer: {
    advert: advertReducer,
    beacon: beaconReducer,
    assignment: assignmentReducer,
    log: logReducer,
    message: messageReducer,
  },
});

export default store;
