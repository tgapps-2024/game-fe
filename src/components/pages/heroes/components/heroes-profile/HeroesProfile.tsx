import React, { useContext } from "react";

import { ProfileHeader } from "@/components/common";
import { useTelegram } from "@/context";
import { HeroesContext } from "@/context/heroes-context/HeroesContext";
import { useGetAllHeroes } from "@/services/heroes/queries";
import { getTgSafeAreaInsetTop } from "@/utils/telegram";

import { HeroStats, HeroStatsCtaType } from "./components/hero-stats/HeroStats";
import { HeroView } from "./components/hero-view/HeroView";

export const HeroesProfile = () => {
  const { webApp } = useTelegram();

  const { selection, currentHero } = useContext(HeroesContext);
  const {
    data: ownHeroes,
    isFetching,
    isPending,
  } = useGetAllHeroes(!!webApp && !!selection?.hero);
  const isOwnHeroesLoading = isFetching || isPending;

  if (!webApp) return null;

  const insetTop = getTgSafeAreaInsetTop(webApp);

  const isCurrentHeroSelected =
    currentHero &&
    selection?.hero &&
    currentHero.characterId === selection.hero.characterId;

  const isOwnHero =
    !isCurrentHeroSelected &&
    !!ownHeroes?.find((heroId) => heroId === selection?.hero?.characterId);

  let ctaType = HeroStatsCtaType.BUY;

  if (isCurrentHeroSelected) {
    ctaType = HeroStatsCtaType.SELECTED;
  } else if (isOwnHero) {
    ctaType = HeroStatsCtaType.SELECT;
  }

  return (
    <div
      className="relative aspect-[0.78] bg-[url('/assets/png/heroes/bg.png')] bg-[length:100%] bg-no-repeat pt-28"
      style={insetTop ? { paddingTop: insetTop } : undefined}
    >
      <ProfileHeader />

      {selection?.hero && !isOwnHeroesLoading && (
        <div className="absolute bottom-[10%] w-full pt-[77%]">
          <HeroView
            className="left-0 top-0 h-full w-[56%]"
            heroId={selection.hero.characterId}
          />
          <HeroStats
            energy={selection.hero.energy}
            earnPerHour={selection.hero.earn_per_hour}
            earnPerTap={selection.hero.earn_per_tap}
            heroRarity={selection.hero.rarity}
            ctaType={ctaType}
          />
        </div>
      )}
    </div>
  );
};
