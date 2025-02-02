import Cookies from "js-cookie";

import { validateToken } from "@/api/helpers";
import { AUTH_COOKIE_TOKEN } from "@/constants/api";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

import { getDailyInfo, getDailyReward, getRewardsEarn } from "./fetcher";

enum QueryKeys {
  GET_REWARDS_EARN = "GET_REWARDS_EARN",
  GET_DAILY_INFO = "GET_DAILY_INFO",
  GET_DAILY_REWARD = "GET_DAILY_REWARD",
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
    staleTime: 1000 * 60 * 5,
  });

export const useGetDailyReward = (queryClient: QueryClient) =>
  useMutation({
    mutationKey: [QueryKeys.GET_DAILY_REWARD],
    mutationFn: async () => getDailyReward(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_DAILY_INFO] });
    },
  });
