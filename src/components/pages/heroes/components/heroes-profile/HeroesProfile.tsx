import React, { useContext } from "react";

import { ProfileHeader } from "@/components/common";
import { useTelegram } from "@/context";
import { HeroesContext } from "@/context/heroes-context/HeroesContext";
import { HeroRarity } from "@/services/heroes/types";
import { getTgSafeAreaInsetTop } from "@/utils/telegram";

import { HeroStats } from "./components/hero-stats/HeroStats";
import { HeroView } from "./components/hero-view/HeroView";

export const HeroesProfile = () => {
  const { webApp } = useTelegram();

  const { selection } = useContext(HeroesContext);

  if (!webApp) return null;

  const insetTop = getTgSafeAreaInsetTop(webApp);

  return (
    <div
      className="relative aspect-[0.78] bg-[url('/assets/png/heroes/bg.png')] bg-[length:100%] bg-no-repeat pt-28"
      style={insetTop ? { paddingTop: insetTop } : undefined}
    >
      <ProfileHeader />

      {selection?.hero && (
        <div className="absolute bottom-[10%] w-full pt-[77%]">
          <HeroView
            heroId={selection.hero.characterId}
            heroRarity={HeroRarity.COMMON}
            className="left-0 top-0 h-full w-[56%]"
          />
          <HeroStats
            energy={selection.hero.energy}
            earnPerHour={selection.hero.earn_per_hour}
            earnPerTap={selection.hero.earn_per_tap}
          />
        </div>
      )}
    </div>
  );
};
