import { formatValue } from "@/utils/lib/utils";
import React, { FunctionComponent } from "react";

type Props = {
  value: number;
};

export const BottomComponent: FunctionComponent<Props> = ({ value }) => {
  return (
    <p className="text-xs leading-[14.4px] font-black tracking-[0.04em] text-nowrap text-white text-stroke-1 text-shadow-sm">
      {formatValue(value)}
    </p>
  );
};
