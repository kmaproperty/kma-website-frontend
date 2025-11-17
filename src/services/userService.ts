import { UserType } from "@/types/user";
import { axiosInstance } from "./axiosService";

export interface ContactDetailsPayload {
    firstName: string;
    lastName: string;
    email?: string;
    phoneNumber: string;
    message?: string
}

export interface ContactDetailsResponse {
  success: boolean;
  message: string;
  contactId: string;
}

export const CreateContactDetailsApiHandler = async (paylaod: ContactDetailsPayload) : Promise<ContactDetailsResponse> => {
    try{
        const response = await axiosInstance.post<ContactDetailsResponse>(
      "contact-us", paylaod);

    return response.data;
    }catch(error: any){
        throw error.response?.data ?? error;
    }
}

export interface ValidateChannelPartnerCodePayload {
  code: string
}

export interface ValidateChannelPartnerCodeResponse {
  success: boolean;
  valid: boolean;
  message: string
}

export const ValidateChannelPartnerCodeApiHandler = async (paylaod: ValidateChannelPartnerCodePayload) : Promise<ValidateChannelPartnerCodeResponse> => {
    try{
        const response = await axiosInstance.get<ValidateChannelPartnerCodeResponse>(
      "channel-partner-codes/validate", {
        params: paylaod
      });

    return response.data;
    }catch(error: any){
        throw error.response?.data ?? error;
    }
}

export interface UserDashboardDetailsResponse {
  name: string;
  role: UserType;
  plan: "FREE" | "PRO" | "ENTERPRISE";
  freeListings: {
    used: number;
    total: number;
    remaining: number;
    isUnlimited: boolean;
  };
  leadsSummary: {
    lastDay: {
      residential: number;
      commercial: number;
    };
    lastWeek: {
      residential: number;
      commercial: number;
    };
    lastMonth: {
      residential: number;
      commercial: number;
    };
  };
}

export const UserDashboardDetailsApiHandler = async () : Promise<UserDashboardDetailsResponse> => {
    try{
        const response = await axiosInstance.get<UserDashboardDetailsResponse>(
      "users/dashboard");

    return response.data;
    }catch(error: any){
        throw error.response?.data ?? error;
    }
}