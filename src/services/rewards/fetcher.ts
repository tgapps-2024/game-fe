import apiClient from "@/api/api-client";
import { API_ENDPOINTS } from "@/constants/api";

import { IRewardsEarn } from "./types";

export const getRewardsEarn = async (): Promise<IRewardsEarn> => {
  const { data } = await apiClient.get(API_ENDPOINTS.GET.GET_REWARDS_EARN);

  return data;
};
