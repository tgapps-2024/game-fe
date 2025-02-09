import React, { FunctionComponent } from "react";

import Image from "next/image";

import classNames from "classnames";

import RegularChest from "@/public/assets/png/battle-pass/mystery-chest.webp";
import BatteryImage from "@/public/assets/png/rewards/full-energy.webp";
import LockSvg from "@/public/assets/svg/lock.svg";
import StarSVG from "@/public/assets/svg/star.svg";
import { formatNumber } from "@/utils/number";

type Props = {
  isAnimated: boolean;
};

export const Combo: FunctionComponent<Props> = ({ isAnimated }) => {
  return (
    <div
      className={classNames(
        "relative mb-4 flex w-full flex-col items-center justify-between gap-2 rounded-2xl bg-blue-700 p-3 shadow-[inset_1px_1px_0_0_rgba(255,255,255,0.1),inset_-1px_-1px_0_0_rgba(255,255,255,0.1)]",
      )}
    >
      <div className="combo-border-radius relative w-full bg-white/5 p-3">
        <span className="text-stroke-1 text-sm font-black leading-none tracking-[0.04em] text-white text-shadow-sm">
          Комбо
        </span>
        <button
          className={classNames(
            "absolute right-0 top-0 h-full rounded-full border border-solid border-black bg-[#0655A4] pb-0.5",
            "transition-all duration-500 ease-in-out active:scale-95",
          )}
        >
          <div className="flex h-full w-full items-center rounded-full bg-[#0075FF] px-4 py-2 shadow-inset-btn">
            <div className="text-stroke-half grid grid-cols-[16px_1fr] items-center gap-1 text-xs font-extrabold text-white text-shadow-sm">
              <StarSVG className="size-4" />+{formatNumber(1200000)}
            </div>
          </div>
        </button>
      </div>
      <div className="grid w-full grid-cols-3 items-center gap-3">
        <div className="flex flex-col items-center gap-2">
          <div className="relative flex aspect-square w-full items-center justify-center rounded-lg bg-gradient-to-b from-[#26A4C3] to-[#6FFFFF] p-3 shadow-[inset_2px_2px_2px_0_rgba(255,255,255,0.4)]">
            <div
              className={classNames("relative h-full w-full", {
                "animate-tilt": isAnimated,
              })}
            >
              <Image src={RegularChest} alt="Energy image" fill />
            </div>
            {isAnimated && (
              <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden rounded-xl">
                <div className="absolute top-0 h-[140%] w-[66px] rotate-[30deg] animate-card-glow-running bg-card-glow-pattern will-change-transform" />
              </div>
            )}
          </div>
          <span className="text-xs font-semibold text-[#F0F2F5]">
            Старс-Банк
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="relative flex aspect-square w-full items-center justify-center rounded-lg bg-gradient-to-b from-[#EE84FF] to-[#7740F5] p-3 shadow-[inset_2px_2px_2px_0_rgba(255,255,255,0.4)]">
            <div
              className={classNames("relative h-full w-full", {
                "animate-tilt": isAnimated,
              })}
            >
              <Image src={BatteryImage} alt="Energy image" fill />
            </div>
            {isAnimated && (
              <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden rounded-xl">
                <div className="absolute top-0 h-[140%] w-[66px] rotate-[30deg] animate-card-glow-running bg-card-glow-pattern will-change-transform" />
              </div>
            )}
          </div>
          <span className="text-xs font-semibold text-[#F0F2F5]">
            Доставка еды
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="relative flex aspect-square w-full items-center justify-center rounded-lg bg-white/5 p-1.5">
            <LockSvg className="size-8 fill-white/30" />
          </div>
          <span className="text-xs font-semibold text-[#F0F2F5]/30">?</span>
        </div>
      </div>
    </div>
  );
};
