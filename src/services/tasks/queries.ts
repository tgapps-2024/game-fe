import Cookies from "js-cookie";

import { AUTH_COOKIE_TOKEN } from "@/constants/api";
import { useQuery } from "@tanstack/react-query";

import { getTasks } from "./fetcher";

enum QueryKeys {
  GET_TASKS = "GET_TASKS",
}

export const useGetTasks = () =>
  useQuery({
    queryKey: [QueryKeys.GET_TASKS],
    queryFn: async () => getTasks(),
    enabled: !!Cookies.get(AUTH_COOKIE_TOKEN),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
