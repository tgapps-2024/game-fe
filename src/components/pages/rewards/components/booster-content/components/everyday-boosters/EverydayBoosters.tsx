import React, { FunctionComponent } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { PrimaryButton } from "@/components/ui/primary-button/PrimaryButton";
import { NS } from "@/constants/ns";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import BatteryImage from "@/public/assets/png/rewards/yellow-battery.webp";
import StarSVG from "@/public/assets/svg/star.svg";
import { FullBooster } from "@/services/rewards/types";
import { formatNumber } from "@/utils/number";

import { EverydayBoosterModal } from "./components/everyday-booster-modal/EverydayBoosterModal";

type Props = {
  booster: FullBooster;
};

export const EverydayBoosters: FunctionComponent<Props> = ({ booster }) => {
  console.log("🚀 ~ booster:", booster);
  const t = useTranslations(NS.PAGES.REWARDS.ROOT);
  const { handleSelectionChanged } = useHapticFeedback();
  const PRICE = null;

  return (
    <Drawer>
      <div className="flex items-center justify-between">
        <div className="text-stroke-1 text-nowrap text-xl font-black leading-none tracking-[0.04em] text-white text-shadow-sm">
          {t(
            `${NS.PAGES.REWARDS.BOOSTERS.ROOT}.${NS.PAGES.REWARDS.BOOSTERS.EVERYDAY}.${NS.PAGES.REWARDS.BOOSTERS.TITLE}`,
          )}
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-gray-550">
          <div className="text-nowrap rounded-[20px] bg-blue-700 px-3 py-1 text-xs font-black tracking-[0.04em] text-white">
            {1}
          </div>
        </div>
      </div>
      <div className="relative mb-4 flex items-center justify-between gap-2 rounded-2xl bg-blue-700 p-3 shadow-[inset_1px_1px_0_0_rgba(255,255,255,0.1),inset_-1px_-1px_0_0_rgba(255,255,255,0.1)]">
        <div className="grid grid-cols-[60px_1fr] items-center gap-3">
          <div className="flex size-15 items-center justify-center rounded-lg bg-gradient-to-b from-[#FFE04E] to-[#F19F33] p-1.5 shadow-[inset_2px_2px_2px_0_rgba(255,255,255,0.4)]">
            <div className="relative h-full w-full">
              <Image src={BatteryImage} alt="Energy image" fill />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-extrabold leading-none text-white">
              {t(
                `${NS.PAGES.REWARDS.BOOSTERS.ROOT}.${NS.PAGES.REWARDS.BOOSTERS.EVERYDAY}.${NS.PAGES.REWARDS.BOOSTERS.FULL_ENERGY}`,
              )}
            </span>
            <div className="flex items-center gap-2">
              <span className="self-start rounded-full bg-white/10 px-2.5 py-[5px] text-xs font-semibold text-gray-550">
                {t(
                  `${NS.PAGES.REWARDS.BOOSTERS.ROOT}.${NS.PAGES.REWARDS.BOOSTERS.COUNT}`,
                  {
                    num1: 5,
                    num2: booster?.amount,
                  },
                )}
              </span>
              <span className="text-x font-medium text-gray-550">
                {t(
                  `${NS.PAGES.REWARDS.BOOSTERS.ROOT}.${NS.PAGES.REWARDS.BOOSTERS.AVAILABLE}`,
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="w-[122px]">
          <DrawerTrigger asChild className="w-full">
            <PrimaryButton
              onClick={() => {
                handleSelectionChanged();
              }}
              size="small"
              color={PRICE ? "primary" : "secondary"}
              className="text-stroke-1 text-xs font-extrabold text-shadow-sm"
            >
              {PRICE ? (
                <div className="grid grid-cols-[16px_1fr] items-center gap-2">
                  <StarSVG className="size-4" />
                  {formatNumber(PRICE)}
                </div>
              ) : (
                <>
                  {t(
                    `${NS.PAGES.REWARDS.BOOSTERS.ROOT}.${NS.PAGES.REWARDS.BOOSTERS.APPLY}`,
                  )}
                </>
              )}
            </PrimaryButton>
          </DrawerTrigger>
        </div>
      </div>
      <EverydayBoosterModal booster={booster} />
    </Drawer>
  );
};
