import React, { FunctionComponent } from "react";

import Image from "next/image";

import classNames from "classnames";

import { RewardsStatusEnum } from "@/components/pages/rewards/enums";
import BGImage from "@/public/assets/png/card-bg.webp";

type Props = {
  status: RewardsStatusEnum;
  children?: React.ReactNode;
  isAnimated?: boolean;
  caption?: string;
  amount?: number;
  onClick?: () => void;
};

export const GetRewardCard: FunctionComponent<Props> = ({
  status,
  children,
  isAnimated,
  caption,
  amount = 1,
  onClick,
}) => {
  return (
    <div
      className={classNames(
        "relative aspect-[83/128] rounded-xl pb-1 text-white transition-transform duration-100 ease-in-out",
        {
          "bg-[#0069B1]": status === RewardsStatusEnum.AVAILABLE,
          "overflow-hidden bg-blue-700 p-[1px] !pb-[1px] opacity-50":
            status === RewardsStatusEnum.UNAVAILABLE,
          "bg-[#009F00]": status === RewardsStatusEnum.CURRENT,
          "border border-solid border-black":
            status !== RewardsStatusEnum.UNAVAILABLE,
        },
      )}
      onClick={onClick}
    >
      <div
        className={classNames(
          "relative z-30 h-full rounded-xl p-1 shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.3)]",
          {
            "bg-gradient-to-b from-[#29D6FF] to-[#2596E4]":
              status === RewardsStatusEnum.AVAILABLE,
            "bg-blue-700 shadow-none": status === RewardsStatusEnum.UNAVAILABLE,
            "bg-[#02DB07]": status === RewardsStatusEnum.CURRENT,
          },
        )}
      >
        <div
          className={classNames(
            "relative h-[78%] w-full overflow-hidden rounded-xl",
            {
              "bg-[#0069B1]": status === RewardsStatusEnum.AVAILABLE,
              "bg-blue-800": status === RewardsStatusEnum.UNAVAILABLE,
              "bg-[#009F00]": status === RewardsStatusEnum.CURRENT,
            },
          )}
        >
          {status !== RewardsStatusEnum.UNAVAILABLE && (
            <Image
              src={BGImage}
              fill
              alt=""
              className="rounded-xl"
              quality={100}
            />
          )}
          {children}
        </div>
        <div className="relative h-[22%] w-full">
          {caption && (
            <div
              className={classNames(
                "text-stroke-1 absolute left-1/2 top-[calc(50%_+_2px)] -translate-x-1/2 -translate-y-1/2 text-sm font-black text-white text-shadow",
                "md:text-lg",
              )}
            >
              {status === RewardsStatusEnum.UNAVAILABLE && amount} {caption}
            </div>
          )}
        </div>
      </div>
      {isAnimated && (
        <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden rounded-xl">
          <div className="absolute top-0 h-[130%] w-[66px] rotate-[30deg] animate-card-glow-running bg-card-glow-pattern will-change-transform" />
        </div>
      )}
    </div>
  );
};
