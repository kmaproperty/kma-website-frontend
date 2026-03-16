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
  allCities: City[];
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
    rating?: number | string | null;
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
export interface User {
    id: string,
    name: string,
    email: string,
    profileImage: string,
}
export interface Rating {
    id: string;
    rating: string;
    review: string;
    name: string;
    endUser: User | null;
    createdAt: string
}

export interface GetUserReviewApiHandlerResponse {
    success: true,
    reviews: Rating[],
    statistics: {
        totalCount: number,
        averageRating: number
    },
    trustedByText: string
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

export interface GetAboutUsSectionResponse {
    success: boolean;
    aboutUs: {
        heading: string;
        description: string;
    };
    statistics: {
        totalOwners: number;
        totalChannelPartners: number;
        totalUsers: number;
        totalActiveProperties: number;
        propertiesListedLast24Hours: number;
    }
}
export const getAboutUsSectionDataApiResponse = async () : Promise<GetAboutUsSectionResponse> => {
    try{
        const response = await axiosInstance.get<GetAboutUsSectionResponse>(
      "end-user/home/about-us");

    return response.data;
    }catch(error: any){
        throw error.response?.data ?? error;
    }
}   

export interface AboutusResponse {
  success: boolean;
  configuration: {
    id: string;
    mobileAppAvailable: boolean;
    description: string;
    phoneNumber: string;
    email: string;
    address: string;
    latitude: number;
    longitude: number;
    instagramLink: string;
    fbLink: string;
    youtubeLink: string;
    twitterLink: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
  };
}

export const getAboutUsDataAPiHanlder = async () : Promise<AboutusResponse> => {
    try{
        const response = await axiosInstance.get<AboutusResponse>(
      "end-user/configurations");

    return response.data;
    }catch(error: any){
        throw error.response?.data ?? error;
    }
}


export interface GetExplorePayload {
    cityId?: string | null,
    propertyTypeId?: string | null,
    listingTypeId?: string | null,
}

export interface PropertyType {
    id: string;
    name: string;
    code: string;
    propertyCount: number
}
export interface GetExploreResponse {
    success: boolean;
    propertyTypes: PropertyType[]
}

export const getExploreApiHanlder = async ({cityId, propertyTypeId, listingTypeId}: GetExplorePayload) : Promise<GetExploreResponse> => {
    try{
        const response = await axiosInstance.get<GetExploreResponse>(
      "end-user/property-types/explore", {
        params: {cityId, propertyTypeId, listingTypeId}
      });

    return response.data;
    }catch(error: any){
        throw error.response?.data ?? error;
    }
}

export interface GetTopPropertiesPayload {
    cityId: string | null
}
export interface PropertyDetails {
    id: string;
    propertyName: string;
    address: string;
    description: number;
    imageUrl: string;
    images: {
        fileKey: string;
        view: string;
        isCoverImage: string;
    }[];
    videos: {
        fileKey: string;
        format: string;
    };
    isReraRegistered: boolean;
    constructionStatus: string;
    category: string;
    listingType: string;
    propertyType: string;
    bhkType: string;
    plotArea: number;
    plotAreaUnit: string;
    facing: string;
    furnishType: string;
    videoCount: string;
    imageCount: string;
    price: number;
    monthlyRent: number;
    city: string;
    society: string;
    locality: string;
    units: {
        unit: string;
        size: string;
        price: string;
    }[],
    owner: string;
    isFavorite: boolean
}

export interface GetTopPropertiesResponse {
    success: boolean;
    properties: PropertyDetails[];
    total: number
}

export const getTopProperties = async ({cityId}: GetTopPropertiesPayload) : Promise<GetTopPropertiesResponse> => {
    try{
        const response = await axiosInstance.get<GetTopPropertiesResponse>(
      "end-user/top-properties", {
        params: {cityId}
      });

    return response.data;
    }catch(error: any){
        throw error.response?.data ?? error;
    }
}

export interface GetPropertiesCountPayload {
    page?: string;
    limit?: string;
    cityId?: string;
    search?: string;
    categoryIds?: string;
    listingTypeIds?: string;
    propertyTypeIds?: string;
    bhkTypeIds?: string;
    furnishingTypes?: string;
    constructionStatuses?: string;
    minPrice?: string;
    maxPrice?: string;
    latitude?: string;
    longitude?: string;
    radius?: string;
    sortBy?: string;
    sortOrder?: string;
    postedBy?: string
}

export interface GetPropertiesCountResponse {
    success: boolean;
    count: number
}

export const getPropertiesCountApiHandler = async ({page,limit,cityId,search,listingTypeIds, categoryIds, propertyTypeIds, bhkTypeIds, furnishingTypes, constructionStatuses, minPrice, maxPrice, latitude, longitude, radius, sortBy, sortOrder, postedBy }: GetPropertiesCountPayload) : Promise<GetPropertiesCountResponse> => {
    try{
        const response = await axiosInstance.get<GetPropertiesCountResponse>(
      "end-user/properties/count", {
        params: {cityId, search, listingTypeIds, categoryIds, propertyTypeIds, bhkTypeIds, furnishingTypes, constructionStatuses, minPrice, maxPrice, latitude, longitude, radius, sortBy, sortOrder, postedBy}
      });

    return response.data;
    }catch(error: any){
        throw error.response?.data ?? error;
    }
}