import { axiosInstance } from "./axiosService";

export interface City {
    id: string;
    name: string;
    code: string;
    state: string;
    icon: string;
    latitude: number;
    longitude: number;
}

export interface CitiesPayload {
    search?: string | null,
    latitude?: string | null,
    longitude?: string | null,
}
export interface CitiesResponse {
  success: boolean;
  featuredCities: City[];
  detectedCity: City | null;
}

export const getCityListApiHandler = async ({search, latitude, longitude}: CitiesPayload) : Promise<CitiesResponse> => {
    try{
        const response = await axiosInstance.get<CitiesResponse>(
      "end-user/home/cities", {
        params: {search, latitude, longitude}
      });

    return response.data;
    }catch(error: any){
        throw error.response?.data ?? error;
    }
}

export interface PropertyUnit {
  unit: string;
  size: string;
  price: string;
}

export interface Property {
  id: string;
  propertyName: string;
  address: string;
  description: string;
  imageUrl: string;
  isReraRegistered: boolean;
  constructionStatus: string;
  category: string;
  propertyType: string;
  bhkType: string;
  price: number;
  monthlyRent: number;
  city: string;
  society: string;
  locality: string;
  units: PropertyUnit[];
}

export interface TopPropertiesPayload {
    city: string
}

export interface TopPropertiesResponse {
    success: boolean;
    properties: Property[];
    total: number
}

export const topPropertiesApiHandler = async ({city}: TopPropertiesPayload) : Promise<TopPropertiesResponse> => {
    try{
        const response = await axiosInstance.get<TopPropertiesResponse>(
      "end-user/top-properties", {
        params: {city}
      });

    return response.data;
    }catch(error: any){
        throw error.response?.data ?? error;
    }
}

export interface TopCity {
  id: string;
  name: string;
  code: string;
  state: string;
  latitude: number;
  longitude: number;
  imageUrl: string | null;
  propertyCount: number;
}

export interface TopCitiesResponse {
    success: boolean;
    cities: TopCity[];
}

export const topCitiesApiHandler = async () : Promise<TopCitiesResponse> => {
    try{
        const response = await axiosInstance.get<TopCitiesResponse>(
      "end-user/top-cities");

    return response.data;
    }catch(error: any){
        throw error.response?.data ?? error;
    }
}

export interface GetChannelPartnerListPayload {
    search: string | null,
    city: string | null,
    experience: string | null,
    properties?: string | null,
    page: string | null,
    limit: string | null,
}

export interface ChannelPartner {
    id: string;
    name: string;
    firm_name: string;
    profile_image: string;
    cities: string;
    experience_years: number;
    property_count: number;
}

export interface GetChannelPartnerListResponse {
    success: boolean;
    data: ChannelPartner[],
    pagination: {
        page: number,
        limit: number,
        total: number,
        totalPages: number
    }
}

export const getChannelPartnerListApiHandler = async ({search, city, experience, properties,page,limit}: GetChannelPartnerListPayload) : Promise<GetChannelPartnerListResponse> => {
    try{
        const response = await axiosInstance.get<GetChannelPartnerListResponse>(
      "end-user/channel-partners", {
        params: {search, city, experience, properties,page,limit}
      });

    return response.data;
    }catch(error: any){
        throw error.response?.data ?? error;
    }
}

export interface Rating {
    id: string;
    rating: string;
    review: string;
    name: string;
    endUser: string | null;
    createdAt: string
}

export interface GetUserReviewApiHandlerResponse {
    success: true,
    reviews: Rating[],
    statistics: {
        totalCount: number,
        averageRating: number
    }
}

export const getUserReviewApiHandler = async () : Promise<GetUserReviewApiHandlerResponse> => {
    try{
        const response = await axiosInstance.get<GetUserReviewApiHandlerResponse>(
      "end-user/home/reviews");

    return response.data;
    }catch(error: any){
        throw error.response?.data ?? error;
    }
}

export interface PropertyType {
    id: string;
    name: string;
    code: string;
}
export interface Categories {
    id: string;
    name: string;
    code: string;
    propertyTypes: PropertyType[]
}
export interface PropertyData {
    id: string;
    name: string;
    code: string;
    categories: Categories[]
}

export interface GetPropertyMasterDataResponse {
    success: boolean;
    message: string;
    data: PropertyData[]
}
export const getPropertyMasterDataApiHandler = async () : Promise<GetPropertyMasterDataResponse> => {
    try{
        const response = await axiosInstance.get<GetPropertyMasterDataResponse>(
      "end-user/property-master-data");

    return response.data;
    }catch(error: any){
        throw error.response?.data ?? error;
    }
}   