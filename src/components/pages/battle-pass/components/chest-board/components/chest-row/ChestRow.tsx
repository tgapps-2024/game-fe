import React, { FunctionComponent } from "react";

import { useTranslations } from "next-intl";

import { motion } from "framer-motion";

import { PentagonLockedXS, PentagonXS } from "@/components/ui";
import { NS } from "@/constants/ns";
import LevelSvg from "@/public/assets/svg/battle-pass/bp-level.svg";
import MysteryChest from "@/public/assets/svg/battle-pass/mystery-chest.svg";
import RegularChest from "@/public/assets/svg/battle-pass/regular-chest.svg";

type Props = {
  level: number;
  hasCollectButtons?: boolean;
};

export const ChestRow: FunctionComponent<Props> = ({
  hasCollectButtons = false,
  level,
}) => {
  const t = useTranslations(NS.PAGES.BATTLE_PASS.ROOT);

  return (
    <div className="relative grid w-full grid-cols-[1fr_1.2fr] gap-0.5">
      <div className="relative flex min-h-[120px] items-center justify-center bg-gradient-to-b from-[#29D6FF] to-[#2596E4]">
        {hasCollectButtons && (
          <motion.button
            className="absolute -top-2 flex items-center justify-center"
            whileTap={{ scale: 0.98 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
          >
            <PentagonXS />
            <span className="text-stroke-1 absolute z-10 mb-2.5 text-[11px] font-black leading-none tracking-wide text-white text-shadow">
              {t(
                `${NS.PAGES.BATTLE_PASS.BUTTONS.ROOT}.${NS.PAGES.BATTLE_PASS.BUTTONS.COLLECT}`,
              )}
            </span>
          </motion.button>
        )}

        <RegularChest />
        <div className="absolute -right-5 z-10 flex size-10 items-center justify-center">
          <LevelSvg className="absolute inset-0" />
          <span className="text-stroke-1 relative z-10 text-sm font-black leading-none text-white text-shadow">
            {level}
          </span>
        </div>
      </div>
      <div className="relative flex min-h-[120px] items-center justify-center bg-gradient-to-b from-[#EE84FF] to-[#7740F5]">
        {hasCollectButtons && (
          <motion.button
            className="absolute -top-2 flex items-center justify-center"
            whileTap={{ scale: 0.98 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
          >
            <PentagonLockedXS />
          </motion.button>
        )}
        <MysteryChest />
      </div>
    </div>
  );
};
