import React, { UIEvent, useState } from "react";

import { Spinner } from "@/components/common";
import { useTelegram } from "@/context";

import { BattlePassHeader } from "./components/battle-pass-header/BattlePassHeader";
import { Timer } from "./components/battle-pass-header/timer/Timer";
import { ChestBoard } from "./components/chest-board/ChestBoard";
import { LevelComponent } from "./components/level-component/LevelComponent";

export const BattlePass = () => {
  const { webApp } = useTelegram();
  const [bgScaleDelta, setBgScaleDelta] = useState(0);

  if (!webApp || !webApp.initDataUnsafe?.user) {
    return (
      <div className="flex h-screen max-h-screen w-full items-center justify-center overflow-y-auto overscroll-contain bg-blue-800 py-10">
        <Spinner className="mx-auto stroke-white" />
      </div>
    );
  }

  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.target as HTMLDivElement;

    if (scrollTop <= 0) {
      setBgScaleDelta(Math.abs(scrollTop) * 2);
    } else {
      setBgScaleDelta(0);
    }
  };

  return (
    <div
      className="h-screen max-h-screen w-full overflow-y-auto overscroll-contain bg-blue-800 pt-[56.25%]"
      onScroll={onScroll}
    >
      <BattlePassHeader bgScaleDelta={bgScaleDelta} />
      <Timer />
      <LevelComponent />
      <ChestBoard />
    </div>
  );
};
