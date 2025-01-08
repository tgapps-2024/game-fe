import apiClient from "@/api/api-client";
import { API_ENDPOINTS } from "@/constants/api";

const login = async (initData: string) => {
  console.log("🚀 ~ login ~ initData:", initData);
  const { data } = await apiClient.get(API_ENDPOINTS.GET.AUTH, {
    data: {
      initDataRaw: initData,
    },
  });
  console.log(data);
};

export { login };
