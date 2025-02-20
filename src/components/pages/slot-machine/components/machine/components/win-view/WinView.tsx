import React, { FunctionComponent } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import classNames from "classnames";

import { NS } from "@/constants/ns";
import WinPaneImg from "@/public/assets/png/slot-machine/win-pane.webp";

import { Face } from "../../types";
import { ReelPane } from "../reel-pane/ReelPane";

type Props = {
  isActive: boolean;
  combination: Face[];
  onClick: () => void;
};

export const WinView: FunctionComponent<Props> = ({
  isActive,
  combination,
  onClick,
}) => {
  const t = useTranslations(NS.PAGES.SLOT_MACHINE.ROOT);

  return (
    <div
      className={classNames("absolute inset-0", {
        visible: isActive,
        invisible: !isActive,
      })}
    >
      <div
        className="absolute bottom-0 left-0 h-screen w-screen bg-black/80"
        onClick={onClick}
      >
        <div className="animate-slot-win-view-text-pulse absolute inset-x-10 bottom-20 text-center text-[30px] font-black uppercase italic leading-[36px] text-white text-shadow">
          {t(
            `${NS.PAGES.SLOT_MACHINE.LABELS.ROOT}.${NS.PAGES.SLOT_MACHINE.LABELS.TAP_TO_CONTINUE}`,
          )}
        </div>
      </div>
      <ReelPane combination={combination} />
      <div className="absolute inset-x-0 top-[47.6%] h-[18%]">
        <Image src={WinPaneImg} alt="" fill quality={100} />
        <div className="absolute left-1/2 top-[10%] -translate-x-1/2 font-black uppercase text-[#542E00]">
          Выигрыш
        </div>
        {/* <div className="absolute left-1/2 top-[51%] h-[26%] -translate-x-1/2 -translate-y-1/2">
          <div className="flex h-full items-center gap-x-2.5">
            <div className="h-full shrink-0">
              <CoinSvg
                width="100%"
                height="100%"
                viewBox="0 0 26 26"
                preserveAspectRatio="none"
              />
            </div>
            <div className="text-shadow-win text-stroke-brown-1.5 text-[5cqw] font-black text-[#FDEC50]">
              10.000
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};
