import { axiosInstance } from "./axiosService";

export interface CitiesResponse {
  success: boolean;
  message: string;
  data: string[];
}

export const getCityApiHandler = async () : Promise<CitiesResponse> => {
    try{
        const response = await axiosInstance.get<CitiesResponse>(
      "users/cities");

    return response.data;
    }catch(error: any){
        throw error.response?.data ?? error;
    }
}