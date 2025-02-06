import React, { FunctionComponent } from "react";

import { IBoosters } from "@/services/rewards/types";

import { DefaultBoosters } from "./components/default-boosters/DefaultBoosters";
import { EverydayBoosters } from "./components/everyday-boosters/EverydayBoosters";
import { PremiumBoosters } from "./components/premium-boosters/PremiumBoosters";

type Props = {
  isActive: boolean;
  boosters: IBoosters;
};

export const BoosterContent: FunctionComponent<Props> = ({ boosters }) => {
  console.log("🚀 ~ boosters:", boosters);
  return (
    <div className="mx-4 flex flex-col gap-6">
      <PremiumBoosters booster={boosters.temp_energy} />
      <EverydayBoosters booster={boosters.full} />
      <DefaultBoosters
        capacity={boosters.capacity}
        recovery={boosters.recovery}
      />
    </div>
  );
};
