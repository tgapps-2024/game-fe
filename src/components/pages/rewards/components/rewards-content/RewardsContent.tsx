import React from "react";

import Image from "next/image";

import classNames from "classnames";

import { GetRewardCard } from "@/components/common/get-reward-card/GetRewardCard";
import { RewardsStatusEnum } from "@/components/pages/rewards/enums";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import RegularChest from "@/public/assets/png/battle-pass/mystery-chest.webp";
import { ImpactStyleEnum, NotificationEnum } from "@/types/telegram";

import { CARD_CAPTION } from "../constants";

export const RewardsContent = () => {
  const { handleNotificationOccurred, handleImpactOccurred } =
    useHapticFeedback();

  const handleClick = (status: RewardsStatusEnum) => {
    if (status === RewardsStatusEnum.AVAILABLE) {
      handleImpactOccurred(ImpactStyleEnum.LIGHT);
    } else if (status === RewardsStatusEnum.CURRENT) {
      handleImpactOccurred(ImpactStyleEnum.SOFT);
    } else {
      handleNotificationOccurred(NotificationEnum.ERROR);
    }
  };

  return (
    <div className="relative mx-4 flex flex-col gap-4">
      <div className="grid grid-cols-4 gap-2 pb-38">
        {Array(20)
          .fill(0)
          .map((_, index) => {
            let status;

            if (index < 2) {
              status = RewardsStatusEnum.AVAILABLE;
            } else if (index < 3) {
              status = RewardsStatusEnum.CURRENT;
            } else {
              status = RewardsStatusEnum.UNAVAILABLE;
            }

            return (
              <GetRewardCard
                key={index}
                status={status}
                isAnimated={index < 3}
                caption={CARD_CAPTION[status]}
                onClick={() => handleClick(status)}
              >
                <div className="relative flex h-full w-full flex-col items-center justify-between overflow-hidden p-2">
                  <span
                    className={classNames(
                      "text-stroke-1 text-nowrap text-x font-extrabold text-shadow-sm",
                    )}
                  >
                    День {index + 1}
                  </span>
                  <div className={classNames("relative aspect-square w-full")}>
                    <Image
                      src={RegularChest}
                      objectFit="contain"
                      quality={100}
                      alt=""
                      fill
                    />
                    {status !== RewardsStatusEnum.UNAVAILABLE && (
                      <span
                        className={classNames(
                          "text-stroke-1 absolute bottom-1 right-1 text-xs font-extrabold text-shadow-sm",
                          "md:text-lg",
                        )}
                      >
                        x{1}
                      </span>
                    )}
                  </div>
                </div>
              </GetRewardCard>
            );
          })}
      </div>
    </div>
  );
};
