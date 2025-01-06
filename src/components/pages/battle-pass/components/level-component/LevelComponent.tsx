import React from "react";

import { useTranslations } from "next-intl";

import { motion } from "framer-motion";

import { Pentagon } from "@/components/ui/svgr-icons/Pentagon";
import { NS } from "@/constants/ns";
import LevelSvg from "@/public/assets/svg/battle-pass/bp-level.svg";

const CURRENT_LEVEL = 1;

export const LevelComponent = () => {
  const t = useTranslations(NS.PAGES.BATTLE_PASS.ROOT);

  return (
    <div className="relative -top-[29px] z-10 flex flex-col">
      <div className="h-0.5 w-full bg-[#35637D]" />
      <div className="flex items-center justify-center bg-gradient-to-b from-[#04A0F5] to-[#0A4CDE] px-4 py-3 shadow-[inset_0_-4px_2px_0_rgba(0,0,0,0.3),inset_0_4px_2px_0_rgba(255,255,255,0.4)]">
        <div className="relative flex items-center">
          <div className="relative z-10 flex size-10 items-center justify-center">
            <LevelSvg className="absolute inset-0" />
            <span className="text-stroke-1 relative z-10 text-sm font-black leading-none text-white text-shadow-sm">
              {CURRENT_LEVEL}
            </span>
          </div>
          <div className="relative -left-5 bg-[#0932A4] px-8 py-[3px] shadow-[inset_0px_-4px_8px_0_rgba(255,255,255,0.6),inset_0px_4px_8px_0_rgba(255,255,255,0.6)]">
            <div className="absolute left-0 top-0 h-1 w-full bg-[#42DDFC] shadow-[inset_0px_1px_0.5px_rgba(255,255,255,0.3)]" />
            <span className="text-stroke-1 relative z-10 text-sm font-black leading-none tracking-wide text-white text-shadow-sm">
              14к/50к
            </span>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-[#42DDFC] shadow-[inset_0px_-1px_0.5px_rgba(255,255,255,0.3)]" />
          </div>
          <div className="relative right-10 z-10 flex size-10 items-center justify-center">
            <LevelSvg className="absolute inset-0" />
            <span className="text-stroke-1 relative z-10 text-sm font-black leading-none text-white text-shadow-sm">
              {CURRENT_LEVEL + 1}
            </span>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center"
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
        >
          <Pentagon className="w-[120px]" />
          <span className="text-stroke-1 text-shadow-sm-sm absolute z-10 mb-2 font-black leading-none text-white">
            {t(
              `${NS.PAGES.BATTLE_PASS.BUTTONS.ROOT}.${NS.PAGES.BATTLE_PASS.BUTTONS.IMPROVE}`,
            )}
          </span>
        </motion.button>
      </div>
    </div>
  );
};
