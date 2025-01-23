import apiClient from "@/api/api-client";
import { API_ENDPOINTS } from "@/constants/api";

import { ITasks } from "./types";

export const getTasks = async (): Promise<ITasks> => {
  const { data } = await apiClient.get(API_ENDPOINTS.GET.GET_TASKS);

  return data;
};
