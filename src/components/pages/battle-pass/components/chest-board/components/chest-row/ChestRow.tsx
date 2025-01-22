import React, { FunctionComponent } from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";

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
  const isCurrentLevel = currentLevel === level;

  return (
    <div className="relative grid w-full grid-cols-[1fr_1.2fr] gap-0.5">
      <div
        className={classNames(
          "relative flex h-30 items-center justify-center",
          {
            "bg-bp-regular-item-unlocked-pattern": isLowerLevel,
            "bg-bp-regular-item-locked-pattern": !isLowerLevel,
          },
        )}
      >
        {isCurrentLevel && (
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
          className={classNames("relative flex h-full w-full overflow-hidden")}
        >
          <RegularChest className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2" />
          <div className="w-26 h-13.5 absolute inset-0 m-auto rounded-full bg-white blur-2xl" />
          <div className="w-30 h-2.5 absolute inset-x-0 m-auto bottom-[15px] blur-[5px] bg-bp-item-shadow-pattern" />
          {!isLowerLevel && (
            <div className="animate-bp-glow-running bg-bp-regular-glow-pattern absolute inset-0 mx-0 my-auto h-60 w-full bg-[length:64px] bg-no-repeat blur-[10px]" />
          )}
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
      </div>
      <div
        className={classNames(
          "relative flex h-[120px] items-center justify-center",
          {
            "bg-bp-premium-item-unlocked-pattern": isLowerLevel,
            "bg-bp-premium-item-locked-pattern": !isLowerLevel,
          },
        )}
      >
        {isCurrentLevel && (
          <CollectButton
            className="absolute -top-2 z-20"
            onClick={handleCollect}
            isLocked
          />
        )}
        <div className="relative flex h-full w-full overflow-hidden">
          <MysteryChest className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2" />
          <div className="w-26 h-13.5 absolute inset-0 m-auto rounded-full bg-white blur-2xl" />
          <div className="w-30 h-2.5 absolute inset-x-0 m-auto bottom-[15px] blur-[5px] bg-bp-item-shadow-pattern" />
          {!isLowerLevel && (
            <div className="animate-bp-glow-running bg-bp-premium-glow-pattern absolute inset-0 mx-0 my-auto h-60 w-full bg-[length:64px] bg-no-repeat blur-[10px]" />
          )}
        </div>
      </div>
    </div>
  );
};
