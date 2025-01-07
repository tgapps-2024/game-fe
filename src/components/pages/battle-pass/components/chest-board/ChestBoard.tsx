/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";

import { motion } from "framer-motion";

import DividerIcon from "@/public/assets/svg/battle-pass/divider.svg";

import { ChestRow } from "./components/chest-row/ChestRow";

const INITIAL_POSITION = 116;
const STEP_POSITION = 122;
const CURRENT_LEVEL = 6;
const MAX_LEVEL = 20;

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
    <div className="relative -top-7 left-0 w-full">
      <div className="flex flex-col">
        <div className="h-1.5 w-full bg-[#FFCE08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3),inset_0_-1px_0.5px_0_rgba(255,255,255,0.3)]" />
        <div className="relative z-20 h-0.5 w-full bg-[#E88C0E] shadow-[0_4px_12px_0_rgba(0,0,0,0.6),0_2px_0_0_rgba(0,0,0,0.5)]" />
      </div>
      <div className="relative flex flex-col gap-0.5">
        {!level || level < MAX_LEVEL ? (
          <motion.div
            className="absolute left-0 z-20 flex w-full flex-col items-center"
            animate={{ top: `${collectedPrizes}px` }}
            initial={{ top: `${collectedPrizes}px` }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
          >
            <div className="relative grid w-full grid-cols-[1fr_1.2fr] gap-0.5">
              <div className="relative w-full">
                <DividerIcon className="absolute -right-8 -top-5" />
              </div>
              <div />
            </div>
            <div className="h-1.5 w-full bg-[#FFCE08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3),inset_0_-1px_0.5px_0_rgba(255,255,255,0.3)]" />
            <div className="h-0.5 w-full bg-[#E88C0E] shadow-[0_4px_12px_0_rgba(0,0,0,0.6),0_2px_0_0_rgba(255,255,255,0.5)]" />
          </motion.div>
        ) : null}
        {renderChestRows(MAX_LEVEL)}
      </div>
    </div>
  );
};
