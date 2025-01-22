import React, { FunctionComponent } from "react";

import classNames from "classnames";

import MysteryChest from "@/public/assets/svg/battle-pass/mystery-chest.svg";
import RegularChest from "@/public/assets/svg/battle-pass/regular-chest.svg";

export enum ItemType {
  Regular,
  Mystery,
}

type Props = {
  battlePassLevel: number;
  currentLevel: number;
  itemType: ItemType;
};

export const ChestRowItem: FunctionComponent<Props> = ({
  battlePassLevel,
  currentLevel,
  itemType,
}) => {
  const isLowerLevel = currentLevel < battlePassLevel;
  const isMystery = itemType === ItemType.Mystery;

  let ChestIcon;

  switch (itemType) {
    case ItemType.Mystery:
      ChestIcon = MysteryChest;
      break;
    default:
      ChestIcon = RegularChest;
      break;
  }

  return (
    <div className="relative flex h-full w-full overflow-hidden">
      <ChestIcon className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute inset-0 m-auto h-13.5 w-26 rounded-full bg-white blur-2xl" />
      <div className="absolute inset-x-0 bottom-[15px] m-auto h-2.5 w-30 bg-bp-item-shadow-pattern blur-[5px]" />
      {!isLowerLevel && (
        <div
          className={classNames(
            "absolute inset-0 mx-0 my-auto h-60 w-full origin-left animate-bp-glow-running bg-[length:64px] bg-no-repeat blur-[10px]",
            {
              "bg-bp-premium-glow-pattern": isMystery,
              "bg-bp-regular-glow-pattern": itemType === ItemType.Regular,
            },
          )}
        />
      )}
    </div>
  );
};
