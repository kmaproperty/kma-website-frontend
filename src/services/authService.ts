import axios, { AxiosResponse } from "axios";
import { axiosInstance } from "./axiosService";
import { PropertyType, UserType } from "@/types/user";

export interface OtpPayload {
    phone: string;
    role: string;
}

export interface SendOtpResponse {
  message: string;
  success: string;
  otp: string
}


export const sendSignUpOtpApiHandler = async (
  payload: OtpPayload
): Promise<SendOtpResponse> => {
  try {
    const response = await axiosInstance.post<SendOtpResponse>(
      "users/signup/send-otp",
      payload
    );

    return response.data;
  } catch (error: any) {
    throw error.response?.data ?? error;
  }
};

export const sendSignInOtpApiHandler = async (
  payload: OtpPayload
): Promise<SendOtpResponse> => {
  try {
    const response = await axiosInstance.post<SendOtpResponse>(
      "users/login/send-otp",
      payload
    );

    return response.data;
  } catch (error: any) {
    throw error.response?.data ?? error;
  }
};

export interface ValidateOtpPayload {
    phone: string;
    otp: string;
    role?: UserType
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserType
  isActive: boolean;
}

export interface ValidateOtpResponse {
  success: boolean;
  message: string;
  requiredOtherDetails: boolean;
  userId: string;
  accessToken: string;
  refreshToken: string;
  user: User;
}

export const validateOtpApiHandler = async (payload: ValidateOtpPayload) : Promise<ValidateOtpResponse> => {
    try{
        const response = await axiosInstance.post<ValidateOtpResponse>(
      "users/validate-otp",
      payload
    );

    return response.data;
    }catch(error: any){
        throw error.response?.data ?? error;
    }
}

export const resendOtpApiHandler = async (payload: OtpPayload) : Promise<SendOtpResponse> => {
    try{
        const response = await axiosInstance.post<SendOtpResponse>(
      "users/resend-otp",
      payload
    );

    return response.data;
    }catch(error: any){
        throw error.response?.data ?? error;
    }
}

export interface CreateOwnerPayload {
    name: string;
    email: string;
    phone: string;
    intent: PropertyType
}

export interface CreateOwnerResponse {
  success: boolean;
  message: string;
  userId: string;
  user: User;
}

export const createOwnerApiHandler = async (payload: CreateOwnerPayload) : Promise<CreateOwnerResponse> => {
    try{
        const response = await axiosInstance.post<CreateOwnerResponse>(
      "users/create-owner",
      payload
    );

    return response.data;
    }catch(error: any){
        throw error.response?.data ?? error;
    }
}

export interface CreateChannelPartnerPayload {
    name: string;
    email: string;
    phone: string;
    channelPartnerCode: string;
    firmName: string;
    businessSince: string;
    cities: string;
    aboutYourSelf: string;
    intent: PropertyType
}

export const createChannelPartnerApiHandler = async (payload: CreateChannelPartnerPayload) : Promise<CreateOwnerResponse> => {
    try{
        const response = await axiosInstance.post<CreateOwnerResponse>(
      "users/create-channel-partner",
      payload
    );

    return response.data;
    }catch(error: any){
        throw error.response?.data ?? error;
    }
}
export const handleRefreshToken = async (): Promise<string | null> => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) return null;

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
      { refreshToken },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const newAccessToken = response?.data?.accessToken;

    if (newAccessToken) {
      return newAccessToken;
    }

    return null;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
};
