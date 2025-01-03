import React from "react";

import Image from "next/image";

import BPHeader from "@/public/assets/png/battle-pass/bp-header.png";
import ClockImage from "@/public/assets/png/battle-pass/clock.webp";

export const BattlePassHeader = () => {
  return (
    <div className="absolute -top-13 h-[14vw] w-full">
      <Image src={BPHeader} alt="Battle Pass Header" fill priority />
      <span className="text-stroke-1 relative left-1/2 top-3 z-10 inline-block -translate-x-1/2 text-2xl font-black uppercase tracking-wide text-shadow">
        Battle Pass
      </span>
      {/* <ClockSVG className="relative left-1/2 top-3 w-[24.359vw] -translate-x-1/2" /> */}

      <div className="relative left-1/2 top-3 h-[7.3vw] w-[24.359vw] -translate-x-1/2">
        <Image src={ClockImage} alt="Clock" fill priority />
      </div>
    </div>
  );
};
