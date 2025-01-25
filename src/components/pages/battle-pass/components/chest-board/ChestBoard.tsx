/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";

import { ChestRow } from "./components/chest-row/ChestRow";
import { Star } from "./components/star/Star";

const INITIAL_POSITION = 116;
const STEP_POSITION = 122;
const CURRENT_LEVEL = 3;
const MAX_LEVEL = 50;

export const ChestBoard = () => {
  const [level, setLevel] = useState(CURRENT_LEVEL);
  const [collectedPrizes, setCollectedPrizes] = useState(
    INITIAL_POSITION + STEP_POSITION * (CURRENT_LEVEL - 1),
  );

  const handlePrizeCollect = () => {
    // setCollectedPrizes((prev) => prev + STEP_POSITION);
  };

  const handleChangeLevel = () => {
    // if (level < MAX_LEVEL) {
    //   setLevel((prev) => prev + 1);
    // }
  };

  const renderChestRows = (totalLevels: number) =>
    Array(totalLevels)
      .fill(null)
      .map((_, index) => {
        const tempLevel = index + 1;

        return (
          <ChestRow
            key={`level-${tempLevel}`}
            level={tempLevel}
            currentLevel={level}
            onCollect={handleChangeLevel}
          />
        );
      });

  return (
    <div className="relative left-0 w-full bg-blue-800">
      <div className="flex flex-col">
        <div className="h-1.5 w-full bg-[#FFCE08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3),inset_0_-1px_0.5px_0_rgba(255,255,255,0.3)]" />
        <div className="relative z-20 h-0.5 w-full bg-[#E88C0E] shadow-[0_4px_12px_0_rgba(0,0,0,0.6),0_2px_0_0_rgba(0,0,0,0.5)]" />
      </div>
      <div className="relative flex flex-col gap-0.5">
        {!level || level < MAX_LEVEL ? (
          <div
            className="absolute left-0 z-20 flex w-full flex-col items-center pb-0.5 bg-black"
            style={{ top: `${collectedPrizes}px` }}
          >
            <Star className="absolute left-[45%] translate-x-[-17px] translate-y-[-16px]" />
            <div className="h-1.5 w-full bg-[#FFCE08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3),inset_0_-1px_0.5px_0_rgba(255,255,255,0.3)]" />
            <div className="h-0.5 w-full bg-[#a6552d]" />
          </div>
        ) : null}
        {renderChestRows(MAX_LEVEL)}
      </div>
    </div>
  );
};
