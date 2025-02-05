import React from "react";

import { ProfileHeader } from "@/components/common";
import { useTelegram } from "@/context";
import { getTgSafeAreaInsetTop } from "@/utils/telegram";

import { HeroStats } from "./components/hero-stats/HeroStats";
import { HeroView } from "./components/hero-view/HeroView";

export const HeroesProfile = () => {
  const { webApp } = useTelegram();

  if (!webApp) return null;

  const insetTop = getTgSafeAreaInsetTop(webApp);

  return (
    <div
      className="relative aspect-[0.78] bg-[url('/assets/png/heroes/bg.png')] bg-[length:100%] bg-no-repeat pt-28"
      style={insetTop ? { paddingTop: insetTop } : undefined}
    >
      <ProfileHeader />

      <div className="absolute bottom-[10%] w-full pt-[77%]">
        <HeroView />
        <HeroStats />
      </div>
    </div>
  );
};
