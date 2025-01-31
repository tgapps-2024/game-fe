import React from "react";

import Image from "next/image";

import { GetRewardCard } from "@/components/common/get-reward-card/GetRewardCard";
import { RewardsStatusEnum } from "@/components/pages/rewards/enums";
import RegularChest from "@/public/assets/png/rewards/regular-chest.png";

export const RewardsContent = () => {
  return (
    <div className="relative flex flex-col gap-4">
      <div className="grid grid-cols-4 gap-2 pb-38">
        {Array(24)
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
              <GetRewardCard key={index} status={status} isAnimated={index < 3}>
                <div className="relative h-full w-full overflow-hidden rounded-xl">
                  <div className="absolute left-1/2 top-1/2 size-15 -translate-x-1/2 -translate-y-1/2">
                    <Image src={RegularChest} quality={100} alt="" fill />
                  </div>
                </div>
              </GetRewardCard>
            );
          })}
      </div>
    </div>
  );
};
