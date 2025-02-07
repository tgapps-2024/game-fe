/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { useRouter } from "next/router";
import Script from "next/script";

import { toast } from "sonner";

import { Toast } from "@/components/ui/toast";
import { useGetProfile } from "@/services/profile/queries";
import { IProfile } from "@/services/profile/types";
import { IWebApp, WebAppUser } from "@/types/telegram";

import { useTelegramAuth } from "./hooks/useTelegramAuth";
import { useTelegramEffects } from "./hooks/useTelegramEffects";

export interface ITelegramContext {
  webApp?: IWebApp;
  user?: WebAppUser;
  profile?: IProfile | null;
  isAuthenticating: boolean;
  isProfileLoading: boolean;
}

export const TelegramContext = createContext<ITelegramContext>({
  isAuthenticating: true,
  isProfileLoading: true,
});

export const TelegramProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [webApp, setWebApp] = useState<IWebApp | null>(null);
  const {
    isPending: isAuthenticating,
    isSuccess: isAuthSuccess,
    isError: isAuthError,
  } = useTelegramAuth(webApp as IWebApp);
  const { pathname } = useRouter();
  const {
    data: profile,
    isPending: isProfileLoading,
    isError: isProfileError,
  } = useGetProfile(isAuthSuccess);

  useEffect(() => {
    if (isAuthError) {
      toast(
        <Toast
          type="destructive"
          text="Authentication failed. Please try again."
        />,
      );
    }
  }, [isAuthError]);

  useEffect(() => {
    if (isProfileError) {
      toast(
        <Toast
          type="destructive"
          text="Getting profile failed. Please try again."
        />,
      );
    }
  }, [isProfileError]);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      setWebApp(window.Telegram.WebApp);
    }
  }, []);

  useTelegramEffects(webApp as IWebApp, pathname);

  const value = useMemo(() => {
    return webApp
      ? {
          webApp,
          user: webApp.initDataUnsafe?.user,
          profile,
          isAuthenticating,
          isProfileLoading,
        }
      : { isAuthenticating, isProfileLoading };
  }, [webApp, profile, isAuthenticating, isProfileLoading]);

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
