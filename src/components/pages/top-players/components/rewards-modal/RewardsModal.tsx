import React from "react";

import Image from "next/image";

import classNames from "classnames";

import { DrawerClose, DrawerContent } from "@/components/ui/drawer";
import LigntningImage from "@/public/assets/png/rewards/lumin.png";
import CloseIcon from "@/public/assets/svg/close.svg";

export const RewardsModal = () => {
  console.log("RewardsModal");
  return (
    <DrawerContent
      className={classNames(
        "shadow-modal-shadow flex h-[590px] w-full flex-col items-center rounded-t-3xl border-0 bg-[#109BD8] pt-1.5 font-rubik",
      )}
    >
      <div className="h-full w-full rounded-t-3xl bg-gradient-to-b from-[#44C2FD] to-[#00AEFF] px-4 pb-8 pt-6 shadow-[inset_0_2px_0_0_rgba(255,255,255,0.3)]">
        <DrawerClose
          asChild
          className="absolute right-4 top-4 z-50 flex size-8 items-center justify-center rounded-full"
        >
          <CloseIcon />
        </DrawerClose>
      </div>
    </DrawerContent>
  );
};
