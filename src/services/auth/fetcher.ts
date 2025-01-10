import Cookies from "js-cookie";

import apiClient from "@/api/api-client";
import { API_ENDPOINTS, AUTH_COOKIE_TOKEN } from "@/constants/api";

const login = async (initData: string) => {
  try {
    const { data } = await apiClient.post(API_ENDPOINTS.POST.AUTH, {
      initDataRaw: initData,
    });

    if (data.userToken) {
      Cookies.set(AUTH_COOKIE_TOKEN, data.userToken, { expires: 7 });
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
};

export { login };
