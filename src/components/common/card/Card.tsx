import React, { FunctionComponent, RefObject } from "react";

import classNames from "classnames";

import { CollectButton, CollectButtonColor } from "@/components/ui";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";

export enum CardType {
  BLUE = "blue",
  INDIGO = "indigo",
  ORANGE = "orange",
}

type Props = {
  children: React.ReactNode;
  badgeComponent: React.ReactNode;
  buttonColor?: CollectButtonColor;
  buttonText: string;
  isAnimated?: boolean;
  isSelected?: boolean;
  type?: CardType;
  onClick: () => void;
  ref?: RefObject<HTMLDivElement>;
};

export const Card: FunctionComponent<Props> = ({
  children,
  badgeComponent,
  buttonColor,
  buttonText,
  isAnimated = false,
  isSelected = false,
  type = CardType.BLUE,
  ref,
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
      ref={ref}
      className={classNames(
        "relative aspect-[3/4] rounded-xl border border-solid border-black pb-1 text-white transition-transform will-change-transform",
        {
          "bg-[#0069B1]": type === CardType.BLUE,
          "bg-[#403BB7]": type === CardType.INDIGO,
          "bg-[#A6552D]": type === CardType.ORANGE,
          "scale-105": isSelected,
        },
      )}
      onClick={handleClick}
    >
      <CollectButton
        className="absolute -top-1 left-1/2 z-20 -translate-x-1/2"
        color={buttonColor}
        onClick={handleGetPrizes}
      >
        {buttonText}
      </CollectButton>
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
              "bg-[#883308]": type === CardType.ORANGE,
              "bg-[#403BB7]": type === CardType.INDIGO,
            },
          )}
        >
          <div
            className={classNames(
              "absolute -inset-x-1 top-1/2 h-[155%] -translate-y-1/2 bg-[length:150%_70%] bg-center mix-blend-hard-light",
              {
                "bg-card-blue-bg-pattern": type === CardType.BLUE,
                "bg-card-indigo-bg-pattern": type === CardType.INDIGO,
                "bg-card-orange-bg-pattern": type === CardType.ORANGE,
              },
            )}
          />
          <div className="shadow-card-inner-shadow relative h-full w-full overflow-hidden rounded-xl">
            {children}
          </div>
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
      {isAnimated && (
        <div className="absolute inset-0 overflow-hidden rounded-xl">
          <div className="absolute top-0 h-[130%] w-[66px] rotate-[30deg] animate-card-glow-running bg-card-glow-pattern will-change-transform" />
        </div>
      )}
    </div>
  );
};
