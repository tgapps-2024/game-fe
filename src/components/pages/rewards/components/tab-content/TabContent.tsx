import React, { FunctionComponent } from "react";

import { TabsEnum } from "../../enums";

import { MAP_COMPONENTS } from "./constants";

type Props = {
  activeTab: TabsEnum;
  tabs: TabsEnum[];
};

export const TabContent: FunctionComponent<Props> = ({ activeTab, tabs }) => {
  return (
    <div className="relative mt-4 flex-1">
      {tabs.map((tab) => (
        <div
          key={tab}
          className={`h-full transition-transform duration-300 ease-in-out ${
            activeTab === tab ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ display: activeTab === tab ? "block" : "none" }}
        >
          {React.createElement(MAP_COMPONENTS[tab], {})}
        </div>
      ))}
    </div>
  );
};
