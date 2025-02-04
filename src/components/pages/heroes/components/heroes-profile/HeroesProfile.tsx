import React from "react";

import { ProfileHeader } from "@/components/common";
import { useTelegram } from "@/context";
import { useGetProfile } from "@/services/profile/queries";
import { IProfile } from "@/services/profile/types";
import { getTgSafeAreaInsetTop } from "@/utils/telegram";

import { HeroStats } from "./components/hero-stats/HeroStats";
import { HeroView } from "./components/hero-view/HeroView";

export const HeroesProfile = () => {
  const { webApp } = useTelegram();
  const { data: profile, isLoading: isProfileLoading } = useGetProfile();

  if (!webApp) return null;

  const insetTop = getTgSafeAreaInsetTop(webApp);

  return (
    <div
      className="relative aspect-[0.78] bg-[url('/assets/png/heroes/bg.png')] bg-[length:100%] bg-no-repeat pt-28"
      style={insetTop ? { paddingTop: insetTop } : undefined}
    >
      <ProfileHeader
        isLoading={isProfileLoading}
        profileData={profile ?? ({} as IProfile)}
      />

      <div className="absolute pt-[77%] w-full bottom-[10%]">
        <HeroView />
        <HeroStats />
      </div>
    </div>
  );
};
