import { FunctionComponent } from "react";

import { formatValue } from "@/utils/lib/utils";

type Props = {
  value: number;
};

export const BottomComponent: FunctionComponent<Props> = ({ value }) => {
  return (
    <p className="text-stroke-1 text-nowrap text-xs font-black leading-[14.4px] tracking-[0.04em] text-white text-shadow-sm">
      {formatValue(value)}
    </p>
  );
};
