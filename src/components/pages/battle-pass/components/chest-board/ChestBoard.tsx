import React from "react";

import { ChestRow } from "./components/chest-row/ChestRow";

export const ChestBoard = () => {
  return (
    <div className="relative -top-7 left-0 w-full">
      <div className="flex flex-col">
        <div className="h-1.5 w-full bg-[#FFCE08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3),inset_0_-1px_0.5px_0_rgba(255,255,255,0.3)]" />
        <div className="h-0.5 w-full bg-[#E88C0E] shadow-[0_4px_12px_0_rgba(0,0,0,0.6),0_2px_0_0_rgba(255,255,255,0.5)]" />
      </div>
      <div className="flex flex-col gap-0.5">
        <ChestRow level={1} hasCollectButtons />
        <ChestRow level={2} />
      </div>
    </div>
  );
};
