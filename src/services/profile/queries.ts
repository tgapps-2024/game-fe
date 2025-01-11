import Cookies from "js-cookie";

import { validateToken } from "@/api/helpers";
import { AUTH_COOKIE_TOKEN } from "@/constants/api";
import { useQuery } from "@tanstack/react-query";

import { getProfile } from "./fetcher";

enum QueryKeys {
  GET_PROFILE = "GET_PROFILE",
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
