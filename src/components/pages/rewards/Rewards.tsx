import React, { useState } from "react";

import { useSwipeable } from "react-swipeable";

import { PageWrapper, ProfileHeader } from "@/components/common";
import { useGetProfile } from "@/services/profile/queries";
import { IProfile } from "@/services/profile/types";

import { GetAllButton } from "./components/get-all-button/GetAllButton";
import { TabContent } from "./components/tab-content/TabContent";
import { Tabs } from "./components/tabs/Tabs";
import { TabsEnum } from "./enums";

export const Rewards = () => {
  const { data: profile, isLoading: isProfileLoading } = useGetProfile();
  const [activeTab, setActiveTab] = useState<TabsEnum>(TabsEnum.REWARDS);

  const handleSwipeLeft = () => {
    if (activeTab !== TabsEnum.BOOSTERS) {
      const nextTab =
        Object.values(TabsEnum)[Object.values(TabsEnum).indexOf(activeTab) + 1];
      setActiveTab(nextTab);
    }
  };

  const handleSwipeRight = () => {
    if (activeTab !== TabsEnum.EARNINGS) {
      const prevTab =
        Object.values(TabsEnum)[Object.values(TabsEnum).indexOf(activeTab) - 1];
      setActiveTab(prevTab);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
    trackMouse: true,
  });

  return (
    <PageWrapper className="flex flex-col bg-blue-800 pt-28">
      <ProfileHeader
        isLoading={isProfileLoading}
        profileData={profile ?? ({} as IProfile)}
      />
      <div className="mx-4 mt-6 flex flex-1 flex-col" {...swipeHandlers}>
        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={Object.values(TabsEnum)}
        />
        <TabContent activeTab={activeTab} tabs={Object.values(TabsEnum)} />
      </div>
      {activeTab === TabsEnum.REWARDS && <GetAllButton />}
    </PageWrapper>
  );
};
