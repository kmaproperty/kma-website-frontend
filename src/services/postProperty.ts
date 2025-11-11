import { axiosInstance } from "./axiosService";
import { PropertyCategoryResponse, PropertyListResponse, PropertyType } from "./masterService";


interface BHK {
    id?: string;
    name?: string;
    buildUpAreaSqFt?: number | null;
    carpetAreaSqFt?: number | null;
    noOfBathrooms?: number | null;
    noOfBedrooms?: number | null;
    balconies?: number | null;
}

interface Society {
    id?: string;
    name: string;
    localityName?: string;
    address?: string;
    pincode?: string;
    latitude?: number;
    longitude?: number | null;
  };

interface City {
    id?: string;
    name: string;
    state?: string;
    latitude?: number | null;
    longitude?: number | null;
    code?: number | null;
  };

interface Locality {
    id?: string;
    name: string;
    sector?: string;
    latitude?: number | null;
    longitude?: number | null;
  };

export interface Step1PostPropertyPayload {
  propertyId?: string;

  listingTypeId: string;
  categoryId: string;
  propertyTypeId: string;

  city: string | City;
  society: string | Society;
  locality: string | Locality;

  bhk: BHK;
  transactionType: string | null;
  constructionStatus: string | null;
  ageOfProperty: number;
  possessionBy?: string | null;
  possessionTime: string | null;
  possessionStatus?: string | null;
  possessionDate?: string | null;

  facing: string;
  status: string;

  plotArea: number | string | null;
  plotAreaUnit: string | null;
  plotLength: number | string | null;
  plotLengthUnit?: string | null;
  plotWidth: number | string | null;
  plotWidthUnit?: string | null;
  plotFacingRoadWidth: string | null;

  locationHub?: string | null;
  otherLocationHub?: string | null;

  zoneType?: string | null;
  propertyCondition?: string | null;
  wallConstructionStatus?: string | null;
  ownership?: string | null;

  builtUpArea?: number | null;
  builtUpAreaUnit?: string | null;
  carpetArea?: number | null;
  carpetAreaUnit?: string | null;

  suitableFor?: string[] | null;
  entranceWidth?: number | null;
  entranceWidthUnit?: string | null;
  ceilingHeight?: number | null;
  ceilingHeightUnit?: string | null;

  locatedNear?: string[] | null;
  plotLandType?: string | null;
  noOfOpenSides?: number | null;
  constructionDone?: string | null;
  constructionTypeOptions?: string[] | null;
}

export interface Step1PostPropertyResponse {
  id: string,
  status: string,
  completionStep: string,
}

export const step1PostPropertyCreateApiHandler = async (paylaod: Step1PostPropertyPayload) : Promise<Step1PostPropertyResponse> => {
    try{
        const response = await axiosInstance.post<Step1PostPropertyResponse>(
      "property/step-1", paylaod);

    return response.data;
    }catch(error: any){
        throw error.response?.data ?? error;
    }
}

export interface Step1DetailsPayload {
    propertyId : string;
}

export interface Step1DetailsResponse {
    propertyId: string;
    listingType: PropertyListResponse;
    category: PropertyCategoryResponse;
    propertyType: PropertyType;
    bhk: BHK;
    ageOfProperty: number;
    facing: string;
    status: "draft" | "published" | "archived" | string;
    city: City;
    society: Society;
    locality: Locality;
    transactionType: string | null;
    constructionStatus: string | null;
    possessionBy: string | null;
    possessionTime: string | null;
    plotArea: number | null;
    plotAreaUnit: string | null;
    plotLength: number | null;
    plotWidth: number | null;
    plotFacingRoadWidth: number | null;
    createdAt: string;
    updatedAt: string; 
    completionStep: number;
    progressPercentage: number;

    
    
    possessionStatus?: string | null;
    possessionDate?: string | null;

    plotWidthUnit?: string | null;

    locationHub?: string | null;
    otherLocationHub?: string | null;

    zoneType?: string | null;
    propertyCondition?: string | null;
    wallConstructionStatus?: string | null;
    ownership?: string | null;

    builtUpArea?: number | null;
    builtUpAreaUnit?: string | null;
    carpetArea?: number | null;
    carpetAreaUnit?: string | null;

    suitableFor?: string[] | null;
    entranceWidth?: number | null;
    entranceWidthUnit?: string | null;
    ceilingHeight?: number | null;
    ceilingHeightUnit?: string | null;

    locatedNear?: string[] | null;
    plotLandType?: string | null;
    noOfOpenSides?: number | null;
    constructionDone?: string | null;
    constructionTypeOptions?: string[] | null;
}

export const step1PostPropertyDetailsApiHandler = async (propertyId: string) : Promise<Step1DetailsResponse> => {
    try{
        const response = await axiosInstance.get<Step1DetailsResponse>(
      `property/step-1/${propertyId}`,);

    return response.data;
    }catch(error: any){
        throw error.response?.data ?? error;
    }
}

export interface Step2PostPropertyPayload {
  propertyId?: string | null;

  // Floor & Unit Details
  floorNumber?: number | null;
  totalFloors?: number | null;
  flatNumber?: string | null;
  towerBlock?: string | null;
  propertyAreaAcre?: number | null;

  // Rental Details
  tenantType?: string | null;
  companyOccupancy?: string | null;
  rentAvailability?: string | null;
  availableFromDate?: string | null;
  monthlyRent?: number | null;
  maintenanceType?: string | null;
  maintenanceChargeAmount?: number | null;
  securityDepositType?: string | null;
  securityDepositAmount?: number | null;
  lockInType?: string | null;
  lockInMonths?: number | null;
  brokerageType?: string | null;
  brokerageAmount?: number | null;
  isBrokerageNegotiable?: boolean | null;
  isRentNegotiable?: boolean | null;

  // Additional Charges & Utilities
  dgUpsChargeIncluded?: string | null;
  electricityChargeIncluded?: string | null;
  waterChargeIncluded?: string | null;
  taxGovtChargeIncluded?: string | null;
  expectedRentIncrease?: string | null;

  // Pre-Leased / Investment Info
  isPreLeasedRented?: string | null;
  currentRentPerMonth?: number | null;
  leaseYears?: number | null;

  // Pricing & Plot Details
  price?: number | null;
  plotArea?: number | null;
  plotAreaUnit?: string | null;
  plotNumber?: string | null;
  houseNumber?: string | null;
  villaNumber?: string | null;
  plotPrice?: number | null;

  // Property Transaction & Status
  transactionType?: string | null;
  possessionStatus?: string | null;
  possessionDate?: string | null;
  ageOfProperty?: number | null;
  brokerage?: string | null;
  loanAvailable?: string | null;
  facing?: string | null;
  boundaryWall?: string | null;
  noOfOpenSides?: number | null;
  floorsAllowedForConstruction?: number | null;
  constructionDone?: string | null;
  constructionType?: string | null;
  cornerProperty?: string | null;
  propertyDescription?: string | null;

  // Structural / Facilities Info
  noOfStaircases?: number | null;
  privateParking?: number | null;
  privateWashrooms?: number | null;
  publicParking?: number | null;
  publicWashrooms?: number | null;
}


export interface Step2PostPropertyResponse {
  id: string,
  status: string,
  completionStep: string,
}

export const step2PostPropertyCreateApiHandler = async (paylaod: Step2PostPropertyPayload) : Promise<Step2PostPropertyResponse> => {
    try{
        const response = await axiosInstance.post<Step2PostPropertyResponse>(
      "property/step-2", paylaod);

    return response.data;
    }catch(error: any){
        throw error.response?.data ?? error;
    }
}

export interface Step2DetailsResponse {
  propertyId: string | null;
  floorNumber: number | null;
  totalFloors: number | null;
  flatNumber: string | null;
  towerBlock: string | null;
  propertyAreaAcre: number | null;
  tenantType: string | null;
  companyOccupancy: string | null;
  rentAvailability: string | null;
  availableFromDate: string | null;
  monthlyRent: number | null;
  maintenanceType: string | null;
  maintenanceChargeAmount: number | null;
  securityDepositType: string | null;
  securityDepositAmount: number | null;
  lockInType: string | null;
  lockInMonths: number | null;
  brokerageType: string | null;
  brokerageAmount: number | null;
  isBrokerageNegotiable: boolean | null;
  price: number | null;
  plotArea: number | null;
  plotAreaUnit: string | null;
  plotNumber: string | null;
  houseNumber: string | null;
  villaNumber: string | null;
  transactionType: string | null;
  possessionStatus: string | null;
  ageOfProperty: string | null;
  possessionDate: string | null;
  plotPrice: number | null;
  brokerage: string | null;
  loanAvailable: string | null;
  facing: string | null;
  boundaryWall: string | null;
  noOfOpenSides: number | null;
  floorsAllowedForConstruction: number | null;
  constructionDone: string | null;
  constructionType: string | null;
  cornerProperty: string | null;
  propertyDescription: string | null;
  status: string | null;
  completionStep: number | null;
  createdAt: string | null;
  updatedAt: string | null;
  progressPercentage: number;

  noOfStaircases: string | null,
  privateParking: string | null,
  publicParking: string | null,
  isRentNegotiable: boolean | null,
  dgUpsChargeIncluded: string | null,
  electricityChargeIncluded: string | null,
  waterChargeIncluded: string | null,
  expectedRentIncrease: string | null,
  taxGovtChargeIncluded: string | null,
  isPreLeasedRented: string | null,
  leaseYears: string | null,
  currentRentPerMonth: string | null,
  privateWashrooms: string | null,
  publicWashrooms: string | null,
}


export const step2PostPropertyDetailsApiHandler = async (propertyId: string) : Promise<Step2DetailsResponse> => {
    try{
        const response = await axiosInstance.get<Step2DetailsResponse>(
      `property/step-2/${propertyId}`,);

    return response.data;
    }catch(error: any){
        throw error.response?.data ?? error;
    }
}

export interface Step3PostPropertyPayload {
  propertyId: string | null;
  additionalRooms: string[] | null;
  reservedParkingCovered: number | null;
  reservedParkingOpen: number | null;
  powerBackup: string | null;
  furnishType: string | null;
  furnishingsCounts?: {
    item: string | null;
    count: number | null;
  }[] | null;
  amenities?: string[] | null;
  propertyDescription?: string | null;
  waterSource?: string | null;
  isLiftAvailable?: boolean | null;
}

export interface Step3PostPropertyResponse {
  message: string;
}

export const step3PostPropertyCreateApiHandler = async (paylaod: Step2PostPropertyPayload) : Promise<Step3PostPropertyResponse> => {
    try{
        const response = await axiosInstance.post<Step3PostPropertyResponse>(
      "property/step-3", paylaod);

    return response.data;
    }catch(error: any){
        throw error.response?.data ?? error;
    }
}

export interface Step3DetailsResponse {
  propertyId: string | null;
  additionalRooms: string[] | null;
  reservedParkingCovered: number | null;
  reservedParkingOpen: number | null;
  powerBackup: string | null;
  furnishType: string | null;
  furnishingsCounts: {
    item: string | null;
    count: number | null;
  }[] | null;
  amenities: string[] | null;
  waterSource: string | null;
  isLiftAvailable: boolean | null;
  propertyDescription: string | null;
  status: string | null;
  completionStep: number | null;
  progressPercentage: number | null;
}

export const step3PostPropertyDetailsApiHandler = async (propertyId: string) : Promise<Step3DetailsResponse> => {
    try{
        const response = await axiosInstance.get<Step3DetailsResponse>(
      `property/step-3/${propertyId}`,);

    return response.data;
    }catch(error: any){
        throw error.response?.data ?? error;
    }
}

export interface Step4PostPropertyPayload {

}

export interface Step4PostPropertyResponse {
  message: string
}

export const step4PostPropertyCreateApiHandler = async (paylaod: Step4PostPropertyPayload) : Promise<Step4PostPropertyResponse> => {
    try{
        const response = await axiosInstance.post<Step4PostPropertyResponse>(
      "property/step-4", paylaod);

    return response.data;
    }catch(error: any){
        throw error.response?.data ?? error;
    }
}

export interface Step4DetailsResponse {
  propertyId: string;
  photos: Array<{
    view: string | null;
    fileKey: string;
    isCoverImage: boolean;
  }>;
  videos: Array<{
    fileKey?: string | null;
    format?: string | null;
  }>;
  status: string;
  completionStep: number;
  progressPercentage: number;
}
export const step4PostPropertyDetailsApiHandler = async (propertyId: string) : Promise<Step4DetailsResponse> => {
    try{
        const response = await axiosInstance.get<Step4DetailsResponse>(
      `property/step-4/${propertyId}`,);

    return response.data;
    }catch(error: any){
        throw error.response?.data ?? error;
    }
}