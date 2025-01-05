import React from "react";

import { Clock } from "../clock/Clock";

export const Timer = () => {
  return (
    <div className="relative -top-3.5 z-50 mx-auto flex w-fit translate-x-2 items-center justify-center">
      <Clock />
      <div className="text-stroke-half relative -left-3 flex h-[22px] w-20 items-center rounded-md bg-[#A90A31] pl-4 text-xs font-black tracking-wide text-white shadow-[inset_-1px_1px_1px_rgba(255,255,255,0.15),inset_-1px_-2px_1px_rgba(0,0,0,0.3),0_2px_2px_rgba(0,0,0,0.3)] text-shadow-sm">
        29д. 13ч
      </div>
    </div>
  );
};
