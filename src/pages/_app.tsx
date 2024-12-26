import type { AppProps } from "next/app";
import { Inter, Rubik } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { NextIntlClientProvider } from "next-intl";

import { SettingsProvider } from "@/context";
import { TelegramProvider } from "@/context/telegram-context/TelegramContext";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

import "@/styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();

  return (
    <NextIntlClientProvider
      locale={locale}
      timeZone="Europe/Moscow"
      messages={pageProps.messages}
    >
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
              className={`${inter.variable} ${rubik.variable} flex min-h-screen flex-col items-center justify-center font-[family-name:var(--font-rubik)]`}
            >
              <Component {...pageProps} />
            </div>
          </SettingsProvider>
        </TelegramProvider>
      </TonConnectUIProvider>
    </NextIntlClientProvider>
  );
}
