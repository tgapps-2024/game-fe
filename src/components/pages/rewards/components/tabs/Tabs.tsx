import React, { FunctionComponent } from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";

import { NS } from "@/constants/ns";

import { TabsEnum } from "../../enums";

type Props = {
  activeTab: TabsEnum;
  setActiveTab: (tab: TabsEnum) => void;
  tabs: TabsEnum[];
};

export const Tabs: FunctionComponent<Props> = ({
  activeTab,
  setActiveTab,
  tabs,
}) => {
  const t = useTranslations(NS.PAGES.REWARDS.ROOT);

  return (
    <div className="relative grid grid-cols-3 rounded-xl bg-blue-700">
      <div
        className={classNames(
          "absolute h-[calc(100%_-_4px)] w-[calc(33.33%_-_4px)]",
          "top-0.5 transition-all duration-300",
          "rounded-[10px] bg-white/10",
          {
            "left-0.5": activeTab === TabsEnum.EARNINGS,
            "left-[calc(33.33%_+_2px)]": activeTab === TabsEnum.REWARDS,
            "left-[calc(66.66%_+_2px)]": activeTab === TabsEnum.BOOSTERS,
          },
        )}
      />
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={classNames(
            "m-0.5 rounded-[10px] px-4 py-3 text-sm font-medium leading-none",
            {
              "text-gray-500": activeTab !== tab,
            },
          )}
        >
          {t(`${NS.PAGES.REWARDS.TABS.ROOT}.${tab}`)}
        </button>
      ))}
    </div>
  );
};
