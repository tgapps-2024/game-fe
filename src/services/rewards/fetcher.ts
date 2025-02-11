import apiClient from "@/api/api-client";
import { API_ENDPOINTS } from "@/constants/api";

import {
  IBoosters,
  IDailyReward,
  IDailyRewardInfo,
  IRewardsEarn,
  UpgradeBoosterType,
} from "./types";

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

export const getBoosters = async (): Promise<IBoosters> => {
  const { data } = await apiClient.get(API_ENDPOINTS.GET.GET_BOOSTERS);

  return data;
};

export const getFullBooster = async (): Promise<{ status: string }> => {
  const { data } = await apiClient.get(API_ENDPOINTS.GET.USE_FULL_BOOSTER);

  return data;
};

export const getTempEnergyBooster = async (): Promise<{ status: string }> => {
  const { data } = await apiClient.get(
    API_ENDPOINTS.GET.USE_TEMP_ENERGY_BOOSTER,
  );

  return data;
};

export const getUpgradeBooster = async (
  type: UpgradeBoosterType,
): Promise<{ status: string }> => {
  const { data } = await apiClient.post(API_ENDPOINTS.GET.UPGRADE_BOOSTER, {
    btype: type,
  });

  return data;
};
