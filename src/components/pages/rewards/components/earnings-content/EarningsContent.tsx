import React from "react";

import { Combo } from "./components/combo/Combo";
import { Events } from "./components/events/Events";

type Props = {
  isActive: boolean;
};

export const EarningsContent = ({ isActive }: Props) => {
  return (
    <div className="mx-4 flex flex-col gap-[30px]">
      <Combo isAnimated={isActive} />
      <Events isAnimated={isActive} />
    </div>
  );
};
