import React, { FunctionComponent } from "react";

import StarSVG from "@/public/assets/svg/star.svg";

type Props = {
  value: number;
};

export const Badge: FunctionComponent<Props> = ({ value }) => {
  return (
    <div className="relative z-50 grid grid-cols-[14px_1fr] items-center gap-1 px-4 pb-0.5 pt-1">
      <StarSVG className="size-3.5" />
      <span className="text-stroke-1 relative top-1/2 -translate-y-1/2 text-xs font-extrabold text-white text-shadow-sm">
        {value}
      </span>
    </div>
  );
};
