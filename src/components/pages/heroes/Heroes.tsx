import React from "react";

import { PageWrapper, ProfileHeader } from "@/components/common";
import { useGetProfile } from "@/services/profile/queries";
import { IProfile } from "@/services/profile/types";

export const Heroes = () => {
  const { data: profile, isLoading: isProfileLoading } = useGetProfile();

  return (
    <PageWrapper className="bg-blue-800 pt-28">
      <ProfileHeader
        isLoading={isProfileLoading}
        profileData={profile ?? ({} as IProfile)}
      />
    </PageWrapper>
  );
};
