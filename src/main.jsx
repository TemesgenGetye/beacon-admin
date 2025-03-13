import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './Redux/store/store.js';
import { AdvertProvider } from './context/AdvertModelContext.jsx';
import { BeaconProvider } from './context/BeaconModelContext.jsx';
import { AssignmentProvider } from './context/AssignmentContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AdvertProvider>
        <BeaconProvider>
          <AssignmentProvider>
            <App />
          </AssignmentProvider>
        </BeaconProvider>
      </AdvertProvider>
    </Provider>
  </StrictMode>
);
