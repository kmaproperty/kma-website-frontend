import { configureStore } from '@reduxjs/toolkit';
import createAccountSlice from './createAccountSlice';
import homeHeaderSlice from './homeHeaderSlice';

export const store = configureStore({
  reducer: {
    form: createAccountSlice,
    homeHeader: homeHeaderSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
