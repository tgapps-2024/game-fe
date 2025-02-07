import React, { ComponentProps, FunctionComponent } from "react";

import { useTranslations } from "next-intl";

import { PrimaryButton } from "@/components/ui/primary-button/PrimaryButton";
import { NS } from "@/constants/ns";
import { HeroRarity } from "@/services/heroes/types";

import { Coin, CoinType } from "./components/coin/Coin";
import { Indicator } from "./components/indicator/Indicator";
import { Ribbon } from "./components/ribbon/Ribbon";
import {
  MAX_ENERGY,
  MAX_INCOME_PER_HOUR,
  MAX_INCOME_PER_TAP,
} from "./constants";

export enum HeroStatsCtaType {
  BUY = "BUY",
  GET = "GET",
  SELECT = "SELECT",
  SELECTED = "SELECTED",
}

type Props = {
  energy: number;
  earnPerHour: number;
  earnPerTap: number;
  ctaType: HeroStatsCtaType;
  heroRarity: HeroRarity;
  onCtaClick?: () => void;
  onGoToShopClick?: () => void;
};

const calculateProgress = (current: number, max: number) =>
  (current / max) * 100;

export const HeroStats: FunctionComponent<Props> = ({
  energy,
  earnPerHour,
  earnPerTap,
  ctaType,
  heroRarity,
  onCtaClick,
  onGoToShopClick,
}) => {
  const t = useTranslations(NS.PAGES.HEROES.ROOT);

  const renderCta = () => {
    let color: ComponentProps<typeof PrimaryButton>["color"];

    switch (ctaType) {
      case HeroStatsCtaType.BUY: {
        color = "secondary";
        break;
      }
      case HeroStatsCtaType.GET: {
        color = "blue";
        break;
      }
      case HeroStatsCtaType.SELECT: {
        color = "yellow";
        break;
      }
      case HeroStatsCtaType.SELECTED: {
        color = "primary";
        break;
      }
    }

    return (
      <PrimaryButton
        size="small"
        color={color}
        onClick={onCtaClick}
        disabled={ctaType === HeroStatsCtaType.SELECTED}
      >
        {t(`${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS[ctaType]}`)}
      </PrimaryButton>
    );
  };

  return (
    <div className="absolute inset-y-0 right-4 my-auto max-h-fit w-1/2 rounded-2xl border border-[#EFC609]">
      <div className="flex flex-col gap-y-4 rounded-2xl bg-[rgba(0,0,0,0.6)] p-4 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-y-2">
          <div className="absolute inset-x-2 bottom-[72%] top-1.5 rounded-t-2xl bg-white opacity-5" />
          <div className="text-xl font-black leading-none tracking-wide text-white text-shadow">
            Месси
          </div>
          <Ribbon heroRarity={heroRarity}>
            {t(
              `${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS.HERO_RARITY.ROOT}.${NS.PAGES.HEROES.LABELS.HERO_RARITY.COMMON}`,
            )}
          </Ribbon>
          <div className="flex w-full flex-col gap-y-3">
            <div className="flex w-full items-center gap-x-2">
              <Coin type={CoinType.ENERGY} />
              <Indicator
                label={t(
                  `${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS.ENERGY}`,
                )}
                caption={t(
                  `${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS.UNITS.ROOT}.${NS.PAGES.HEROES.LABELS.UNITS.ENERGY}`,
                  { num: energy },
                )}
                progress={calculateProgress(energy, MAX_ENERGY)}
              />
            </div>
            <div className="flex w-full items-center gap-x-2">
              <Coin type={CoinType.HOUR_INCOME} />
              <Indicator
                label={t(
                  `${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS.INCOME_PER_HOUR}`,
                )}
                caption={t(
                  `${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS.UNITS.ROOT}.${NS.PAGES.HEROES.LABELS.UNITS.INCOME_PER_HOUR}`,
                  { num: earnPerHour },
                )}
                progress={calculateProgress(earnPerHour, MAX_INCOME_PER_HOUR)}
              />
            </div>
            <div className="flex w-full items-center gap-x-2">
              <Coin type={CoinType.TAP_INCOME} />
              <Indicator
                label={t(
                  `${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS.INCOME_PER_TAP}`,
                )}
                caption={t(
                  `${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS.UNITS.ROOT}.${NS.PAGES.HEROES.LABELS.UNITS.INCOME_PER_TAP}`,
                  { num: earnPerTap },
                )}
                progress={calculateProgress(earnPerTap, MAX_INCOME_PER_TAP)}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-3">
          {renderCta()}
          {(ctaType === HeroStatsCtaType.SELECT ||
            ctaType === HeroStatsCtaType.SELECTED) && (
            <div
              className="text-center text-sm font-extrabold leading-none text-white"
              onClick={onGoToShopClick}
            >
              {t(
                `${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS.GO_TO_SHOP}`,
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
