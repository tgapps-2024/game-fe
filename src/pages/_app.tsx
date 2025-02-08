import { useState } from "react";

import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
// import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";

import { Toaster } from "@/components/ui/sonner";
import { SettingsProvider } from "@/context";
import { TelegramProvider } from "@/context/telegram-context/TelegramContext";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const { locale } = useRouter();

  return (
    <NextIntlClientProvider
      locale={locale}
      timeZone="Europe/Moscow"
      messages={pageProps.messages}
    >
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <TonConnectUIProvider manifestUrl="https://taiga-labs.github.io/gorelko.json">
            <TelegramProvider>
              <SettingsProvider>
                <Head>
                  <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
                  />
                </Head>
                <div
                  className={`flex min-h-screen flex-col items-center justify-center font-[family-name:var(--font-rubik)]`}
                >
                  <Component {...pageProps} />
                  <SpeedInsights />
                  <Toaster />
                  {process.env.NEXT_IS_ENABLED_ERUNDA && (
                    <Script
                      src="https://cdn.jsdelivr.net/npm/eruda"
                      strategy="afterInteractive"
                      onLoad={() => {
                        if (typeof window.eruda !== "undefined")
                          window.eruda.init({
                            tool: ["console", "elements", "network", "sources"],
                            useShadowDom: true,
                            autoScale: true,
                            defaults: {
                              displaySize: 50,
                              transparency: 0.9,
                              theme: "Monokai Pro",
                            },
                          });
                      }}
                    />
                  )}
                </div>
              </SettingsProvider>
            </TelegramProvider>
          </TonConnectUIProvider>
        </HydrationBoundary>
      </QueryClientProvider>
    </NextIntlClientProvider>
  );
}
