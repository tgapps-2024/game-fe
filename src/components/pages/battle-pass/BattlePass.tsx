import React, { useEffect, useState } from "react";

import { Spinner } from "@/components/common";
import { useTelegram } from "@/context";

import { BattlePassHeader } from "./components/battle-pass-header/BattlePassHeader";
import { Timer } from "./components/battle-pass-header/timer/Timer";
import { ChestBoard } from "./components/chest-board/ChestBoard";
import { LevelComponent } from "./components/level-component/LevelComponent";

export const BattlePass = () => {
  const { webApp } = useTelegram();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (webApp) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
      } else {
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
      }
    };

    loadData();
  }, [webApp]);

  if (!webApp || !webApp.initDataUnsafe?.user || isLoading) {
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
    </div>
  );
};
