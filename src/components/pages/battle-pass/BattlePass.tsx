import React, { useEffect, useState } from "react";

import { Spinner } from "@/components/common";
import { useTelegram } from "@/context";

import BackgroundImage from "@/public/assets/png/battle-pass/bp-bg.png";
import Image from "next/image";
import { BattlePassHeader } from "./components/battle-pass-header/BattlePassHeader";

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
      <div className="absolute inset-0 bg-[url('/assets/png/battle-pass/bp-bg.png')] bg-[length:100%_30vh] bg-fixed bg-top bg-no-repeat" />

      <div className="relative z-10 pt-[30vh]">
        <div className="relative flex flex-col items-center gap-4 bg-blue-800">
          <BattlePassHeader />
        </div>
      </div>
    </div>
  );
};
