import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';


interface Commercial_common_field {
  listType: string | null, //static list
  propertyCategory: string | null, //static list
  city: string | null,
  apartment: string | null,
  locality: string | null,
  propertyType: string | null //static list
}

const initialState = {
  activeStep: 1

};

const commercial_common_field: Commercial_common_field = {
  listType: 'SELL',
  propertyCategory: 'RESIDENTIAL',
  city: null,
  apartment: null,
  locality: null,
  propertyType : null,
}

const commercial_sell_office = {
  //Step 1 commercial

  //Possesion Status ( Commercial flow )
  possestionStatus: null, //static list ( ready to move | under construction)
  availableFrom: null,  // under construction
  ageOfProperty: null, //ready to move

  //About the property ( Commercial flow )
  locationHub: null,  //dynamic list ( it park, business park, other)
  otherLocationHub: null,
  zoneType: null,  //static list  ( industrial, commercial, residential, special economice zone, open spaces, agricultural zone, other)
  
  propertyCondition: null, //static list

  builtUpArea: null, //both
  carpetArea: null, //visible on ready to use, hide on bare sheel
  ownership: null, //both

  constructionStatus: null, //Visible on bare shell
  floringStatus: null, //Visible on bare shell


  //Step 2 commercial

  //Floor Details
  totalFloor: null, //dynamic based on property details
  yourFloor: null, //Dropdown based on totalFloor
  selectStair: null,
  otherStairNumber: null,
  lift: null,
  privateParking: null,
  publicParking: null,

  //Financial
  price: null,
  isNegotiable: null,
  taxCharges: null,
  dg: null,
  preLease: null, //( yes | no )
  currentRent: null,  //show if Yes selected
  leaseYear: null, //show if Yes selected
  expectedReturn: null, //show if no selected


  //Step 3 Amenites

  //Fecilities ( if propertycondition is ready to use)
    minNumberofSeats: null,
    maxNumberofSeats: null,
    numberOfCabins: null,
    numberOfMeetingRooms: null,
    privateWashrooms: null,
    publicWashRooms: null,
    conferenceRoom: null,
    receptionArea: null, //options    

  //amenitis
    amenities: null,
    description: null,
}

const commercial_rent_office = {
  //Step 1 commercial

  //Possesion Status ( Commercial flow )
  possestionStatus: null, //static list ( ready to move | under construction)
  availableFrom: null, // both
  ageOfProperty: null, // ready to move  ( industrial, commercial, residential, special economice zone, open spaces, agricultural zone, other)

  //About the property ( Commercial flow )
  locationHub: null,  //dynamic list ( it park, business park, other)
  otherLocationHub: null,
  zoneType: null,  //static list ( industrial, commercial, residential, special economice zone, open spaces, agricultural zone, other)

  propertyCondition: null, //static list

  builtUpArea: null, //both
  carpetArea: null, //visible on ready to use, hide on bare shell
  ownership: null, //both  ( free hold, leashold, cooperative society, power of attorney)

  constructionStatus: null, //Visible on bare shell
  floringStatus: null, //Visible on bare shell


  //Step 2 commercial

  //Floor Details
  totalFloor: null, //dynamic based on property details
  yourFloor: null, //Dropdown based on totalFloor
  selectStair: null,
  otherStairNumber: null,
  lift: null,
  privateParking: null,
  publicParking: null,

  //Financial
  expectedRent: null,
  isRentNegotiable: null,
  securityDeposite: null,
  isDepositeNegotiable: null,
  dg: null,
  electircity: null,
  water: null,
  rentIncrease: null,
  rentIncreaseAmount:  null,
  IsBrokerage: null,
  brokerageAmount: null,
  isBrokerageNegotiable: null,
  lockInPeriod: null,
  lockInperiodValue: null,

  //Step 3 Amenites

  //Fecilities ( if propertycondition is ready to use)
    minNumberofSeats: null,
    maxNumberofSeats: null,
    numberOfCabins: null,
    numberOfMeetingRooms: null,
    privateWashrooms: null,
    publicWashRooms: null,
    conferenceRoom: null,
    receptionArea: null, //options    

  //amenitis
    amenities: null,
    description: null,
}

const commercial_sell_retail_shop = {
  //Step 1 commercial

  //Possesion Status ( Commercial flow )
  possestionStatus: null, //static list ( ready to move | under construction)
  availableFrom: null, // under construction
  ageOfProperty: null, // ready to move  

  //About the property ( Commercial flow )
  locationHub: null,  //dynamic list ( Mall, commercial project, residential project, retail complex/building, market/high street, other)
  otherLocationHub: null,
  zoneType: null,  //static list (jewellery, gym, grocery, clinic, footwear, electronics, clothing, others)

  builtUpArea: null, 
  carpetArea: null,
  entrenceWidth: null,  
  ceilingHeight: null,
  locatedNear: null, // static list ( Entrance, elevator, stair)
  ownership: null, //static list ( free hold, leashold, cooperative society, power of attorney)

  //Step 2 commercial
  
  //Floor Details
  totalFloor: null, //dynamic based on property details
  yourFloor: null, //Dropdown based on totalFloor
  privateParking: null,
  publicParking: null,

  //Financial
  price: null,
  isNegotiable: null,
  taxCharges: null,
  IsBrokerage: null,
  brokerageAmount: null,
  isBrokerageNegotiable: null,

  //Step 3 Amenites

  //Fecilities

  privateWashrooms: null,
  publicWashRooms: null,
  suitableBusiness: null, //static or dynamic list

  //amenitis
  amenities: null,
  description: null,
}

const commercial_rent_retail_shop = {
  //Step 1 commercial

  //Possesion Status ( Commercial flow )
  possestionStatus: null, //static list ( ready to move | under construction)
  availableFrom: null, // both
  ageOfProperty: null, // ready to move 

  //About the property ( Commercial flow )
  locationHub: null,  //dynamic list ( Mall, commercial project, residential project, retail complex/building, market/high street, other)
  otherLocationHub: null,
  zoneType: null,  //static list (jewellery, gym, grocery, clinic, footwear, electronics, clothing, others)

  builtUpArea: null, 
  carpetArea: null,
  entrenceWidth: null,  
  ceilingHeight: null,
  locatedNear: null, // static list ( Entrance, elevator, stair)
  ownership: null, //static list ( free hold, leashold, cooperative society, power of attorney)

  //Step 2 commercial
  
  //Floor Details
  totalFloor: null, //dynamic based on property details
  yourFloor: null, //Dropdown based on totalFloor
  privateParking: null,
  publicParking: null,

  //Financial
  expectedRent: null,
  isRentNegotiable: null,
  securityDeposite: null,
  isDepositeNegotiable: null,
  dg: null,
  electircity: null,
  water: null,
  rentIncrease: null,
  rentIncreaseAmount:  null,
  IsBrokerage: null,
  brokerageAmount: null,
  isBrokerageNegotiable: null,
  lockInPeriod: null,
  lockInperiodValue: null,

  //Step 3 Amenites

  //Fecilities

  privateWashrooms: null,
  publicWashRooms: null,
  suitableBusiness: null, //static or dynamic list

  //amenitis
  amenities: null,
  description: null,
} 

const commercial_sell_showroom = {
  //Step 1 commercial

  //Possesion Status ( Commercial flow )
  possestionStatus: null, //static list ( ready to move | under construction)
  availableFrom: null, // under construction
  ageOfProperty: null, // ready to move  

  //About the property ( Commercial flow )
  locationHub: null,  //dynamic list ( Mall, commercial project, residential project, retail complex/building, market/high street, other)
  otherLocationHub: null,
  zoneType: null,  //static list (jewellery, gym, grocery, clinic, footwear, electronics, clothing, others)

  builtUpArea: null, 
  carpetArea: null,
  entrenceWidth: null,  
  ceilingHeight: null,
  locatedNear: null, // static list ( Entrance, elevator, stair)
  ownership: null, //static list ( free hold, leashold, cooperative society, power of attorney)

  //Step 2 commercial
  
  //Floor Details
  totalFloor: null, //dynamic based on property details
  yourFloor: null, //Dropdown based on totalFloor
  privateParking: null,
  publicParking: null,

  //Financial
  price: null,
  isNegotiable: null,
  taxCharges: null,
  IsBrokerage: null,
  brokerageAmount: null,
  isBrokerageNegotiable: null,

  //Step 3 Amenites

  //Fecilities

  privateWashrooms: null,
  publicWashRooms: null,
  suitableBusiness: null, //static or dynamic list

  //amenitis
  amenities: null,
  description: null,
}

const commercial_rent_showroom = {
  //Step 1 commercial

  //Possesion Status ( Commercial flow )
  possestionStatus: null, //static list ( ready to move | under construction)
  availableFrom: null, // both
  ageOfProperty: null, // ready to move 

  //About the property ( Commercial flow )
  locationHub: null,  //dynamic list ( Mall, commercial project, residential project, retail complex/building, market/high street, other)
  otherLocationHub: null,
  zoneType: null,  //static list (jewellery, gym, grocery, clinic, footwear, electronics, clothing, others)

  builtUpArea: null, 
  carpetArea: null,
  entrenceWidth: null,  
  ceilingHeight: null,
  locatedNear: null, // static list ( Entrance, elevator, stair)
  ownership: null, //static list ( free hold, leashold, cooperative society, power of attorney)

  //Step 2 commercial
  
  //Floor Details
  totalFloor: null, //dynamic based on property details
  yourFloor: null, //Dropdown based on totalFloor
  privateParking: null,
  publicParking: null,

  //Financial
  expectedRent: null,
  isRentNegotiable: null,
  securityDeposite: null,
  isDepositeNegotiable: null,
  dg: null,
  electircity: null,
  water: null,
  rentIncrease: null,
  rentIncreaseAmount:  null,
  IsBrokerage: null,
  brokerageAmount: null,
  isBrokerageNegotiable: null,
  lockInPeriod: null,
  lockInperiodValue: null,

  //Step 3 Amenites

  //Fecilities

  privateWashrooms: null,
  publicWashRooms: null,
  suitableBusiness: null, //static or dynamic list ( need to confirm )

  //amenitis
  amenities: null,
  description: null,
}

const commercial_sell_warehouse = {
  //Step 1 commercial

  //Possesion Status ( Commercial flow )
  possestionStatus: null, //static list ( ready to move | under construction)
  availableFrom: null, // under construction
  ageOfProperty: null, // ready to move  

  //About the property ( Commercial flow )
  locationHub: null,  //dynamic list ( Mall, commercial project, residential project, retail complex/building, market/high street, other)
  otherLocationHub: null,
  zoneType: null,  //static list (jewellery, gym, grocery, clinic, footwear, electronics, clothing, others)

  builtUpArea: null, 
  carpetArea: null,
  ownership: null, //static list ( free hold, leashold, cooperative society, power of attorney)

  //Step 2 commercial
  
  //Floor Details
  totalFloor: null, //dynamic based on property details
  yourFloor: null, //Dropdown based on totalFloor
  privateParking: null,
  publicParking: null,

  //Financial
  price: null,
  isNegotiable: null,
  taxCharges: null,
  IsBrokerage: null,
  brokerageAmount: null,
  isBrokerageNegotiable: null,
  preLease: null, //( yes | no )
  currentRent: null,  //show if Yes selected
  leaseYear: null, //show if Yes selected
  expectedReturn: null, //show if no selected

  //Step 3 Amenites

  //Fecilities

  privateWashrooms: null,
  publicWashRooms: null,

  //amenitis
  amenities: null,
  description: null,
}

const commercial_rent_warehouse = {
  //Step 1 commercial

  //Possesion Status ( Commercial flow )
  possestionStatus: null, //static list ( ready to move | under construction)
  availableFrom: null, // both
  ageOfProperty: null, // ready to move 

  //About the property ( Commercial flow )
  locationHub: null,  //dynamic list ( Mall, commercial project, residential project, retail complex/building, market/high street, other)
  otherLocationHub: null,
  zoneType: null,  //static list (Industrial, commercial, residential, special economic zone, open spaces, agricultural zone, others)

  builtUpArea: null, 
  carpetArea: null,
  ownership: null, //static list ( free hold, leashold, cooperative society, power of attorney)

  //Step 2 commercial
  
  //Floor Details
  totalFloor: null, //dynamic based on property details
  yourFloor: null, //Dropdown based on totalFloor

  //Financial
  expectedRent: null,
  isRentNegotiable: null,
  securityDeposite: null,
  isDepositeNegotiable: null,
  electircity: null,
  water: null,
  rentIncrease: null,
  rentIncreaseAmount:  null,
  lockInPeriod: null,
  lockInperiodValue: null,

  //Step 3 Amenites

  //Fecilities

  privateWashrooms: null,
  publicWashRooms: null,

  //amenitis
  amenities: null,
  description: null,
}

const commercial_sell_plot = {
  //Step 1 commercial

  //Possesion Status ( Commercial flow )

  //About the property ( Commercial flow )
  zoneType: null,  //static list (Industrial, commercial, residential, special economic zone, open spaces, agricultural zone, others)
  plotArea: null, 
  suitableFor: null, //need to discuss
  ownership: null, //static list ( free hold, leashold, cooperative society, power of attorney)


  //Step 2 commercial

  //Financial
  price: null,
  isNegotiable: null,
  taxCharges: null,
  IsBrokerage: null,
  brokerageAmount: null,
  isBrokerageNegotiable: null,
  preLease: null, //( yes | no )
  currentRent: null,  //show if Yes selected
  leaseYear: null, //show if Yes selected
  expectedReturn: null, //show if no selected

  //Step 3 Amenites

  //amenitis
  amenities: null, // need to discuss
  description: null,
}

const commercial_rent_plot = {
  //Step 1 commercial

  //Possesion Status ( Commercial flow )
  availableFrom: null, 

  //About the property ( Commercial flow )
  zoneType: null,  //static list (Industrial, commercial, residential, special economic zone, open spaces, agricultural zone, others)
  plotArea: null, 
  suitableFor: null, //need to discuss
  ownership: null, //static list ( free hold, leashold, cooperative society, power of attorney)


  //Step 2 commercial

  //Financial
  expectedRent: null,
  isRentNegotiable: null,
  securityDeposite: null,
  isDepositeNegotiable: null,
  electircity: null,
  water: null,
  rentIncrease: null,
  rentIncreaseAmount:  null,
  lockInPeriod: null,
  lockInperiodValue: null,

  //Step 3 Amenites

  //amenitis
  amenities: null, // need to discuss
  description: null,
}

const commercial_sell_other = {
  //same like wherehouse
}

const commercial_rent_other = {
//same like wherehouse
}


const residential_rent_apartment = {
  //Step 1 
  room: null,  //based on
  otherRoom: null,
  builtUpArea: null,
  carpetArea: null,
  ageOfProperty: null,
  bathrooms: null,
  bedrooms: null,
  balconies: null,
  facing: null,

  //Step 2

  //Floor details
  totalFloor: null,
  floorNumber: null,
  flatNumber: null,
  towerNumber: null,
  propertyArea: null,

  //Rent details
  rentSuitableFor: null, // if bechelor then need to show one extra field
  bechelorPreference: null,
  rentAvailableFrom: null, //two option Immediatly and later
  possesionDate: null, // visible only for later rent available
  rent: null,
  maintenceCharge: null, //two option include in rent and seprate
  maintenceChargeValue: null, //visible only for seprate
  securityDeposite: null, // options and custom
  securityDepositeValue: null, //visible only for custom
  lockInPeriod: null,
  lockInPeriodValue: null, //visible only for custom
  brokerageCharge: null,
  brokerageChargeValue: null, //visible only for custom
}

const residential_sell_apartment = {
  
}

const postPropertyFormSlice = createSlice({
  name: 'postPropertyForm',
  initialState,
  reducers: {
    
  },
});

export const { } = postPropertyFormSlice.actions;
export default postPropertyFormSlice.reducer;

