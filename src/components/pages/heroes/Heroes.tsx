import React from "react";

import { PageWrapper, ProfileHeader } from "@/components/common";
import { useGetProfile } from "@/services/profile/queries";
import { IProfile } from "@/services/profile/types";

import { HeroesGrid } from "./components/heroes-grid/HeroesGrid";

export const Heroes = () => {
  const { data: profile, isLoading: isProfileLoading } = useGetProfile();

  return (
    <PageWrapper className="relative bg-[url('/assets/png/heroes/bg.png')] bg-[length:100%] bg-no-repeat pt-28">
      <ProfileHeader
        isLoading={isProfileLoading}
        profileData={profile ?? ({} as IProfile)}
      />
      <div className="absolute inset-0 flex h-screen max-h-screen flex-col pt-[128%]">
        <HeroesGrid />
      </div>
    </PageWrapper>
  );
};
