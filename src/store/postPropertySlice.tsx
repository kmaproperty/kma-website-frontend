import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormData {
  listType: string | null, //static list
  propertyCategory: string | null, //static list
  city: string | null,
  apartment: string | null,
  locality: string | null,
  propertyType: string | null //static list
  
  //Step 1 commercial

  //Possesion Status ( Commercial flow )
  possestionStatus: string, //static list
  availableFrom: string | null,
  ageOfProperty: string | null,

  //About the property ( Commercial flow )
  locationHub: string | null,  //dynamic list
  otherLocationHub: string | null,
  zoneType: string | null,  //static list

  propertyCondition: string | null, //static list
  builtUpArea: string | null, //visible on ready to use
  carpetArea: string | null, //visible on ready to use, hide on bare sheel
  ownership: string | null, //visible on ready to use
  constructionStatus: string | null, //Visible on bare shell
  floringStatus: string | null, //Visible on bare shell

  //Step 2 commercial

  //Floor Details
  totalFloor: string | null, //dynamic based on property details
  yourFloor: string | null, //Dropdown based on totalFloor
  selectStair: string | null,
  otherStairNumber: string | null,
  lift: string | null,
  privateParking: string | null,
  publicParking: string | null,

  //Financial
  expectedRent: string | null,
  isRentNegotiable: boolean | null,
  securityDeposite: string | null,
  isDepositeNegotiable: boolean | null,
  dg: boolean | null,
  electircity: boolean | null,
  water: boolean | null,
  rentIncrease: boolean | null,
  rentIncreaseAmount: string |  null,
  IsBrokerage: boolean | null,
  brokerageAmount: string | null,
  isBrokerageNegotiable: boolean | null,
  lockInPeriod: boolean | null,
  lockInperiodValue: string | null,

  //Step 3 Amenites

  

}

const initialState: FormData = {
  listType: 'SELL',
  propertyCategory: 'RESIDENTIAL',
  city: null,
  apartment: null,
  locality: null,
  propertyType : null,

  //Possesion Status ( Commercial flow)
  possestionStatus: 'READY TO MOVE',
  availableFrom: null,
  ageOfProperty: null,

  //About the property ( Commercial flow )
  locationHub: null, 
  otherLocationHub: null,
  zoneType: null,

  propertyCondition: null,
  builtUpArea: null,
  carpetArea: null,
  ownership: null,
  constructionStatus: null,
  floringStatus: null,

};

const createAccountSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormField<K extends keyof FormData>(state: any, action: PayloadAction<{ key: K; value: FormData[K] }>) {
      state[action.payload.key] = action.payload.value;
    },
    setFormData(state, action: PayloadAction<FormData>) {
      return action.payload;
    },
    resetForm() {
      return initialState;
    },
  },
});

export const { setFormField, setFormData, resetForm } = createAccountSlice.actions;
export default createAccountSlice.reducer;
