import React from "react";

import Image from "next/image";

import classNames from "classnames";

import { GetRewardCard } from "@/components/common/get-reward-card/GetRewardCard";
import { RewardsStatusEnum } from "@/components/pages/rewards/enums";
import RegularChest from "@/public/assets/png/battle-pass/mystery-chest.webp";

import { CARD_CAPTION } from "../../constants";

export const RewardsContent = () => {
  return (
    <div className="relative flex flex-col gap-4">
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
              >
                <div className="relative h-full w-full overflow-hidden rounded-xl">
                  <span
                    className={classNames(
                      "text-stroke-1 absolute left-1/2 top-1.5 -translate-x-1/2 text-nowrap text-x font-extrabold text-shadow-sm",
                    )}
                  >
                    День {index + 1}
                  </span>
                  <div
                    className={classNames(
                      "absolute left-1/2 top-1/2 size-15 -translate-x-1/2 -translate-y-1/2",
                      "md:size-26",
                    )}
                  >
                    <Image src={RegularChest} quality={100} alt="" fill />
                    {status !== RewardsStatusEnum.UNAVAILABLE && (
                      <span
                        className={classNames(
                          "text-stroke-1 absolute bottom-1 right-1 text-xs font-extrabold text-shadow-sm",
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
