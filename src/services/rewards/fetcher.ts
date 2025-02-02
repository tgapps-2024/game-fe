import apiClient from "@/api/api-client";
import { API_ENDPOINTS } from "@/constants/api";

import { IDailyReward, IDailyRewardInfo, IRewardsEarn } from "./types";

export const getRewardsEarn = async (): Promise<IRewardsEarn> => {
  const { data } = await apiClient.get(API_ENDPOINTS.GET.GET_REWARDS_EARN);

  return data;
};

export const getDailyInfo = async (): Promise<IDailyRewardInfo> => {
  const { data } = await apiClient.get(API_ENDPOINTS.GET.GET_DAILY_INFO);

  return data;
};

export const getDailyReward = async (): Promise<IDailyReward> => {
  const { data } = await apiClient.get(API_ENDPOINTS.GET.GET_DAILY_REWARD);

  return data;
};
