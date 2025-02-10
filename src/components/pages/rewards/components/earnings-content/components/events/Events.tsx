import React, { FunctionComponent } from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";

import { PrimaryButton } from "@/components/ui/primary-button/PrimaryButton";
import { NS } from "@/constants/ns";
import StarSVG from "@/public/assets/svg/star.svg";
import { formatNumber } from "@/utils/number";

type Props = {
  isAnimated: boolean;
};

export const Events: FunctionComponent<Props> = ({ isAnimated }) => {
  const t = useTranslations(NS.PAGES.REWARDS.ROOT);

  return (
    <div className="flex flex-col gap-4">
      <div className="text-stroke-1 text-nowrap text-2xl font-black tracking-[0.04em] text-white text-shadow-sm">
        Мероприятия
      </div>
      <div
        className={classNames(
          "relative z-10 mb-4 flex w-full items-center justify-between gap-2 rounded-2xl bg-blue-700 p-3 shadow-[inset_1px_1px_0_0_rgba(255,255,255,0.1),inset_-1px_-1px_0_0_rgba(255,255,255,0.1)]",
        )}
      >
        <div className="grid grid-cols-[60px_1fr] items-center gap-3">
          <div className="relative flex size-15 items-center justify-center rounded-lg bg-gradient-to-b from-[#FFE04E] to-[#F19F33] p-1.5 shadow-[inset_2px_2px_2px_0_rgba(255,255,255,0.4)]">
            {/* <div
              className={classNames("relative h-full w-full", {
                "animate-tilt": isAnimated,
              })}
            >
              <Image src={BatteryImage} alt="Energy image" fill />
            </div> */}
            {isAnimated && (
              <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden rounded-xl">
                <div className="absolute top-0 h-[140%] w-[66px] rotate-[30deg] animate-card-glow-running bg-card-glow-pattern will-change-transform" />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-stroke-1 text-sm font-black text-white text-shadow-sm">
              {t(
                `${NS.PAGES.REWARDS.EVENTS.ROOT}.${NS.PAGES.REWARDS.EVENTS.EVENT_AGENCY}`,
              )}
            </span>
            <div className="flex items-center gap-2">
              <span className="self-start rounded-full bg-white/10 px-2.5 py-[5px] text-xs font-semibold text-gray-550">
                {t(
                  `${NS.PAGES.REWARDS.EVENTS.ROOT}.${NS.PAGES.REWARDS.EVENTS.LEVEL}`,
                  { num: 1 },
                )}
              </span>
              <div className="text-yellow flex items-center gap-1 text-xs font-semibold">
                <StarSVG className="size-4" /> +100
              </div>
            </div>
          </div>
        </div>
        <div className="pointer-events-auto w-[122px]">
          <PrimaryButton
            size="small"
            className="text-stroke-1 text-xs font-extrabold text-shadow-sm"
          >
            <div className="text-stroke-half grid grid-cols-[16px_1fr] items-center gap-1 text-xs font-extrabold text-white text-shadow-sm">
              <StarSVG className="size-4" />+{formatNumber(200000)}
            </div>
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
