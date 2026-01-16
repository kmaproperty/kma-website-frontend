import { UserType } from "@/types/user";
import { axiosInstance } from "./axiosService";
import { step1_live_photo, step2_aadhaar, step3_bank_details, step4_docusign_agreement } from "./kycService";
import { KYC_STATUS } from "@/lib/enums";

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
   kyc_completed: boolean,
   kyc_progress: number
    kyc_status: keyof typeof KYC_STATUS
    kyc_steps_completed: number
    kyc_total_steps: number
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
  firmName: string;
  businessSince: string;
  aboutYourSelf: string;
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

export interface user {
  "id": string,
  "name": string,
  "email": string,
  "phone": string,
  "role": string,
  "isActive": boolean,
  "phoneVerified": boolean,
  "city": string | null,
  "channelPartnerCode": string,
  "firmName": string | null,
  "businessSince": string | null,
  "cities": string,
  "aboutYourSelf": string | null,
  "profileImage": string
}
export interface UserProfileResponse {
  success: boolean;
  user: user
}

export const userProfileApiHandler = async () : Promise<UserProfileResponse> => {
    try{
        const response = await axiosInstance.get<UserProfileResponse>(
      "users/profile");

    return response.data;
    }catch(error: any){
        throw error.response?.data ?? error;
    }
}

export interface UserProfileUpdatePayload {
  "name"?: string,
  "email"?: string,
  "city"?: string,
  "channelPartnerCode"?: string,
  "firmName"?: string,
  "businessSince"?: string,
  "cities"?: string,
  "aboutYourSelf"?: string,
  "profileImage"?: string
}

export interface UserProfileUpdateResponse {
  success: boolean,
  message: string
}

export const userProfileUpdateApiHandler = async (payload: UserProfileUpdatePayload) : Promise<UserProfileUpdateResponse> => {
    try{
        const response = await axiosInstance.put<UserProfileUpdateResponse>(
      "users/profile", payload);

    return response.data;
    }catch(error: any){
        throw error.response?.data ?? error;
    }
}