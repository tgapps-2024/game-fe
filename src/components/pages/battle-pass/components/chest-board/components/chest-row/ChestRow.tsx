import React, { FunctionComponent } from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";

import { CollectButton } from "@/components/ui";
import { NS } from "@/constants/ns";

import { Level } from "../../../level/Level";

import {
  ChestRowItem,
  ItemType,
} from "./components/chest-row-item/ChestRowItem";

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

        <ChestRowItem
          battlePassLevel={level}
          currentLevel={currentLevel}
          itemType={ItemType.Regular}
        />
        <Level
          className="absolute z-10 -right-[22px]"
          level={level}
          isInactive={isLowerLevel}
        />
      </div>
      <div
        className={classNames(
          "relative flex h-30 items-center justify-center",
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
        <ChestRowItem
          battlePassLevel={level}
          currentLevel={currentLevel}
          itemType={ItemType.Mystery}
        />
      </div>
    </div>
  );
};
