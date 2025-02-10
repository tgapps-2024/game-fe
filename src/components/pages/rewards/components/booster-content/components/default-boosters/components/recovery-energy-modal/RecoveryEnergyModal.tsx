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
import EnergyImage from "@/public/assets/png/rewards/green-battery-half.webp";
import LigntningImage from "@/public/assets/png/rewards/lumin.png";
import CloseIcon from "@/public/assets/svg/close.svg";
import FriendsIcon from "@/public/assets/svg/friends-coin.svg";
import StarSVG from "@/public/assets/svg/star.svg";
import { RecoveryBooster, UpgradeBoosterType } from "@/services/rewards/types";
import { formatNumber } from "@/utils/number";

type Props = {
  recoveryBooster: RecoveryBooster;
  onSubmit: (
    event: MouseEvent<HTMLButtonElement>,
    type: UpgradeBoosterType,
  ) => void;
  disabled?: boolean;
};

export const RecoveryEnergyModal: FunctionComponent<Props> = ({
  recoveryBooster,
  onSubmit,
  disabled,
}) => {
  const LEVEL = recoveryBooster?.level;
  const PRICE = recoveryBooster?.price;

  return (
    <DrawerContent
      className={classNames(
        "flex w-full flex-col items-center rounded-t-3xl border-0 bg-default-booster-modal-pattern bg-left-top bg-no-repeat px-4 pb-8 pt-9 font-rubik",
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
      <DrawerTitle className="text-stroke-half mb-6 text-center text-2xl font-black uppercase text-white text-shadow-sm">
        Восстановление энергии
      </DrawerTitle>
      <DrawerDescription className="mb-6 text-sm font-medium tracking-wide text-white">
        Увеличивает максимальный запас энергии
      </DrawerDescription>
      <div className="mb-6 flex w-full items-center justify-between px-3">
        {Array(10)
          .fill(0)
          .map((_, index) => {
            const isLess = LEVEL >= index + 1;

            return (
              <div key={index} className="flex flex-col items-center gap-2">
                <div
                  key={index}
                  className={classNames("size-2 rounded-full bg-gray-550", {
                    "size-4 rounded-full": index === 0 || index === 9,
                    "!bg-white": isLess,
                    "mb-5": index !== 0 && index !== 9,
                  })}
                />
                {index === 0 ? (
                  <span className="text-xs font-medium tracking-wide text-gray-550">
                    {index + 1} ур.
                  </span>
                ) : index === 9 ? (
                  <span className="text-xs font-medium tracking-wide text-gray-550">
                    {index + 1} ур.
                  </span>
                ) : null}
              </div>
            );
          })}
      </div>
      <div className="relative mb-6 grid w-full grid-cols-2 gap-2">
        <div className="flex w-full flex-col gap-3 rounded-2xl bg-blue-700 p-3">
          <div className="mb-2 self-start rounded-full bg-white/5 px-2.5 py-[5px] text-xs text-gray-550">
            {LEVEL} ур.
          </div>
          <span className="text-xs font-medium tracking-wide text-gray-550">
            Запас энергии
          </span>
          <div className="flex items-center gap-2">
            <FriendsIcon className="size-5" />
            <span className="text-lg font-semibold leading-none text-white">
              {recoveryBooster?.current}
            </span>
          </div>
        </div>
        <div className="text-stroke-1 absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-solid border-[#192632] bg-[linear-gradient(45deg,_#35AFF1_0%,_#4DC0FF_50%,_#9EDDFF_100%)] px-3 py-2 text-sm font-semibold text-white text-shadow-sm">
          <FriendsIcon className="mr-1 size-5" /> +
          {(recoveryBooster?.new - recoveryBooster?.current).toFixed(1)}
        </div>
        <div className="flex w-full flex-col items-end gap-3 rounded-2xl bg-blue-700 p-3">
          <div className="mb-2 self-end rounded-full bg-[#0075FF] px-2.5 py-[5px] text-xs text-white">
            {LEVEL + 1} ур.
          </div>
          <span className="text-xs font-medium tracking-wide text-gray-550">
            Запас энергии
          </span>
          <div className="flex items-center gap-2">
            <FriendsIcon className="size-5" />
            <span className="inline-block bg-gradient-to-tr from-[#61C2F6] to-[#CCE8F7] bg-clip-text text-lg font-bold leading-none text-transparent">
              {recoveryBooster?.new}
            </span>
          </div>
        </div>
      </div>
      <PrimaryButton
        onClick={(e) => onSubmit(e, UpgradeBoosterType.RECOVERY)}
        disabled={disabled}
        size="large"
        className="text-stroke-1 text-xs font-extrabold text-shadow-sm"
      >
        <div className="flex items-center gap-1 text-base uppercase leading-none">
          Улучшить за
          <div className="grid grid-cols-[16px_1fr] items-center gap-1">
            <StarSVG className="size-4" />
            {formatNumber(PRICE)}
          </div>
        </div>
      </PrimaryButton>
    </DrawerContent>
  );
};
