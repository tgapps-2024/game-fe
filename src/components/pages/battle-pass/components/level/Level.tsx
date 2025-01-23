import React, { FunctionComponent } from "react";

import LevelSvg from "@/public/assets/svg/battle-pass/bp-level.svg";
import InactiveLevelSvg from "@/public/assets/svg/battle-pass/inactive-level.svg";

type Props = {
  className?: string;
  level: number;
  isInactive?: boolean;
};

export const Level: FunctionComponent<Props> = ({
  className,
  level,
  isInactive = false,
}) => (
  <div className={className}>
    <div className="relative z-20 flex size-[42px] items-center justify-center">
      {!isInactive ? (
        <LevelSvg className="absolute shrink-0" />
      ) : (
        <InactiveLevelSvg className="absolute shrink-0" />
      )}
      <span className="text-stroke-1 z-10 text-sm font-black leading-none text-white text-shadow-sm">
        {level}
      </span>
    </div>
  </div>
);
