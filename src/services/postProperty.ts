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