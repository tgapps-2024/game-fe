import { AxiosError } from "axios";

import { STALE_TIME } from "@/constants/api";
import { useQuery } from "@tanstack/react-query";

import { getLeaderboard } from "./queries";
import { ILeaderboard, LeaderboardEnum } from "./types";

const QueryKeys = {
  GET_LEADERBOARD: "GET_LEADERBOARD",
};

export const useGetLeaderboard = (leaderboard?: LeaderboardEnum) =>
  useQuery<ILeaderboard, AxiosError>({
    queryKey: [QueryKeys.GET_LEADERBOARD, leaderboard],
    queryFn: () => getLeaderboard(leaderboard),
    retry: false,
    staleTime: STALE_TIME,
  });
