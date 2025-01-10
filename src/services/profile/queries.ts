import { useQuery } from "@tanstack/react-query";

import { getProfile } from "./fetcher";

enum QueryKeys {
  GET_PROFILE = "GET_PROFILE",
}

export const useGetProfile = () =>
  useQuery({
    queryKey: [QueryKeys.GET_PROFILE],
    queryFn: () => getProfile(),
  });
