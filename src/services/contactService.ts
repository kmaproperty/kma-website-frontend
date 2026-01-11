import axios, { AxiosResponse } from "axios";
import { axiosInstance } from "./axiosService";

export interface SubmitFormPayload {
    firstName: string;
    email: string;
    phoneNumber: string;
    message?: string;
}

export interface SubmitFormResponse {
  message: string;
  success: string;
  contactId: string
}


export const submitContactForm = async (
  payload: SubmitFormPayload
): Promise<SubmitFormResponse> => {
  try {
    const response = await axiosInstance.post<SubmitFormResponse>(
      "contact-us",
      payload
    );

    return response.data;
  } catch (error: any) {
    throw error.response?.data ?? error;
  }
};