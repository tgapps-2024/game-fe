import React, { FunctionComponent } from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";
import { motion } from "framer-motion";

import { PentagonLockedXS, PentagonXS } from "@/components/ui";
import { NS } from "@/constants/ns";
import LevelSvg from "@/public/assets/svg/battle-pass/bp-level.svg";
import InactiveLevel from "@/public/assets/svg/battle-pass/inactive-level.svg";
import MysteryChest from "@/public/assets/svg/battle-pass/mystery-chest.svg";
import RegularChest from "@/public/assets/svg/battle-pass/regular-chest.svg";

type Props = {
  level: number;
  onCollect: () => void;
  currentLevel: number;
};

export const ChestRow: FunctionComponent<Props> = ({
  level,
  onCollect,
  currentLevel,
}) => {
  const t = useTranslations(NS.PAGES.BATTLE_PASS.ROOT);

  const handleCollect = () => {
    onCollect();
  };
  const isLowerLevel = currentLevel < level;

  return (
    <div className="relative grid w-full grid-cols-[1fr_1.2fr] gap-0.5">
      <motion.div
        className={classNames(
          "relative flex h-[120px] items-center justify-center",
        )}
        initial={{ backgroundPosition: "top" }}
        animate={{
          background: isLowerLevel
            ? "linear-gradient(to bottom, #09376B, #093069)"
            : "linear-gradient(to bottom, #29D6FF, #2596E4)",
        }}
        transition={{
          duration: 1,
          ease: "easeInOut",
        }}
      >
        {!isLowerLevel && (
          <motion.button
            className="absolute -top-2 z-20 flex items-center justify-center"
            whileTap={{ scale: 0.98 }}
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            onClick={handleCollect}
          >
            <PentagonXS />
            <span className="text-stroke-1 absolute z-10 mb-2.5 text-[11px] font-black leading-none tracking-wide text-white text-shadow-sm">
              {t(
                `${NS.PAGES.BATTLE_PASS.BUTTONS.ROOT}.${NS.PAGES.BATTLE_PASS.BUTTONS.COLLECT}`,
              )}
            </span>
          </motion.button>
        )}

        <div className={classNames("relative flex flex-col items-center")}>
          <RegularChest />
        </div>
        <div className="absolute -right-5 z-10 flex size-10 items-center justify-center">
          {!isLowerLevel ? (
            <LevelSvg className="absolute inset-0" />
          ) : (
            <InactiveLevel className="absolute inset-0" />
          )}
          <span
            className={classNames(
              "text-stroke-1 relative z-10 text-sm font-black leading-none text-white text-shadow-sm",
              { "ml-0.5 mt-0.5": isLowerLevel },
            )}
          >
            {level}
          </span>
        </div>
      </motion.div>
      <motion.div
        className={classNames(
          "relative flex h-[120px] items-center justify-center",
        )}
        initial={{ backgroundPosition: "top" }}
        animate={{
          background: isLowerLevel
            ? "linear-gradient(to bottom, #471A6A, #340C62)"
            : "linear-gradient(to bottom, #EE84FF, #7740F5)",
        }}
        transition={{
          duration: 1,
          ease: "easeInOut",
        }}
      >
        {!isLowerLevel && (
          <motion.button
            className="absolute -top-2 z-20 flex items-center justify-center"
            whileTap={{ scale: 0.98 }}
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <PentagonLockedXS />
          </motion.button>
        )}
        <MysteryChest />
      </motion.div>
    </div>
  );
};
