import React, { FunctionComponent } from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";
import { motion } from "framer-motion";

import { CollectButton } from "@/components/ui";
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
          <CollectButton
            className="absolute -top-2 z-20"
            onClick={handleCollect}
          >
            {t(
              `${NS.PAGES.BATTLE_PASS.BUTTONS.ROOT}.${NS.PAGES.BATTLE_PASS.BUTTONS.COLLECT}`,
            )}
          </CollectButton>
        )}

        <div
          className={classNames(
            "relative flex h-full w-full items-center justify-center",
          )}
        >
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
              "text-stroke-1 relative z-10 ml-1 mt-1 text-sm font-black leading-none text-white text-shadow-sm",
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
          <CollectButton
            className="absolute -top-2 z-20"
            onClick={handleCollect}
            isLocked
          />
        )}
        <div className="relative flex h-full w-full flex-col items-center">
          <MysteryChest className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2" />
        </div>
      </motion.div>
    </div>
  );
};
