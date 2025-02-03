import React from "react";

import { HeroType } from "@/components/pages/heroes/types";
import EnergyCoin from "@/public/assets/svg/heroes/energy-coin.svg";
import HourIcomeCoin from "@/public/assets/svg/heroes/hour-income-coin.svg";
import TapIcomeCoin from "@/public/assets/svg/heroes/tap-income-coin.svg";

import { Ribbon } from "./components/ribbon/Ribbon";

export const HeroStats = () => {
  return (
    <div className="absolute inset-y-4 right-4 w-1/2 rounded-2xl border border-[#EFC609]">
      <div className="absolute inset-0 flex flex-col items-center gap-y-2 rounded-2xl bg-[rgba(0,0,0,0.6)] p-4">
        <div className="absolute inset-x-2 bottom-[72%] top-1.5 rounded-t-2xl bg-white opacity-5" />
        <div className="text-xl font-black leading-none tracking-wide text-white text-shadow">
          Месси
        </div>
        <div className="relative">
          <Ribbon heroType={HeroType.REGULAR} />
          <div className="absolute inset-0 text-center text-x font-bold leading-4 text-white">
            Обычный
          </div>
        </div>
        <div className="flex w-full flex-col gap-y-3">
          <div className="flex w-full gap-x-2">
            <EnergyCoin className="shrink-0" />
            <div className="flex grow flex-col gap-y-1">
              <div className="flex justify-between text-xs font-semibold text-white">
                <span>Энергия</span>
                <span>312/ч</span>
              </div>
              <div className="shadow-heroes-stat-indicator-inner-dim h-1.5 rounded bg-[rgba(0,0,0,0.3)]">
                <div className="shadow-heroes-stat-indicator-glow h-full w-1/3 rounded bg-[#FFCC00]" />
              </div>
            </div>
          </div>
          <div className="flex w-full gap-x-2">
            <HourIcomeCoin className="shrink-0" />
            <div className="flex grow flex-col gap-y-1">
              <div className="flex justify-between text-xs font-semibold text-white">
                <span>Энергия</span>
                <span>312/ч</span>
              </div>
              <div className="shadow-heroes-stat-indicator-inner-dim h-1.5 rounded bg-[rgba(0,0,0,0.3)]">
                <div className="shadow-heroes-stat-indicator-glow h-full w-2/3 rounded bg-[#FFCC00]" />
              </div>
            </div>
          </div>
          <div className="flex w-full gap-x-2">
            <TapIcomeCoin className="shrink-0" />
            <div className="flex grow flex-col gap-y-1">
              <div className="flex justify-between text-xs font-semibold text-white">
                <span>Энергия</span>
                <span>312/ч</span>
              </div>
              <div className="shadow-heroes-stat-indicator-inner-dim h-1.5 rounded bg-[rgba(0,0,0,0.3)]">
                <div className="shadow-heroes-stat-indicator-glow h-full w-4/5 rounded bg-[#FFCC00]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
