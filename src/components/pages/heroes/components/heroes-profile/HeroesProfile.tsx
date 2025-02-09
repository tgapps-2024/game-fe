import React, { useContext } from "react";

import { ProfileHeader } from "@/components/common";
import { useTelegram } from "@/context";
import { HeroesContext } from "@/context/heroes-context/HeroesContext";
import { useGetAllHeroes, useSetHero } from "@/services/heroes/queries";
import { getTgSafeAreaInsetTop } from "@/utils/telegram";

import { HeroStats, HeroStatsCtaType } from "./components/hero-stats/HeroStats";
import { HeroView } from "./components/hero-view/HeroView";

export const HeroesProfile = () => {
  const { webApp } = useTelegram();

  const { selection, currentHero } = useContext(HeroesContext);
  const { data: ownHeroes, isFetching: isOwnHeroesLoading } = useGetAllHeroes();
  const { mutate: setProfileHero } = useSetHero();

  if (!webApp) return null;

  const insetTop = getTgSafeAreaInsetTop(webApp);

  const isCurrentHeroSelected =
    currentHero &&
    selection?.hero &&
    currentHero.characterId === selection.hero.characterId;

  const isSelectableHero =
    !isCurrentHeroSelected &&
    !!ownHeroes?.find((heroId) => heroId === selection?.hero?.characterId);

  let ctaType = HeroStatsCtaType.BUY;

  if (isCurrentHeroSelected) {
    ctaType = HeroStatsCtaType.SELECTED;
  } else if (isSelectableHero) {
    ctaType = HeroStatsCtaType.SELECT;
  }

  return (
    <div
      className="relative aspect-[0.78] bg-[url('/assets/png/heroes/bg.png')] bg-[length:100%] bg-no-repeat pt-28"
      style={insetTop ? { paddingTop: insetTop } : undefined}
    >
      <ProfileHeader />

      <div className="absolute bottom-[10%] w-full pt-[77%]">
        {selection?.hero && (
          <HeroView
            className="left-0 top-0 h-full w-[56%]"
            heroId={selection.hero.characterId}
          />
        )}
        {selection?.hero && !isOwnHeroesLoading && (
          <HeroStats
            heroId={selection.hero.characterId}
            energy={selection.hero.energy}
            earnPerHour={selection.hero.earn_per_hour}
            earnPerTap={selection.hero.earn_per_tap}
            heroRarity={selection.hero.rarity}
            ctaType={ctaType}
            onCtaClick={() => 
              isSelectableHero
                ? () =>
                    selection.hero && setProfileHero(selection.hero.characterId)
                : undefined
            }
          />
        )}
      </div>
    </div>
  );
};
