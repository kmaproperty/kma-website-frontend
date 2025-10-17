import { configureStore } from '@reduxjs/toolkit';
import createAccountSlice from './createAccountSlice';

export const store = configureStore({
  reducer: {
    form: createAccountSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
