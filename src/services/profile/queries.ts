import Cookies from "js-cookie";

import { validateToken } from "@/api/helpers";
import { AUTH_COOKIE_TOKEN, STALE_TIME } from "@/constants/api";
import { useMutation, useQuery } from "@tanstack/react-query";

import { getProfile, getReferalLink } from "./fetcher";

export enum QueryKeys {
  GET_PROFILE = "GET_PROFILE",
  GET_REFERALS = "GET_REFERALS",
}

export const useGetReferals = () =>
  useQuery({
    queryKey: [QueryKeys.GET_REFERALS],
    queryFn: async () => {
      validateToken();
      return getReferalLink();
    },
    enabled: !!Cookies.get(AUTH_COOKIE_TOKEN),
    retry: false,
    staleTime: STALE_TIME,
  });

export const useGetProfileMutation = () =>
  useMutation({
    mutationFn: getProfile,
    mutationKey: ["GET_PROFILE"],
  });
