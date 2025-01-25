import React, { FunctionComponent } from "react";

import Image from "next/image";

import classNames from "classnames";

import MysteryChest from "@/public/assets/png/battle-pass/mystery-chest.png";
import RegularChest from "@/public/assets/png/battle-pass/regular-chest.png";

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

  let ChestImage;

  switch (itemType) {
    case ItemType.Mystery:
      ChestImage = MysteryChest;
      break;
    default:
      ChestImage = RegularChest;
      break;
  }

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0 m-auto h-13.5 w-26 rounded-full bg-white blur-2xl" />
      <div className="absolute inset-x-0 bottom-[15px] m-auto h-2.5 w-30 bg-bp-item-shadow-pattern blur-[5px]" />
      <div className="z-10 h-20 w-20">
        <Image
          src={ChestImage}
          alt=""
          style={{ objectFit: "contain" }}
          quality={100}
        />
      </div>
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
