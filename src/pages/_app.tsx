import "@/styles/globals.css";
import { NextIntlClientProvider } from "next-intl";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Rubik, Inter } from "next/font/google";
import { TelegramProvider } from "@/context/telegram-context/TelegramContext";
import { SettingsProvider } from "@/context";
import Head from "next/head";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

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
              className={`${inter.variable} ${rubik.variable} flex flex-col items-center justify-center min-h-screen font-[family-name:var(--font-rubik)]`}
            >
              <Component {...pageProps} />
            </div>
          </SettingsProvider>
        </TelegramProvider>
      </TonConnectUIProvider>
    </NextIntlClientProvider>
  );
}
