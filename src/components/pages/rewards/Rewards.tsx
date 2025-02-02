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
import {
  useGetDailyReward,
  useGetDailyRewardInfo,
} from "@/services/rewards/queries";
import { IDailyRewardInfo } from "@/services/rewards/types";
import { useQueryClient } from "@tanstack/react-query";

import { BoosterContent } from "./components/booster-content/BoosterContent";
import { EarningsContent } from "./components/earnings-content/EarningsContent";
import { GetAllButton } from "./components/get-all-button/GetAllButton";
import { RewardsContent } from "./components/rewards-content/RewardsContent";
import { Tabs } from "./components/tabs/Tabs";
import { TabsEnum } from "./enums";

export const Rewards = () => {
  const queryClient = useQueryClient();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const { data: profile, isLoading: isProfileLoading } = useGetProfile();
  const { data: dailyRewardInfo, isLoading: isDailyRewardInfoLoading } =
    useGetDailyRewardInfo();
  const { mutate: getDailyReward, isPending } = useGetDailyReward(queryClient);

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
      api.scrollTo(index - 1);
    }
  };

  return (
    <PageWrapper className="flex flex-col bg-blue-800 pt-28">
      <ProfileHeader
        isLoading={isProfileLoading && isDailyRewardInfoLoading}
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
              <EarningsContent isActive={current === 1} />
            </CarouselItem>
            <CarouselItem>
              <RewardsContent
                onCollectReward={getDailyReward}
                dailyRewardInfo={dailyRewardInfo ?? ({} as IDailyRewardInfo)}
                isActive={current === 2}
              />
            </CarouselItem>
            <CarouselItem>
              <BoosterContent isActive={current === 3} />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
      {current === 2 && dailyRewardInfo?.available && (
        <GetAllButton isLoading={isPending} onClick={getDailyReward} />
      )}
    </PageWrapper>
  );
};
