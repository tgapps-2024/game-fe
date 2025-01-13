/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { useRouter as useNextRouter } from "next/navigation";
import { useRouter } from "next/router";
import Script from "next/script";

import Cookies from "js-cookie";

import { AUTH_COOKIE_TOKEN } from "@/constants/api";
import { ROUTES, ROUTES_WITH_CLOSE_BUTTON } from "@/constants/routes";
import { login } from "@/services/auth/fetcher";
import { IWebApp, WebAppUser } from "@/types/telegram";

export interface ITelegramContext {
  webApp?: IWebApp;
  user?: WebAppUser;
}

export const TelegramContext = createContext<ITelegramContext>({});

export const TelegramProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [webApp, setWebApp] = useState<IWebApp | null>(null);
  const { push, pathname } = useRouter();
  const { back: navigateBack } = useNextRouter();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const app: IWebApp = (window as any).Telegram.WebApp;
    if (app) {
      app.ready();
      setWebApp(app);
      app.SettingsButton.show();
      app.SettingsButton.onClick(() => {
        push(ROUTES.SETTINGS);
      });
      app.lockOrientation();
      app.disableVerticalSwipes();
      app.enableClosingConfirmation();

      const authFetcher = async () => {
        try {
          const token = Cookies.get(AUTH_COOKIE_TOKEN);

          if (token) {
            return;
          }

          await login(app.initData);
        } catch {
          const code = 401;
          const message = "Authentication failed. Please try again.";
          // push(`/error?code=${code}&message=${encodeURIComponent(message)}`);
        }
      };

      authFetcher();
    }
  }, []);

  useEffect(() => {
    try {
      const version = webApp?.version;
      const platform = webApp?.platform;

      const availablePlatforms = ["android", "ios"];

      //TODO: uncomment when released
      // if (!availablePlatforms.includes(platform)) {
      //   navigate({ to: ROUTES.UNSUPPORTED_PLATFORM });
      // }

      if (Number(version) >= 8 && availablePlatforms.includes(platform || "")) {
        webApp?.requestFullscreen();
      }

      if (!ROUTES_WITH_CLOSE_BUTTON.includes(pathname)) {
        webApp?.BackButton.show();
        webApp?.BackButton.onClick(() => {
          navigateBack();
        });
      } else {
        webApp?.BackButton.hide();
      }
    } catch (error) {
      console.log("🚀 ~ useEffect ~ error:", error);
    }
  }, [webApp, pathname, push, navigateBack]);

  const value = useMemo(() => {
    return webApp
      ? {
          webApp,
          unsafeData: webApp.initDataUnsafe,
          user: webApp.initDataUnsafe.user,
        }
      : {};
  }, [webApp]);

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
