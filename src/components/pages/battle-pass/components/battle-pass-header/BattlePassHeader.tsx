import React from "react";

import Image from "next/image";

import classNames from "classnames";

import BPBackground from "@/public/assets/png/battle-pass/bp-bg.png";

export const BattlePassHeader = () => {
  return (
    <div className="relative w-full">
      <div className="relative aspect-[13/8] object-contain">
        <Image src={BPBackground} fill priority alt="" />
      </div>
      <div className="absolute bottom-0 w-full">
        <div className="mx-auto w-fit rounded-t-2xl bg-[#FFCE08] p-1">
          <div
            className={classNames(
              "w-fit rounded-b-md rounded-t-xl bg-orange-550 px-[30px] py-3 shadow-battle-pass-combined",
              "text-stroke-half text-2xl font-black uppercase tracking-wide text-white text-shadow",
            )}
          >
            Battle Pass
          </div>
        </div>
        <div className="absolute bottom-0 w-full">
          <div className="h-1.5 w-full bg-[#FFCE08] shadow-inner-light" />
          <div className="relative h-0.5 w-full bg-[#E88C0E]" />
        </div>
      </div>
    </div>
  );
};
