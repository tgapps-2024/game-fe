import React, { UIEvent, useState } from "react";

import { PageWrapper } from "@/components/common";

import { BattlePassHeader } from "./components/battle-pass-header/BattlePassHeader";
import { Timer } from "./components/battle-pass-header/timer/Timer";
import { BottomMenu } from './components/bottom-menu/BottomMenu';
import { ChestBoard } from "./components/chest-board/ChestBoard";
import { LevelComponent } from "./components/level-component/LevelComponent";

export const BattlePass = () => {
  const [bgScaleDelta, setBgScaleDelta] = useState(0);

  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.target as HTMLDivElement;

    if (scrollTop <= 0) {
      setBgScaleDelta(Math.abs(scrollTop) * 2);
    } else {
      setBgScaleDelta(0);
    }
  };

  return (
    <PageWrapper
      className="bg-blue-800 pt-[56.25%] pb-26"
      onScroll={onScroll}
      disableSafeAreaInset
    >
      <BattlePassHeader bgScaleDelta={bgScaleDelta} />
      <Timer />
      <LevelComponent />
      <ChestBoard />
      <BottomMenu />
    </PageWrapper>
  );
};
