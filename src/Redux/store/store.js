import { configureStore } from '@reduxjs/toolkit';
import advertReducer from '../slices/advertSlice';
import beaconReducer from '../slices/beaconSlice';

const store = configureStore({
  reducer: {
    advert: advertReducer,
    beacon: beaconReducer,
  },
});

export default store;
