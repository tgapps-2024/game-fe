import React, { useEffect, useState } from "react";

import { PageWrapper, ProfileHeader } from "@/components/common";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useGetProfile } from "@/services/profile/queries";
import { IProfile } from "@/services/profile/types";

import { BoosterContent } from "./components/booster-content/BoosterContent";
import { EarningsContent } from "./components/earnings-content/EarningsContent";
import { GetAllButton } from "./components/get-all-button/GetAllButton";
import { RewardsContent } from "./components/rewards-content/RewardsContent";
import { Tabs } from "./components/tabs/Tabs";
import { TabsEnum } from "./enums";

export const Rewards = () => {
  const { data: profile, isLoading: isProfileLoading } = useGetProfile();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleTabChange = (index: number) => {
    setCurrent(index);
    if (api) {
      api.scrollTo(index - 1); // Индексация в карусели начинается с 0
    }
  };

  return (
    <PageWrapper className="flex flex-col bg-blue-800 pt-28">
      <ProfileHeader
        isLoading={isProfileLoading}
        profileData={profile ?? ({} as IProfile)}
      />
      <div className="mt-6 flex flex-1 flex-col gap-6">
        <Tabs
          activeTab={current}
          setActiveTab={handleTabChange}
          tabs={Object.values(TabsEnum)}
        />
        <Carousel setApi={setApi}>
          <CarouselContent>
            <CarouselItem>
              <EarningsContent />
            </CarouselItem>
            <CarouselItem>
              <RewardsContent />
            </CarouselItem>
            <CarouselItem>
              <BoosterContent />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
      {current === 2 && <GetAllButton />}
    </PageWrapper>
  );
};
