import Cookies from "js-cookie";

import { validateToken } from "@/api/helpers";
import { AUTH_COOKIE_TOKEN } from "@/constants/api";
import { useQuery } from "@tanstack/react-query";

import { getProfile, getReferalLink } from "./fetcher";

enum QueryKeys {
  GET_PROFILE = "GET_PROFILE",
  GET_REFERALS = "GET_REFERALS",
}

export const useGetProfile = () =>
  useQuery({
    queryKey: [QueryKeys.GET_PROFILE],
    queryFn: async () => {
      validateToken();
      return getProfile();
    },
    enabled: !!Cookies.get(AUTH_COOKIE_TOKEN),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

export const useGetReferals = () =>
  useQuery({
    queryKey: [QueryKeys.GET_REFERALS],
    queryFn: async () => {
      validateToken();
      return getReferalLink();
    },
    enabled: !!Cookies.get(AUTH_COOKIE_TOKEN),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
