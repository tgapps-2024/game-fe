import Cookies from "js-cookie";

import { validateToken } from "@/api/helpers";
import { AUTH_COOKIE_TOKEN, STALE_TIME } from "@/constants/api";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

import { invalidateProfileQuery } from "../profile/queries";

import {
  getBoosters,
  getDailyInfo,
  getDailyReward,
  getRewardsEarn,
} from "./fetcher";

enum QueryKeys {
  GET_REWARDS_EARN = "GET_REWARDS_EARN",
  GET_DAILY_INFO = "GET_DAILY_INFO",
  GET_DAILY_REWARD = "GET_DAILY_REWARD",
  GET_BOOSTERS = "GET_BOOSTERS",
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
