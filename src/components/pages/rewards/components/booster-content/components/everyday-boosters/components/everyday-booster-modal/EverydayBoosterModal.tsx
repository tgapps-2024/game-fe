import React, { FunctionComponent, MouseEvent } from "react";

import Image from "next/image";

import classNames from "classnames";

import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { PrimaryButton } from "@/components/ui/primary-button/PrimaryButton";
import LigntningImage from "@/public/assets/png/rewards/lumin.png";
import EnergyImage from "@/public/assets/png/rewards/yellow-battery.webp";
import CloseIcon from "@/public/assets/svg/close.svg";
import FriendsIcon from "@/public/assets/svg/friends-coin.svg";
import UnionIcon from "@/public/assets/svg/rewards/union.svg";
import { FullBooster } from "@/services/rewards/types";

type Props = {
  booster: FullBooster;
  disabled?: boolean;
  onSubmit: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const EverydayBoosterModal: FunctionComponent<Props> = ({
  booster,
  disabled,
  onSubmit,
}) => {
  return (
    <DrawerContent
      className={classNames(
        "flex w-full flex-col items-center rounded-t-3xl border-0 bg-everyday-booster-modal-pattern bg-left-top bg-no-repeat px-4 pb-8 pt-9 font-rubik",
      )}
    >
      <DrawerClose
        asChild
        className="absolute right-4 top-4 z-50 flex size-8 items-center justify-center rounded-full"
      >
        <CloseIcon />
      </DrawerClose>
      <div className="relative mb-6 flex h-40 w-full items-center justify-between">
        <div className="absolute z-20 flex h-[160px] w-full items-center justify-center">
          <Image src={LigntningImage} fill objectFit="contain" alt="" />
        </div>

        <Image
          src={EnergyImage}
          alt="Energy image"
          fill
          objectFit="contain"
          className="z-20"
        />
      </div>
      <DrawerTitle className="text-stroke-half mb-6 text-center text-2xl font-black uppercase leading-none text-white text-shadow-sm">
        Полный запас энергии
      </DrawerTitle>
      <DrawerDescription className="mb-6 text-sm font-medium tracking-wide text-white">
        Полностью восстанавливает запас энергии
      </DrawerDescription>
      <div className="relative mb-6 grid w-full grid-cols-2 gap-2">
        <div className="flex w-full flex-col gap-3 rounded-2xl bg-blue-700 p-3">
          <span className="text-xs font-medium tracking-wide text-gray-550">
            Текущий
          </span>
          <div className="flex items-center gap-2">
            <FriendsIcon className="size-5" />
            <span className="text-lg font-semibold leading-none text-white">
              {booster?.fullRestore}
            </span>
          </div>
        </div>
        <div className="absolute left-1/2 top-1/2 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-solid border-[#192632] bg-[linear-gradient(45deg,_#35AFF1_0%,_#4DC0FF_50%,_#9EDDFF_100%)]">
          <UnionIcon className="w-2" />
        </div>
        <div className="flex w-full flex-col items-end gap-3 rounded-2xl bg-blue-700 p-3">
          <span className="text-xs font-medium tracking-wide text-gray-550">
            После улучшения
          </span>
          <div className="flex items-center gap-2">
            <FriendsIcon className="size-5" />
            <span className="inline-block bg-gradient-to-tr from-[#61C2F6] to-[#CCE8F7] bg-clip-text text-lg font-bold leading-none text-transparent">
              {booster?.nextRestore}
            </span>
          </div>
        </div>
      </div>
      <PrimaryButton
        size="large"
        disabled={disabled}
        color="secondary"
        onClick={onSubmit}
        className="flex gap-1 text-base uppercase"
      >
        Применить усиление
      </PrimaryButton>
    </DrawerContent>
  );
};
