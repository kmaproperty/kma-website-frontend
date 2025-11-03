import { configureStore } from '@reduxjs/toolkit';
import createAccountSlice from './createAccountSlice';
import postPropertyProgressSlice from './postPropertyProgress';
import postPropertyFormSlice from './postPropertySlice';

export const store = configureStore({
  reducer: {
    form: createAccountSlice,
    postPropertyProgress: postPropertyProgressSlice,
    postPropertyForm: postPropertyFormSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
