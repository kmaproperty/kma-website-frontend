import axios, {
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { handleRefreshToken } from "./authService";
import { clearAuthCookies, setAuthCookies } from "@/lib/helper";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach access token
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const res = await fetch("/api/get-token");
    const { accessToken } = await res.json();
    // const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.log('error', error)
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle 401 and refresh token
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem("refreshToken");
    // const res = await fetch("/api/get-token");
    // const { refreshToken } = await res.json();

    // Prevent infinite retry loop
    console.log('error',error)
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      refreshToken
    ) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await handleRefreshToken();
        if (newAccessToken) {
          setAuthCookies(newAccessToken, refreshToken)
          localStorage.setItem("accessToken", newAccessToken);
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        }else{
          window.location.href = '/signup'
        }
      } catch (refreshError) {
        console.error("Token refresh failed", refreshError);
        localStorage.clear();
        clearAuthCookies()
        window.location.href = "/signup"
      }
    }else if(error.response?.status === 401){
      localStorage.clear();
      window.location.href = "/signup"
    }
    console.log('error in reject', error)
    return Promise.reject(error?.response?.data ?? error);
  }
);
