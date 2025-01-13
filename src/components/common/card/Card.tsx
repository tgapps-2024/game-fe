import React, { FunctionComponent } from "react";

import Image from "next/image";

import classNames from "classnames";
import { motion } from "framer-motion";

import { PentagonXS } from "@/components/ui";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import BGImage from "@/public/assets/png/card-bg.png";

export enum CardType {
  BLUE = "blue",
  INDIGO = "indigo",
  ORANGE = "orange",
}

type Props = {
  children: React.ReactNode;
  badgeComponent: React.ReactNode;
  buttonText: string;
  isSelected?: boolean;
  type?: CardType;
  onClick: () => void;
};

export const Card: FunctionComponent<Props> = ({
  children,
  badgeComponent,
  buttonText,
  isSelected = false,
  type = CardType.BLUE,
  onClick,
}) => {
  const { handleSelectionChanged } = useHapticFeedback();

  const handleClick = () => {
    handleSelectionChanged();
    onClick();
  };

  const handleGetPrizes = () => {
    handleSelectionChanged();
  };

  return (
    <div
      className={classNames(
        "relative h-38 w-full rounded-xl border border-solid border-black pb-1 text-white transition-all",
        {
          "bg-[#0069B1]": type === CardType.BLUE,
          "bg-[#403BB7]": type === CardType.INDIGO,
          "bg-[#A6552D]": type === CardType.ORANGE,
          "scale-105": isSelected,
        },
      )}
      onClick={handleClick}
    >
      <div className="absolute -top-1 left-1/2 z-20 flex -translate-x-1/2 items-center justify-center">
        <motion.button
          className="relative flex items-center justify-center"
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          onClick={handleGetPrizes}
        >
          <PentagonXS />
          <span className="text-stroke-1 absolute z-10 mb-2.5 text-[11px] font-black leading-none tracking-wide text-white text-shadow-sm">
            {buttonText}
          </span>
        </motion.button>
      </div>
      <div
        className={classNames(
          "h-full rounded-xl p-1 shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.3)]",
          {
            "bg-gradient-to-b from-[#29D6FF] to-[#2596E4]":
              type === CardType.BLUE,
            "bg-gradient-to-b from-[#9099FD] to-[#777AF0]":
              type === CardType.INDIGO,
            "bg-[#EFC609]": type === CardType.ORANGE,
          },
        )}
      >
        <div
          className={classNames(
            "relative h-full w-full overflow-hidden rounded-xl",
            {
              "bg-[#0069B1]": type === CardType.BLUE,
              "bg-[#403BB7]": type === CardType.INDIGO,
              "bg-[#981F03]": type === CardType.ORANGE,
            },
          )}
        >
          <Image src={BGImage} fill alt="" className="rounded-xl" />
          {children}
          <div
            className={classNames(
              "absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-md text-xs shadow-[inset_0_0.5px_0_0_rgba(255,255,255,0.3)]",
              {
                "bg-[#2596E4]": type === CardType.BLUE,
                "bg-[#777AF0]": type === CardType.INDIGO,
                "bg-[#EFC609]": type === CardType.ORANGE,
              },
            )}
          >
            {badgeComponent}
          </div>
        </div>
      </div>
    </div>
  );
};
