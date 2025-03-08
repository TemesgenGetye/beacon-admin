import { configureStore } from '@reduxjs/toolkit';
import advertReducer from '../slices/advertSlice';

const store = configureStore({
  reducer: {
    advert: advertReducer,
  },
});

export default store;
