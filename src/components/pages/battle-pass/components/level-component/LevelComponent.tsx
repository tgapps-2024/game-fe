import React from "react";

import { useTranslations } from "next-intl";

import { motion } from "framer-motion";

import { Pentagon } from "@/components/ui/svgr-icons/Pentagon";
import { NS } from "@/constants/ns";

import { Level } from "../level/Level";

const CURRENT_LEVEL = 1;

export const LevelComponent = () => {
  const t = useTranslations(NS.PAGES.BATTLE_PASS.ROOT);

  return (
    <div className="relative z-10 flex flex-col">
      <div className="h-0.5 w-full bg-[#35637D]" />
      <div className="grid w-full grid-cols-[1fr_1.2fr] items-center justify-center gap-0.5 bg-gradient-to-b from-[#04A0F5] to-[#0A4CDE] px-4 py-3 shadow-[inset_0_-4px_2px_0_rgba(0,0,0,0.3),inset_0_4px_2px_0_rgba(255,255,255,0.4)]">
        <div className="relative flex w-full max-w-[180px] items-center justify-between justify-self-end">
          <Level level={CURRENT_LEVEL} />
          <div className="absolute left-5 flex w-[calc(100%_-_20px)] flex-col items-center bg-[#0932A4] py-[3px] shadow-[inset_0px_-4px_8px_0_rgba(255,255,255,0.6),inset_0px_4px_8px_0_rgba(255,255,255,0.6)]">
            <div className="absolute left-0 top-0 h-1 w-full bg-[#42DDFC] shadow-[inset_0px_1px_0.5px_rgba(255,255,255,0.3)]" />
            <span className="text-stroke-1 relative z-10 inline-block py-[3px] text-sm font-black leading-none tracking-wide text-white text-shadow-sm">
              14к/50к
            </span>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-[#42DDFC] shadow-[inset_0px_-1px_0.5px_rgba(255,255,255,0.3)]" />
          </div>
          <Level className="relative -right-5" level={CURRENT_LEVEL + 1} />
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
          <Pentagon className="relative left-2 w-[120px]" />
          <span className="text-stroke-1 text-shadow-sm-sm absolute z-10 mb-2 ml-4 font-black leading-none text-white">
            {t(
              `${NS.PAGES.BATTLE_PASS.BUTTONS.ROOT}.${NS.PAGES.BATTLE_PASS.BUTTONS.IMPROVE}`,
            )}
          </span>
        </motion.button>
      </div>
    </div>
  );
};
