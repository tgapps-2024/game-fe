/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { useRouter } from "next/router";
import Script from "next/script";

import {
  invalidateProfileQuery,
  useGetProfile,
} from "@/services/profile/queries";
import { IProfile } from "@/services/profile/types";
import { IWebApp, WebAppUser } from "@/types/telegram";
import { useQueryClient } from "@tanstack/react-query";

import { useTelegramAuth } from "./hooks/useTelegramAuth";
import { useTelegramEffects } from "./hooks/useTelegramEffects";

export interface ITelegramContext {
  webApp?: IWebApp;
  user?: WebAppUser;
  profile?: IProfile | null;
  isPending: boolean;
}

export const TelegramContext = createContext<ITelegramContext>({
  isPending: false,
});

export const TelegramProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [webApp, setWebApp] = useState<IWebApp | null>(null);
  const { pathname } = useRouter();
  const { data: profile, isPending } = useGetProfile();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      setWebApp(window.Telegram.WebApp);
    }
  }, []);

  const authMutation = useTelegramAuth(webApp as IWebApp);

  useEffect(() => {
    if (webApp) {
      authMutation.mutate(undefined, {
        onSuccess: () => {
          invalidateProfileQuery(queryClient);
        },
      });
    }
  }, [webApp]);

  useTelegramEffects(webApp as IWebApp, pathname);

  const value = useMemo(() => {
    return webApp
      ? {
          webApp,
          user: webApp.initDataUnsafe?.user,
          profile,
          isPending,
        }
      : { isPending };
  }, [webApp, profile, isPending]);

  return (
    <TelegramContext.Provider value={value}>
      <Script
        src="https://telegram.org/js/telegram-web-app.js"
        strategy="beforeInteractive"
      />
      {children}
    </TelegramContext.Provider>
  );
};

export const useTelegram = () => useContext(TelegramContext);
