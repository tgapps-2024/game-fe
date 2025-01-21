import React, { FunctionComponent, MouseEvent, PropsWithChildren } from "react";

import { GreenArea } from "./components/GreenArea";
import { Lock } from "./components/Lock";
import { Shadow } from "./components/Shadow";
import { YellowArea } from "./components/YellowArea";

type Props = {
  className?: string;
  isLocked?: boolean;
  onClick?: (event: MouseEvent) => void;
};

export const CollectButton: FunctionComponent<PropsWithChildren<Props>> = ({
  className,
  children,
  isLocked,
  onClick,
}) => (
  <div className={className}>
    <div className="relative h-7.5 w-15" onClick={onClick}>
      <Shadow />
      <div className="absolute animate-collect-button-vertical-sway will-change-transform">
        {isLocked ? (
          <Lock />
        ) : (
          children && (
            <span className="text-stroke-1 absolute inset-x-0 bottom-2.5 top-0 flex items-center justify-center text-[10px] font-black leading-[12px] tracking-wide text-white text-shadow-sm">
              {children}
            </span>
          )
        )}
        {isLocked ? <YellowArea /> : <GreenArea />}
      </div>
    </div>
  </div>
);
