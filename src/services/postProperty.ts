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
  ageOfProperty: number;
  facing: string;
  status: 'draft' | 'published' | 'archived' | string;
  transactionType: string | null;
  constructionStatus: string | null;
  possessionTime: string | null;
  plotArea: string | null;
  plotAreaUnit: string | null;
  plotLength: string | null;
  plotWidth: string | null;
  plotFacingRoadWidth: string | null;
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
  floorNumber?: number | null;
  totalFloors?: number | null;
  flatNumber?: string | null;
  towerBlock?: string | null;
  propertyAreaAcre?: number | null;
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
  price?: number | null;
  plotArea?: number | null;
  plotAreaUnit?: string | null;
  plotNumber?: string | null;
  houseNumber?: string | null;
  villaNumber?: string | null;
  transactionType?: string | null;
  possessionStatus?: string | null;
  possessionDate?: string | null;
  plotPrice?: number | null;
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