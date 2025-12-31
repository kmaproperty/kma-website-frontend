import { UserType } from "@/types/user";
import { axiosInstance } from "./axiosService";
import { step1_live_photo, step2_aadhaar, step3_bank_details, step4_docusign_agreement } from "./kycService";

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

interface kycstatus {
  kyc_completed: boolean
   step1_live_photo: step1_live_photo,
   step2_aadhaar: step2_aadhaar,
   step3_bank_details: step3_bank_details,
   step4_docusign_agreement: step4_docusign_agreement,
}
export interface UserDashboardDetailsResponse {
  name: string;
  role: UserType;
  plan: "FREE" | "PRO" | "ENTERPRISE";
  kycStatus: kycstatus,
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

export interface UpgreadOwnerToChannelPartnerPayload {
  channelPartnerCode: string;
}
export interface UpgreadOwnerToChannelPartnerResponse {
  message: string
}

export const UpgreadOwnerToChannelPartnerApiHandler = async (paylaod: UpgreadOwnerToChannelPartnerPayload) : Promise<UpgreadOwnerToChannelPartnerResponse> => {
    try{
        const response = await axiosInstance.post<UpgreadOwnerToChannelPartnerResponse>(
      "users/upgrade-channel-partner", paylaod);

    return response.data;
    }catch(error: any){
        throw error.response?.data ?? error;
    }
}

export interface UserLogoutResponse {
  message: string;
  success: boolean
}

export const UserLogoutApiHandler = async () : Promise<UserLogoutResponse> => {
    try{
        const response = await axiosInstance.post<UserLogoutResponse>(
      "users/logout");

    return response.data;
    }catch(error: any){
        throw error.response?.data ?? error;
    }
}

export interface ChannelPartnerAgreementResponse {
  message: string;
  success: boolean;
  envelopeId: string;
  url: string;
}

export const ChannelPartnerAgreementApiHandler = async (returnUrl: string) : Promise<ChannelPartnerAgreementResponse> => {
    try{
        const response = await axiosInstance.post<ChannelPartnerAgreementResponse>(
      "users/docusign/channel-partner-agreement", {returnUrl});

    return response.data;
    }catch(error: any){
        throw error.response?.data ?? error;
    }
}

export interface ValidateEmailPayload {
  email: string
}

export interface ValidateEmailResponse {
  message: string;
  success: boolean;
}

export const validateEmailApiHandler = async (paylaod: ValidateEmailPayload) : Promise<ValidateEmailResponse> => {
    try{
        const response = await axiosInstance.post<ValidateEmailResponse>(
      "users/check-duplicate-email", paylaod);

    return response.data;
    }catch(error: any){
        throw error.response?.data ?? error;
    }
}