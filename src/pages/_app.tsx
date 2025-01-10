import { useState } from "react";

import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { NextIntlClientProvider } from "next-intl";

import { SettingsProvider } from "@/context";
import { TelegramProvider } from "@/context/telegram-context/TelegramContext";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

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
                </div>
              </SettingsProvider>
            </TelegramProvider>
          </TonConnectUIProvider>
        </HydrationBoundary>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </NextIntlClientProvider>
  );
}
