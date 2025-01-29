import React from "react";

import classNames from "classnames";

import { BattlePassProgressBar } from "./components/battle-pass-progress-bar/BattlePassProgressBar";
import { Timer } from "./components/timer/Timer";

export const BattlePassListHeader = () => (
  <div className="absolute bottom-0 w-full">
    <div className="mx-auto w-fit rounded-t-2xl bg-[#FFCE08] p-1">
      <div
        className={classNames(
          "w-fit rounded-b-md rounded-t-xl bg-orange-550 px-[30px] py-2 shadow-battle-pass-combined",
          "text-stroke-half text-2xl font-black uppercase tracking-wide text-white text-shadow",
        )}
      >
        Battle Pass
      </div>
    </div>
    <div className="flex w-full flex-col">
      <div className="h-1.5 w-full bg-[#FFCE08] shadow-inner-light" />
      <div className="relative h-0.5 w-full bg-[#E88C0E]" />
    </div>
    <BattlePassProgressBar />
    <div className="flex w-full flex-col">
      <div className="h-1.5 w-full bg-[#FFCE08] shadow-inner-light" />
      <div className="relative h-0.5 w-full bg-[#E88C0E]" />
    </div>
    <Timer />
  </div>
);
