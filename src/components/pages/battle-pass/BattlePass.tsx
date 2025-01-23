import React from "react";

import { Spinner } from "@/components/common";
import { useTelegram } from "@/context";

import { BattlePassHeader } from "./components/battle-pass-header/BattlePassHeader";
import { Timer } from "./components/battle-pass-header/timer/Timer";
import { BottomMenu } from './components/bottom-menu/BottomMenu';
import { ChestBoard } from "./components/chest-board/ChestBoard";
import { LevelComponent } from "./components/level-component/LevelComponent";

export const BattlePass = () => {
  const { webApp } = useTelegram();

  if (!webApp || !webApp.initDataUnsafe?.user) {
    return (
      <div className="flex h-screen max-h-screen w-full items-center justify-center overflow-y-auto overscroll-contain bg-blue-800 py-10">
        <Spinner className="mx-auto stroke-white" />
      </div>
    );
  }

  return (
    <div className="h-screen max-h-screen w-full overflow-y-auto overscroll-contain bg-blue-800">
      <BattlePassHeader />
      <Timer />
      <LevelComponent />
      <ChestBoard />
      <BottomMenu />
    </div>
  );
};
