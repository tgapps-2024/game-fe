import axios from "axios";
import Cookies from "js-cookie";

import { AUTH_COOKIE_TOKEN } from "@/constants/api";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = Cookies.get(AUTH_COOKIE_TOKEN);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default apiClient;
