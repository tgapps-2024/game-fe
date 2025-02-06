import React, { useEffect, useState } from "react";

import { PageWrapper, ProfileHeader } from "@/components/common";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  useGetBoosters,
  useGetDailyReward,
  useGetDailyRewardInfo,
} from "@/services/rewards/queries";
import { IBoosters, IDailyRewardInfo } from "@/services/rewards/types";
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
  const { data: dailyRewardInfo, isLoading: isLoadingDailyReward } =
    useGetDailyRewardInfo();
  const { mutate: getDailyReward, isPending } = useGetDailyReward(queryClient);
  const { data, isLoading: isLoadingBoosters } = useGetBoosters();

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
    <PageWrapper
      className="flex flex-col bg-blue-800 pt-4"
      isLoading={isLoadingDailyReward || isLoadingBoosters}
    >
      <ProfileHeader />
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
              <BoosterContent
                boosters={data ?? ({} as IBoosters)}
                isActive={current === 3}
              />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
      {current === 2 && (
        <GetAllButton
          disabled={!dailyRewardInfo?.available}
          isLoading={isPending}
          onClick={getDailyReward}
        />
      )}
    </PageWrapper>
  );
};
