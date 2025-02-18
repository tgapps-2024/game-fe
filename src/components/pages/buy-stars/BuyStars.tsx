import React from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";

import { PageWrapper } from "@/components/common";
import { PrimaryButton } from "@/components/ui/primary-button/PrimaryButton";
import { NS } from "@/constants/ns";
import { useTelegram } from "@/context";
import StarSVG from "@/public/assets/svg/star.svg";
import { formatValue } from "@/utils/lib/utils";
import { getTgSafeAreaInsetTop } from "@/utils/telegram";

export const BuyStars = () => {
  const t = useTranslations(NS.PAGES.BUY_STARS.ROOT);
  const { webApp, profile } = useTelegram();

  if (!webApp) return null;

  const insetTop = getTgSafeAreaInsetTop(webApp);
  const calculatedPaddingTop = insetTop ? insetTop - 32 : 16;

  return (
    <PageWrapper disableSafeAreaInset>
      <div
        className="flex flex-col items-center px-4"
        style={{ paddingTop: `${calculatedPaddingTop}px` }}
      >
        <h2 className="text-stroke-1 mb-6 text-center text-lg font-extrabold tracking-wide text-white text-shadow-sm">
          {t(`${NS.PAGES.BUY_STARS.TITLE}`)}
        </h2>
        <div
          className={classNames(
            "relative z-10 mb-2.5 flex w-full flex-col gap-5 rounded-2xl bg-blue-700 p-4 shadow-[inset_1px_1px_0_0_rgba(255,255,255,0.1),inset_-1px_-1px_0_0_rgba(255,255,255,0.1)]",
          )}
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium tracking-wide text-gray-550">
              {t(`${NS.PAGES.BUY_STARS.TOTAL_BALANCE}`)}
            </span>
            <div className="flex items-center gap-2">
              <StarSVG className="size-5" />
              <div>
                <span className="text-stroke-half text-lg font-semibold leading-none tracking-wide text-white text-shadow-sm">
                  {formatValue(profile?.stars ?? 0)}
                </span>{" "}
                <span className="text-str text-xs font-normal text-gray-550">
                  ≈$0
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium tracking-wide text-gray-550">
              {t(`${NS.PAGES.BUY_STARS.AVAILABLE_TO_WITHDRAW}`)}
            </span>
            <div className="flex items-center gap-2">
              <StarSVG className="size-5" />
              <div>
                <span className="text-stroke-half text-lg font-semibold leading-none tracking-wide text-white text-shadow-sm">
                  {formatValue(profile?.stars ?? 0)}
                </span>{" "}
                <span className="text-str text-xs font-normal text-gray-550">
                  ≈$0
                </span>
              </div>
            </div>
          </div>
        </div>
        <p className="mb-10 pl-3 text-xs text-gray-550">
          {t(NS.PAGES.BUY_STARS.DESCRIPTION)}
        </p>
        <span className="mb-2 inline-block self-start text-xs font-medium tracking-wide text-gray-550">
          {t(`${NS.PAGES.BUY_STARS.AVAILABLE_BALANCE}`)}
        </span>
        <div
          className={classNames(
            "relative z-10 mb-2 flex w-full flex-col justify-center gap-5 rounded-2xl bg-blue-700 p-4 shadow-[inset_1px_1px_0_0_rgba(255,255,255,0.1),inset_-1px_-1px_0_0_rgba(255,255,255,0.1)]",
          )}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex items-center gap-2">
              <StarSVG className="size-9" />
              <span className="text-stroke-1 text-4xl font-black leading-none tracking-wider text-white text-shadow">
                {formatValue(profile?.stars ?? 0)}
              </span>
            </div>
            <span className="font-normal text-gray-550">≈$30500,00</span>
          </div>
          <PrimaryButton>
            {t(`${NS.PAGES.BUY_STARS.BUTTON_TEXT}`)}
          </PrimaryButton>
        </div>
        <p className="mb-10 px-3 text-xs text-gray-550">
          {t(NS.PAGES.BUY_STARS.AVAILABLE_BALANCE_DESCRIPTION)}
        </p>
      </div>
    </PageWrapper>
  );
};
