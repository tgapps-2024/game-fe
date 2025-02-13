import React, { ComponentProps, FunctionComponent } from "react";

import Link from "next/link";
import { useTranslations } from "next-intl";

import { PrimaryButton } from "@/components/ui/primary-button/PrimaryButton";
import { NS } from "@/constants/ns";
import { ROUTES } from "@/constants/routes";
import { HeroId, HeroRarity } from "@/services/heroes/types";
import { formatValue } from "@/utils/lib/utils";

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
  heroId: HeroId;
  heroRarity: HeroRarity;
  source: "heroes" | "shop";
  isCtaLoading?: boolean;
  isCurrentHeroSelected?: boolean;
  isShopLinkHidden?: boolean;
  onCtaClick?: () => void;
};

const calculateProgress = (current: number, max: number) =>
  (current / max) * 100;

export const HeroStats: FunctionComponent<Props> = ({
  energy,
  earnPerHour,
  earnPerTap,
  ctaType,
  heroId,
  heroRarity,
  source,
  isCtaLoading,
  isCurrentHeroSelected,
  isShopLinkHidden,
  onCtaClick,
}) => {
  const tHeroes = useTranslations(NS.PAGES.HEROES.ROOT);
  const tShop = useTranslations(NS.PAGES.SHOP.ROOT);

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
        isLoading={isCtaLoading}
        disabled={ctaType === HeroStatsCtaType.SELECTED}
      >
        {tHeroes(
          `${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS[ctaType]}`,
        )}
      </PrimaryButton>
    );
  };

  const nameTranslationKey = heroId.toUpperCase() as Uppercase<HeroId>;
  const ribbonTranslationKey =
    heroRarity.toUpperCase() as Uppercase<HeroRarity>;
  const isShopPage = source === "shop";

  return (
    <div className="absolute inset-y-0 right-4 my-auto max-h-fit w-1/2 rounded-2xl border border-[#EFC609]">
      <div className="flex flex-col gap-y-4 rounded-2xl bg-[rgba(0,0,0,0.6)] p-4 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-y-2">
          <div className="absolute inset-x-2 bottom-[72%] top-1.5 rounded-t-2xl bg-white opacity-5" />
          <div className="text-center text-xl font-black leading-none tracking-wide text-white text-shadow">
            {isShopPage
              ? tShop(`${NS.PAGES.SHOP.KIT}`, { form: "full_singular" })
              : tHeroes(
                  `${NS.PAGES.HEROES.HERO_NAMES.ROOT}.${NS.PAGES.HEROES.HERO_NAMES[nameTranslationKey]}`,
                )}
          </div>
          {!isShopPage && (
            <Ribbon heroRarity={heroRarity}>
              {tHeroes(
                `${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS.HERO_RARITY.ROOT}.${NS.PAGES.HEROES.LABELS.HERO_RARITY[ribbonTranslationKey]}`,
              )}
            </Ribbon>
          )}
          <div className="flex w-full flex-col gap-y-3">
            <div className="flex w-full items-center gap-x-2">
              <Coin type={CoinType.ENERGY} />
              <Indicator
                label={tHeroes(
                  `${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS.ENERGY}`,
                )}
                caption={tHeroes(
                  `${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS.UNITS.ROOT}.${NS.PAGES.HEROES.LABELS.UNITS.ENERGY}`,
                  { num: formatValue(energy) },
                )}
                progress={calculateProgress(energy, MAX_ENERGY)}
              />
            </div>
            <div className="flex w-full items-center gap-x-2">
              <Coin type={CoinType.HOUR_INCOME} />
              <Indicator
                label={tHeroes(
                  `${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS.INCOME_PER_HOUR}`,
                )}
                caption={tHeroes(
                  `${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS.UNITS.ROOT}.${NS.PAGES.HEROES.LABELS.UNITS.INCOME_PER_HOUR}`,
                  { num: formatValue(earnPerHour) },
                )}
                progress={calculateProgress(earnPerHour, MAX_INCOME_PER_HOUR)}
              />
            </div>
            <div className="flex w-full items-center gap-x-2">
              <Coin type={CoinType.TAP_INCOME} />
              <Indicator
                label={tHeroes(
                  `${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS.INCOME_PER_TAP}`,
                )}
                caption={tHeroes(
                  `${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS.UNITS.ROOT}.${NS.PAGES.HEROES.LABELS.UNITS.INCOME_PER_TAP}`,
                  { num: formatValue(earnPerTap) },
                )}
                progress={calculateProgress(earnPerTap, MAX_INCOME_PER_TAP)}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-3">
          {renderCta()}
          {!isShopLinkHidden &&
            (ctaType === HeroStatsCtaType.SELECT ||
              ctaType === HeroStatsCtaType.SELECTED) && (
              <Link
                href={{
                  pathname: ROUTES.SHOP,
                  query: isCurrentHeroSelected ? undefined : { heroId },
                }}
                className="text-center text-sm font-extrabold text-white"
              >
                {tHeroes(
                  `${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS.GO_TO_SHOP}`,
                )}
              </Link>
            )}
        </div>
      </div>
    </div>
  );
};
