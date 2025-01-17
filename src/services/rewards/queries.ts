import { useMutation } from "@tanstack/react-query";

import { getRewardsEarn } from "./fetcher";

enum QueryKeys {
  GET_REWARDS_EARN = "GET_REWARDS_EARN",
}

export const useGetRewardsEarn = () =>
  useMutation({
    mutationKey: [QueryKeys.GET_REWARDS_EARN],
    mutationFn: async () => getRewardsEarn(),
    onSuccess: () => {},
  });
