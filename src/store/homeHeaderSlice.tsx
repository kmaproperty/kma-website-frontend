import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

const initialState = {
  selectedCity: null,
  aboutsUsData: null,
}

const homeHeaderSlice = createSlice({
  name: 'homeHeader',
  initialState,
  reducers: {
    setSelectedCity: (state, action: PayloadAction<any>) => {
      state.selectedCity = action.payload
    },

    setAboutusData: (state, action: PayloadAction<any>) => {
      state.aboutsUsData = action.payload
    }
  },
});

export const { setSelectedCity, setAboutusData } = homeHeaderSlice.actions;

export const getSelectedCity = (state: RootState) => state.homeHeader.selectedCity;

export const getAboutusData = (state: RootState) => state.homeHeader.aboutsUsData;

export default homeHeaderSlice.reducer;

