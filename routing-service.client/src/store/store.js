import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slice/userSlice.js';
import routeSlice from './slice/routeSlice.js';

export const store = configureStore({
  reducer: { 
    user: userSlice,
    route: routeSlice, 
  },
});