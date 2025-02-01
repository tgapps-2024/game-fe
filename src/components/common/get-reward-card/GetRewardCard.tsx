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
};

export const GetRewardCard: FunctionComponent<Props> = ({
  status,
  children,
  isAnimated,
  caption,
  amount = 1,
}) => {
  return (
    <div
      className={classNames(
        "relative aspect-[83/128] rounded-xl border border-solid border-black text-white transition-transform will-change-transform",
        {
          "bg-[#0069B1] pb-1": status === RewardsStatusEnum.AVAILABLE,
          "": status === RewardsStatusEnum.UNAVAILABLE,
          "bg-[#009F00] pb-1": status === RewardsStatusEnum.CURRENT,
        },
      )}
    >
      <div
        className={classNames(
          "h-full rounded-xl p-1 shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.3)]",
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
        {caption && (
          <div className="text-stroke-1 absolute bottom-2 left-1/2 -translate-x-1/2 text-sm font-black text-white text-shadow">
            {status === RewardsStatusEnum.UNAVAILABLE && amount} {caption}
          </div>
        )}
      </div>
      {isAnimated && (
        <div className="absolute inset-0 overflow-hidden rounded-xl">
          <div className="absolute top-0 h-[130%] w-[66px] rotate-[30deg] animate-card-glow-running bg-card-glow-pattern will-change-transform" />
        </div>
      )}
    </div>
  );
};
