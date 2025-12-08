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
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle 401 and refresh token
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem("refreshToken");

    // Prevent infinite retry loop
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
        }
      } catch (refreshError) {
        console.error("Token refresh failed", refreshError);
        localStorage.clear();
        clearAuthCookies()
        window.location.href = "/"
      }
    }

    return Promise.reject(error?.response?.data ?? error);
  }
);
