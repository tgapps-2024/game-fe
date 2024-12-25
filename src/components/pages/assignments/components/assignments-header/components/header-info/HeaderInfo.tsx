import React, { FunctionComponent } from "react";

type Props = {
  topComponent: React.ReactNode;
  bottomComponent: React.ReactNode;
};

export const HeaderInfo: FunctionComponent<Props> = ({
  topComponent,
  bottomComponent,
}) => {
  return (
    <div className="flex flex-col w-fit h-full gap-y-1 justify-center">
      <div className="text-xs text-gray-550 font-inter font-medium">
        {topComponent}
      </div>
      <div className="text-base leading-none font-black tracking-[0.04em] text-nowrap text-white text-stroke-1 text-shadow-sm">
        {bottomComponent}
      </div>
    </div>
  );
};
