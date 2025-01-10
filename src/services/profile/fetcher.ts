import apiClient from "@/api/api-client";
import { API_ENDPOINTS } from "@/constants/api";

import { IProfile } from "./types";

export const getProfile = async (): Promise<IProfile> => {
  const { data } = await apiClient.get(API_ENDPOINTS.GET.GET_PROFILE);

  return data;
};
