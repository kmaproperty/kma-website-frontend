import axios, {
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { handleRefreshToken } from "./authService";
import { clearAuthCookies, setAuthCookies } from "@/lib/helper";
import { useSessionStore } from "@/store/useSessionStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const createCorrelationId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach access token
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // const sessionId = useSessionStore.getState().sessionId;
    const res = await fetch("/api/get-token");
    const { accessToken } = await res.json();
    // const accessToken = localStorage.getItem("accessToken");
    // if (sessionId) {
    //   config.headers["X-Session-Id"] = sessionId;
    // }
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    config.headers["x-correlation-id"] = createCorrelationId();
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
    // const res = await fetch("/api/get-token");
    // const { refreshToken } = await res.json();

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
      clearAuthCookies()
      window.location.href = "/signup"
    }
    return Promise.reject(error?.response?.data ?? error);
  }
);
