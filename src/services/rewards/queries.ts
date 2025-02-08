import Cookies from "js-cookie";

import { validateToken } from "@/api/helpers";
import { AUTH_COOKIE_TOKEN, STALE_TIME } from "@/constants/api";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

import { invalidateProfileQuery } from "../profile/queries";

import {
  getBoosters,
  getDailyInfo,
  getDailyReward,
  getFullBooster,
  getRewardsEarn,
  getTempEnergyBooster,
  getUpgradeBooster,
} from "./fetcher";
import { UpgradeBoosterType } from "./types";

enum QueryKeys {
  GET_REWARDS_EARN = "GET_REWARDS_EARN",
  GET_DAILY_INFO = "GET_DAILY_INFO",
  GET_DAILY_REWARD = "GET_DAILY_REWARD",
  GET_BOOSTERS = "GET_BOOSTERS",
  USE_FULL_BOOSTER = "USE_FULL_BOOSTER",
  USE_TEMP_ENERGY_BOOSTER = "USE_TEMP_ENERGY_BOOSTER",
  UPGRADE_BOOSTER = "UPGRADE_BOOSTER",
}

export const useGetRewardsEarn = () =>
  useMutation({
    mutationKey: [QueryKeys.GET_REWARDS_EARN],
    mutationFn: async () => getRewardsEarn(),
    onSuccess: () => {},
  });

export const useGetDailyRewardInfo = () =>
  useQuery({
    queryKey: [QueryKeys.GET_DAILY_INFO],
    queryFn: async () => {
      validateToken();
      return getDailyInfo();
    },
    enabled: !!Cookies.get(AUTH_COOKIE_TOKEN),
    retry: false,
  });

export const useGetDailyReward = (queryClient: QueryClient) =>
  useMutation({
    mutationKey: [QueryKeys.GET_DAILY_REWARD],
    mutationFn: async () => getDailyReward(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_DAILY_INFO] });
      invalidateProfileQuery(queryClient);
    },
  });

export const useGetBoosters = () =>
  useQuery({
    queryKey: [QueryKeys.GET_BOOSTERS],
    queryFn: async () => getBoosters(),
    enabled: !!Cookies.get(AUTH_COOKIE_TOKEN),
    staleTime: STALE_TIME,
  });

export const useFullBooster = (queryClient: QueryClient) =>
  useMutation({
    mutationKey: [QueryKeys.USE_FULL_BOOSTER],
    mutationFn: async () => getFullBooster(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_BOOSTERS] });
      invalidateProfileQuery(queryClient);
    },
  });

export const useTempEnergyBooster = (queryClient: QueryClient) =>
  useMutation({
    mutationKey: [QueryKeys.USE_TEMP_ENERGY_BOOSTER],
    mutationFn: async () => getTempEnergyBooster(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_BOOSTERS] });
      invalidateProfileQuery(queryClient);
    },
  });

export const useUpgradeBooster = (queryClient: QueryClient) =>
  useMutation({
    mutationKey: [QueryKeys.UPGRADE_BOOSTER],
    mutationFn: async (type: UpgradeBoosterType) => getUpgradeBooster(type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_BOOSTERS] });
      invalidateProfileQuery(queryClient);
    },
  });
