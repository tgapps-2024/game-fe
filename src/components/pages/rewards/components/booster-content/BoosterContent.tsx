import React, { FunctionComponent } from "react";

import { DefaultBoosters } from "./components/default-boosters/DefaultBoosters";
import { EverydayBoosters } from "./components/everyday-boosters/EverydayBoosters";
import { PremiumBoosters } from "./components/premium-boosters/PremiumBoosters";

type Props = {
  isActive: boolean;
};

export const BoosterContent: FunctionComponent<Props> = ({ isActive }) => {
  console.log("🚀 ~ isActive:", isActive);
  return (
    <div className="mx-4 flex flex-col gap-6">
      <PremiumBoosters />
      <EverydayBoosters />
      <DefaultBoosters />
    </div>
  );
};
