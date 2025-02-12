import React, { useContext } from "react";

import {
  HeroStats,
  HeroStatsCtaType,
  HeroView,
  HSProfile,
} from "@/components/hs-shared";
import { HSSharedContext } from "@/context/hs-shared-context/HSSharedContext";

export const ShopProfile = () => {
  const { selection } = useContext(HSSharedContext);

  return (
    <HSProfile
      HeroViewNode={
        selection?.hero && (
          <HeroView
            className="left-0 top-0 h-full w-[56%]"
            heroId={selection.hero.characterId}
            heroRarity={selection.hero.rarity}
            heroCloth={selection.hero.cloth}
            source="preview"
          />
        )
      }
      HeroStatsNode={
        selection?.hero && (
          <HeroStats
            heroId={selection.hero.characterId}
            energy={selection.hero.energy}
            earnPerHour={selection.hero.earn_per_hour}
            earnPerTap={selection.hero.earn_per_tap}
            heroRarity={selection.hero.rarity}
            source="shop"
            ctaType={HeroStatsCtaType.BUY}
            isCtaLoading={false}
          />
        )
      }
    />
  );
};
