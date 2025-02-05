import Cookies from "js-cookie";
import { toast } from "sonner";

import { Toast } from "@/components/ui/toast";
import { AUTH_COOKIE_TOKEN } from "@/constants/api";
import { login } from "@/services/auth/fetcher";
import { IWebApp } from "@/types/telegram";
import { useMutation } from "@tanstack/react-query";

export const useTelegramAuth = (webApp: IWebApp) => {
  return useMutation({
    mutationFn: async () => {
      const token = Cookies.get(AUTH_COOKIE_TOKEN);
      if (token) return;

      await login(webApp.initData, webApp.initDataUnsafe.start_param);
    },
    onError: () => {
      toast(
        <Toast
          type="destructive"
          text="Authentication failed. Please try again."
        />,
      );
    },
  });
};
